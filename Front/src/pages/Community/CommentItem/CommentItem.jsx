import React from 'react';
import '../CommentItem/CommentItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function CommentItem({answerId, content, accountId, boardId}) {
    return (
        <div className="commentItemContainer">
            <div className="commentHeader">
                <div className="commentUsername">김수빈</div>
                <FontAwesomeIcon icon={faCircle} className='circleIcon'/>
                <div className="commentTime">10일 전</div>
            </div>
            <div className="commentBody">부산 여행 너무 재밌을 거 같아요!</div>
        </div>
    )
}

export default CommentItem;