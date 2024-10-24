import React, { useState } from 'react';
import './InviteDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function InviteDialog({ isOpen, onClose, crewId }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleInvite = async () => {
        console.log('crewId:', crewId);
        if (!crewId) {
            setError('그룹 ID가 필요합니다.'); // Add this line for error handling
            return;
        }
        if (!email) {
            setError('이메일을 입력하세요.');
            return; 
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/mail/send/${crewId}`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('초대 메일 발송 성공');
            onClose();
        } catch (error) {
            setError('초대 메일 발송 실패: ' + (error.response?.data?.message || error.message));
        }
    };

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
                    <input
                        type="email"
                        className="inviteEmailInput"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <div className="errorMessage">{error}</div>}
                </div>
                <div className="inviteDialogFooter">
                    <button className="inviteButton" onClick={handleInvite}>초대하기</button>
                </div>
            </div>
        </div>
    );
}

export default InviteDialog;
