import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../AdminPlaceList/AdminPlaceItem.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트 추가

function AdminPlaceItem({ placeId, name, address, phone, distance, rating, review}) {
    console.log("받아온 데이터:", { placeId, name, address, phone, distance, rating, review });
    const navigate = useNavigate();
    
    const handleDeletePost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
    
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (!confirmDelete) return;
    
        try {
            // 문자열 템플릿 리터럴을 사용하여 placeId 삽입
            const response = await fetch(`http://13.209.211.218:8080/admin/delete/${placeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                alert('장소가 삭제되었습니다.');
                navigate('/admin/place/list'); // 장소 목록 페이지로 이동
            } else {
                const errorMessage = await response.text(); // 서버에서 반환된 에러 메시지를 읽기
                throw new Error(errorMessage || '장소 삭제 실패');
            }
        } catch (error) {
            alert(`장소 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    };
    

    return (
        <Link to={`/place/details/${placeId}`} className="board-item-link">
            <div className="board-item">
                <div className="board-item-image">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340" // 기본 이미지 (또는 실제 데이터에서 받아온 이미지 URL)
                        alt={`${name} 이미지`}
                        className="board-item-img"
                    />
                </div>
                <div className="admin-board-item-info">
                    <div className="admin-board-item-title">{name}</div>
                    <div className="admin-board-item-address">{address}</div>
                    <div className="admin-board-item-phone">{phone}</div>
                </div>
                <div className='trashIconBox'>
                    <FontAwesomeIcon icon={faTrash} className='trashIcon' onClick={handleDeletePost}/>
                </div>
            </div>
        </Link>
    );
}

export default AdminPlaceItem;
