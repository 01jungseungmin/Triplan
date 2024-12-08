import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CommunityDetail/CommunityDetail.css';
import Header from '../../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import CommentItem from '../CommentItem/CommentItem';
import { jwtDecode } from 'jwt-decode';
import MyTripPlanPlaceItem from "../../MyTripDetail/MyTripPlanPlaceItem/MyTripPlanPlaceItem";

function CommunityDetail() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentnickName, setcurrentnickName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentComments = comments.slice(startIndex, endIndex);
    const totalPages = Math.ceil(comments.length / itemsPerPage);

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

    useEffect(() => {
        // 토큰에서 현재 사용자 이메일 추출
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setcurrentnickName(decodedToken.sub); // sub를 email로 설정
            } catch (error) {
                console.error('토큰 디코딩 중 오류 발생:', error);
            }
        }
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:8080/api/boards/${boardId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('게시글을 불러오지 못했습니다.');
                const data = await response.json();
                {console.log("현재 사용자 이메일:", data)}
                setCommunity(data);

                // 댓글 데이터 가져오기
                const commentsResponse = await fetch(`http://localhost:8080/${boardId}/answer`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const commentsData = await commentsResponse.json();
                setComments(Array.isArray(commentsData) ? commentsData : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [boardId]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            community.imageUrls && community.imageUrls.length > 0
                ? (prevIndex + 1) % community.imageUrls.length
                : prevIndex
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            community.imageUrls && community.imageUrls.length > 0
                ? (prevIndex - 1 + community.imageUrls.length) % community.imageUrls.length
                : prevIndex
        );
    };

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
            const response = await fetch(`http://localhost:8080/api/boards/${boardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('게시글이 삭제되었습니다.');
                navigate('/community'); // 커뮤니티 목록 페이지로 이동
            } else {
                throw new Error('게시글 삭제 실패');
            }
        } catch (error) {
            alert(`게시글 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    };
    const handleModifyPost = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
    
        // Collect updated data (you can replace this with inputs or a modal)
        const updatedTitle = prompt('새 제목을 입력하세요:', community?.title);
        const updatedContent = prompt('새 내용을 입력하세요:', community?.content);
    
        if (!updatedTitle || !updatedContent) {
            alert('제목과 내용을 입력하세요.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/boards/${boardId}/modify`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    content: updatedContent,
                }),
            });
    
            if (!response.ok) throw new Error('게시글 수정 실패');
            
            const message = await response.text();
            alert(message);
            
            // Optionally, refresh the post data
            const updatedResponse = await fetch(`http://localhost:8080/api/boards/${boardId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const updatedData = await updatedResponse.json();
            setCommunity(updatedData);
    
        } catch (error) {
            alert(`게시글 수정 중 오류가 발생했습니다: ${error.message}`);
        }
    };
    const handleCommentSubmit = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        if (!newComment.trim()) {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/${boardId}/write`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (!response.ok) throw new Error('댓글 작성 실패');
            alert('댓글이 작성되었습니다.');
            setNewComment('');

            // 댓글 새로고침
            const commentsResponse = await fetch(`http://localhost:8080/${boardId}/answer`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const commentsData = await commentsResponse.json();
            setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (error) {
            alert(`댓글 작성 중 오류가 발생했습니다: ${error.message}`);
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
                                {(isAdmin ||(currentnickName && community && currentnickName === community.email)) && (
                                    <>
                                        <div className="postDeleteBtnContainer">
                                            <button className="postDeleteBtn" onClick={handleDeletePost}>
                                                삭제하기
                                            </button>
                                            { !isAdmin &&(<button className="postModifyBtn" onClick={handleModifyPost}>
                                                수정하기
                                            </button>)}
                                        </div>
                                    </>
                                )}
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
                                {community.imageUrls && community.imageUrls.length > 0 && (
                                    <div className="travelPostImage">
                                        <div className="imageSlider">
                                            <button className="communityarrow left" onClick={handlePrevImage}>
                                                &#8592;
                                            </button>
                                            <img
                                                src={community.imageUrls[currentImageIndex]}
                                                alt={`이미지 ${currentImageIndex + 1}`}
                                                className="postImage"
                                            />
                                            <button className="communityarrow right" onClick={handleNextImage}>
                                                &#8594;
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="addedPlans">
                                <h3>작성자가 추가한 일정</h3>
                                {community.plans.map((plan) => (
                                    <MyTripPlanPlaceItem
                                        key={plan.planId}
                                        crewId={plan.crewId}
                                        date={plan.planDate}
                                    />
                                ))}
                            </div>

                            <hr />
                            <div className="travelPostCommentGroup">
                                <div className="travelPostCommentHeader">
                                    <div className="travelPostCommentTitle">댓글</div>
                                    <div className="travelPostCommentCount">({comments.length})</div>
                                </div>
                                <div className="travelPostCommentItem">
                                    {currentComments.length > 0 ? (
                                        currentComments.map((comment, index) => (
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
                                </div>
                                <div className="pagination">
                                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                        <FontAwesomeIcon icon={faAnglesLeft} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={currentPage === i + 1 ? 'active' : ''}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                                        <FontAwesomeIcon icon={faAnglesRight} />
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                <FontAwesomeIcon icon={faArrowUp} />
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
