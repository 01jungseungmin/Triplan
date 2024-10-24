import React from 'react';
import './InviteDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function InviteDialog({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="inviteDialogOverlay" onClick={onClose}>
            <div className="inviteDialogContainer" onClick={(e) => e.stopPropagation()}>
                <div className="inviteDialogHeader">
                    <div className='inviteDialogTitle'>초대하기</div>
                    <div className='inviteDialogContent'>함께 여행하는 사람을 초대해 보세요.</div>
                    <button className="closeButton" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className="inviteDialogBody">
                    <div className="inviteDialogBodyTitle">초대 받는 이메일</div>
                    <input type="email" className="inviteEmailInput" placeholder="이메일 입력" />
                </div>
                <div className="inviteDialogFooter">
                    <button className="inviteButton">초대하기</button>
                </div>
            </div>
        </div>
    );
}

export default InviteDialog;
