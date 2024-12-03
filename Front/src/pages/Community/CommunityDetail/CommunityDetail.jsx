import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CommunityDetail/CommunityDetail.css';
import Header from '../../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import CommentItem from '../CommentItem/CommentItem';

function CommunityDetail() {
    const { boardId } = useParams();
    const navigate = useNavigate();  // useNavigate 훅 추가
    const [community, setCommunity] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4; // 한 페이지에 표시할 댓글 수
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 현재 페이지에 표시될 댓글
    const currentComments = comments.slice(startIndex, endIndex);
    const totalPages = Math.ceil(comments.length / itemsPerPage);

    useEffect(() => {
        let isMounted = true;
        const token = localStorage.getItem('token');

        // 게시글 데이터 가져오기
        fetch(`http://localhost:8080/api/boards/${boardId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache',
            },
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`게시글을 불러오지 못했습니다. 상태 코드: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setCommunity(data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(`게시글을 불러오는 중 오류가 발생했습니다: ${error.message}`);
                    setLoading(false);
                }
            });

        // 댓글 데이터 가져오기
        fetch(`http://localhost:8080/${boardId}/answer`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setComments(Array.isArray(data) ? data : []);
                }
            })
            .catch((error) => console.error('댓글 불러오기 오류:', error));

        return () => {
            isMounted = false;
        };
    }, [boardId]);

    const handleCommentSubmit = () => {
        const token = localStorage.getItem('token');
        
        // 로그인 상태 확인
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');  // 로그인 페이지로 리디렉션
            return;
        }

        if (!newComment.trim()) {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        fetch(`http://localhost:8080/${boardId}/write`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('댓글 작성 실패');
                }
                return response.text();
            })
            .then((message) => {
                alert(message);
                setNewComment('');
                // 댓글 새로고침
                fetch(`http://localhost:8080/${boardId}/answer`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => setComments(Array.isArray(data) ? data : []))
                    .catch((error) => console.error('댓글 새로고침 오류:', error));
            })
            .catch((error) => alert(`댓글 작성 중 오류가 발생했습니다: ${error.message}`));
    };

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

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="CommunityDetailContainer">
            <Header />
            <div>
                {community ? (
                    <>
                        <div className="travelPostContainer">
                            <div className="travelPostHeader">
                                <div className="postDeleteBtnContainer">
                                    <button className="postDeleteBtn">삭제하기</button>
                                </div>
                                <div className="travelPostHeaderContent">
                                    <div className="travelPostHeaderGroup">
                                        <div className="travelPostTitle">{community.title}</div>
                                        <div className="travelPostAuthor">작성자: {community.nickName}</div>
                                    </div>
                                    <div className="travelDateGroup">
                                        여행기간 : {community.planStartDate} ~ {community.planEndDate}
                                    </div>
                                </div>
                            </div>
                            <div className="travelPostContentGroup">
                                <div className="travelPostContent">{community.content}</div>
                                <div className="travelPostImage">이미지 들어가는 공간</div>
                            </div>
                            <hr />
                            <div className="travelPostCommentGroup">
                                <div className="travelPostCommentHeader">
                                    <div className="travelPostCommentTitle">댓글</div>
                                    <div className="travelPostCommentCount">({comments.length})</div>
                                </div>
                                <div className="travelPostCommentItem">
                                    {comments.length > 0 ? (
                                        comments.map((comment, index) => (
                                            <CommentItem
                                                key={index}
                                                answerId={comment.answerId}
                                                content={comment.content}
                                                nickName={comment.nickName}
                                                createdAt={comment.createdAt}
                                            />
                                        ))
                                    ) : (
                                        <div className="noCommentsMessage">현재 등록된 댓글이 없습니다.</div>
                                    )}
                                    {currentComments.map((comment, index) => (
                                        <CommentItem
                                            key={index}
                                            answerId={comment.answerId}
                                            content={comment.content}
                                            nickName={comment.nickName}
                                            createdAt={comment.createdAt}
                                        />
                                    ))}
                                </div>
                                {/* 페이지네이션 버튼은 댓글 목록 아래로 이동 */}
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
                            </div>
                        </div>
                        
                        {/* 댓글 입력란은 맨 아래로 이동 */}
                        <div className="commentInputGroup">
                            <input
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="댓글을 작성하세요."
                                className="commentInput"
                            />
                            <button
                                className={`commentAddBtn ${newComment.trim() ? 'active' : 'disabled'}`}
                                onClick={handleCommentSubmit}
                                disabled={!newComment.trim()}
                            >
                                <FontAwesomeIcon icon={faArrowUp} className="commentAddBtnIcon" />
                            </button>
                        </div>
                    </>
                ) : (
                    <p>게시글을 찾을 수 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default CommunityDetail;
