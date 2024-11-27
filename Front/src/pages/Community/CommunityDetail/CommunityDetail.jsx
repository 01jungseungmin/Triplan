import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CommunityDetail/CommunityDetail.css';
import Header from '../../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import CommentItem from '../CommentItem/CommentItem';

function CommunityDetail() {
    const { boardId } = useParams();
    const [Community, setCommunity] = useState(null);

    useEffect(() => {
        // placeId에 해당하는 장소 데이터를 백엔드에서 불러옵니다.
        fetch(`http://localhost:8080/api/boards/${boardId}`)
            .then(response => response.json())
            .then(data => setCommunity(data))
            .catch(error => console.error('Error fetching Community data:', error));
    }, [boardId]);

    return (
        <div className='CommunityDetailContainer'>
            <Header />
            <div>
                {Community ? (
                    <>
                        <div className="travelPostContainer">
                            <div className="travelPostHeader">
                                <div className='postDeleteBtnContainer'>
                                    <button className="postDeleteBtn">삭제하기</button>
                                </div>
                                <div className='travelPostHeaderContent'>
                                    <div className='travelPostHeaderGroup'>
                                        <div className='travelPostTitle'>여행기 제목</div>
                                        <div className="travelPostAuthor">작성자: 김수빈</div>
                                    </div>
                                    <div className="travelDateGroup">
                                        여행기간 : 2024.11.24 ~ 2024.11.28
                                    </div>
                                </div>
                            </div>
                            <div className="travelPostContentGroup">
                                <div className='travelPostContent'>
                                부산 바다 만끽하고 돌아온 2박 3일 부산여행! 나홀로 여행가는 사람들에게 추천합니다!
                                </div>
                                <div className="travelPostImage">이미지 들어가는 공간</div>
                            </div>
                            <hr />
                            <div className="travelPostScheduleGroup">
                                <div className='travelPostScheduleTitle'>여행 일정</div>
                                <div className="travelDayBtnGroup">
                                    <button className="travelDayBtn">DAY 1</button>
                                </div>
                            </div>
                            <hr />
                            <div className='travelPostCommentGroup'>
                                <div className='travelPostCommentHeader'>
                                    <div className='travelPostCommentTitle'>댓글</div>
                                    <div className='travelPostCommentCount'>(24)</div>
                                </div>
                                <div className='travelPostCommentItem'>
                                    <CommentItem />
                                </div>
                                <div className='commentInputGroup'>
                                    <input placeholder='댓글을 작성하세요.' className='commentInput' />
                                    <button className='commentAddBtn'>
                                        <FontAwesomeIcon icon={faArrowUp} className='commentAddBtnIcon'/>
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
    )
}

export default CommunityDetail;