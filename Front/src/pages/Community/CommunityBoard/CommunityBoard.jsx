import React, { useState, useEffect } from 'react';
import '../CommunityBoard/CommunityBoard.css';
import Header from "../../../components/Header";
import CommunityBoardItem from "../../../components/CommunityBoardItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function CommunityBoard() {
    const [places, setPlaces] = useState([]); // API에서 불러온 장소 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 표시할 아이템 수

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        fetch('http://localhost:8080/api/boards', { // 인증 필요 없음
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // 인증 토큰 포함
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`커뮤니티 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API에서 받아온 데이터:', data);
                setPlaces(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('에러 발생:', error.message);
                setError(`커뮤니티 데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
                setLoading(false); // 로딩 상태 해제
            });
    }, []);    

    // Pagination logic
    const totalPages = Math.ceil(places.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlaces = places.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handlePrevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const handleNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="CommunityBoardContainer">
            <Header />
            <div className='CommunityBoardGridContent'>
                <div className="CommunityBoardGrid">
                    {currentPlaces.map((place, index) => (
                        <CommunityBoardItem
                            key={index}
                            boardId={place.boardId}
                            title={place.title}
                            content={place.content}
                            count={place.count}
                        />
                    ))}
                </div>
                {currentPlaces.length > 0 && (
                    <div className="communityBoard-pagination">
                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="arrow-btn">
                            첫 페이지
                        </button>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={currentPage === number ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="arrow-btn">
                            마지막 페이지
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommunityBoard;
