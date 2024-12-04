import React from "react";
import { Link } from 'react-router-dom';
import '../components/css/CommunityBoardItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function CommunityBoardItem({ boardId, title, content, count, nickName, imageUrl }) {
    const defaultImageUrl = "https://png.pngtree.com/thumb_back/fw800/background/20231004/pngtree-landscape-photographer-image_13347284.jpg";

    return (
        <Link to={`/api/boards/${boardId}`} className="boardItemLink">
            <div className="boardItemContainer">
                <div className="boardItemImage">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src={imageUrl || defaultImageUrl}
                        alt={title}
                        title={title}
                        className="boardItemImg"
                    />
                </div>
                <div className="boardItemBody">
                    <div className="boardItemTitle">{title}</div>
                    <div className="boardItemContent">{content}</div>
                    <div className="boardItemFooter">
                        <div className="boardItemWriterContent">
                            <div className="boardItemWriter">작성자 :</div>
                            <div className="boardItemWriterName">{nickName}</div>
                        </div>
                        <div className="boardItemCountContent">
                            <FontAwesomeIcon icon={faEye} className="eyeIcon" />
                            <div className="boardItemCount">{count}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CommunityBoardItem;