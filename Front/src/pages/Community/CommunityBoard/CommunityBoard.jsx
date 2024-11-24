import React, { useState, useEffect } from 'react';
import '../CommunityBoard/CommunityBoard.css';
import Header from "../../../components/Header";
import CommunityBoardItem from "../../../components/CommunityBoardItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function CommunityBoard() {
    const [boards, setBoards] = useState([]); // API에서 불러온 커뮤니티 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9; // 한 페이지에 표시할 게시글 수
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 현재 페이지에 표시될 게시글
    const currentBoards = boards.slice(startIndex, endIndex);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        fetch('http://localhost:8080/api/boards', {
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
                setBoards(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('에러 발생:', error.message);
                setError(`커뮤니티 데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(boards.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                    {currentBoards.map((board) => (
                        <CommunityBoardItem
                            key={board.boardId}
                            boardId={board.boardId}
                            title={board.title}
                            content={board.content}
                            nickName={board.nickName}
                            count={board.count}
                        />
                    ))}
                </div>
                {currentBoards.length > 0 && (
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={i + 1 === currentPage ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommunityBoard;
