import React from 'react';
import '../CommentItem/CommentItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 로케일 추가


function CommentItem({ answerId, content, nickName, createdAt, updatedAt, boardId }) {
    return (
        <div className="commentItemContainer">
            <div className="commentHeader">
                <div className="commentUsername">{nickName}</div>
                <FontAwesomeIcon icon={faCircle} className='circleIcon'/>
                <div className="commentTime">
                    {createdAt
                        ? `${formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko })}`
                        : '방금 전'}
                </div>
            </div>
            <div className="commentBody">{content}</div>
        </div>
    )
}

export default CommentItem;