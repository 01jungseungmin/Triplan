import React from "react";
import '../AdminCommunity/AdminCommunityItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

function AdminCommunityItem() {
    return (
        <Link to={`/admin/community/details/:communityId`} className="adminBoardItemLink">
            <div className="adminBoardItemContainer">
                <div className="adminBoardItemImage">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340" // 기본 이미지 (또는 실제 데이터에서 받아온 이미지 URL)
                        alt={`이미지`}
                        className="adminBoardItemImg"
                    />
                </div>
                <div className="adminBoardItemBody">
                    <div className="adminBoardItemTitle">관리자 게시물 제목</div>
                    <div className="adminBoardItemContent">관리자 게시물 내용</div>
                    <div className="adminBoardItemFooter">
                        <div className="adminBoardItemWriterContent">
                            <div className="adminBoardItemWriter">작성자 :</div>
                            <div className="adminBoardItemWriterName">관리자</div>
                        </div>
                        <div className="adminBoardItemCountContent">
                            <FontAwesomeIcon icon={faEye} className="eyeIcon" />
                            <div className="adminBoardItemCount">212</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AdminCommunityItem;