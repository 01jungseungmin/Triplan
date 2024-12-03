import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CommunityDetail/CommunityDetail.css';
import Header from '../../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import CommentItem from '../CommentItem/CommentItem';

function CommunityDetail() {
    const { boardId } = useParams();
    const [community, setCommunity] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 상태 초기값 빈 배열
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    setComments(Array.isArray(data) ? data : []); // 방어적 코드 추가
                }
            })
            .catch((error) => console.error('댓글 불러오기 오류:', error));

        return () => {
            isMounted = false;
        };
    }, [boardId]);

    // 댓글 데이터 변경 시 확인
    useEffect(() => {
        console.log('댓글 데이터:', comments); // API에서 전달받은 댓글 데이터 출력
    }, [comments]);

    const handleCommentSubmit = () => {
        const token = localStorage.getItem('token');
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
                                </div>
                                <div className="commentInputGroup">
                                    <input
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="댓글을 작성하세요."
                                        className="commentInput"
                                    />
                                    <button className="commentAddBtn" onClick={handleCommentSubmit}>
                                        <FontAwesomeIcon icon={faArrowUp} className="commentAddBtnIcon" />
                                    </button>
                                </div>
                            </div>
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
