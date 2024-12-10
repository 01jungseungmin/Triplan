import './css/PlaceBoardItem.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PlaceBoardItem({ placeId, name, address, phone, distance, rating, reviews, state, crewId, planDate, imgUrl }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const defaultImageUrl = "https://png.pngtree.com/thumb_back/fw800/background/20231004/pngtree-landscape-photographer-image_13347284.jpg";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userAuth = decodedToken.auth; // JWT의 'auth' 필드를 통해 권한 확인
                if (userAuth === 'ADMIN') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('JWT 디코딩 중 오류 발생:', error);
            }
        }
    }, []);

    const handleDeletePost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://13.209.211.218:8080/admin/delete/${placeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('장소가 삭제되었습니다.');
                navigate('/placeboard'); // 페이지 새로고침
            } else {
                throw new Error('장소 삭제 실패');
            }
        } catch (error) {
            alert(`장소 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <Link to={`/place/details/${placeId}`} className="board-item-link" state={{ from: state, crewId, planDate }}>
            <div className="board-item">
                <div className="board-item-image">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src={imgUrl || defaultImageUrl}
                        alt={name || "장소 이미지"}
                        className="placeImg"
                    />
                </div>
                <div className="board-item-info">
                    <div className="board-item-title">{name}</div>
                    <div className="board-item-address">{address}</div>
                    <div className="board-item-phone">{phone}</div>
                    {distance && <div className="board-item-distance">거리: {distance}</div>}
                    {rating && (
                        <div className="board-item-rating">
                            평점: {rating} ({reviews} 리뷰)
                        </div>
                    )}
                </div>
                {/* 관리자일 때만 삭제 아이콘 표시 */}
                {isAdmin && (
                    <div className="trashIconBox">
                        <FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={handleDeletePost} />
                    </div>
                )}
            </div>
        </Link>
    );
}

export default PlaceBoardItem;
