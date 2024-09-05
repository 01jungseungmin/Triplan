import React, { useState } from 'react';
import axios from 'axios';
import './InviteDialog.css';

function InviteDialog({ isOpen, onClose, crewId }) {
    const [email, setEmail] = useState('');
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleEmailChange = async (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (inputEmail.length >= 1) {
            try {
                const token = localStorage.getItem('token');
                // crewId를 쿼리 파라미터로 전달하도록 수정
                const response = await axios.get(`http://localhost:8080/mail/autocomplete?crewId=${crewId}&email=${inputEmail}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmailSuggestions(response.data);
            } catch (error) {
                console.error('자동완성 오류:', error);
            }
        } else {
            setEmailSuggestions([]);
        }
    };

    const handleInvite = async () => {
        if (!crewId) {
            setError('그룹 ID가 필요합니다.');
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

    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion);
        setEmailSuggestions([]);  // 추천 리스트를 닫음
    };

    return (
        <div className="inviteDialogOverlay" onClick={onClose}>
            <div className="inviteDialogContainer" onClick={(e) => e.stopPropagation()}>
                <div className="inviteDialogHeader">
                    <div className="inviteDialogTitle">초대하기</div>
                    <div className="inviteDialogContent">함께 여행하는 사람을 초대해 보세요.</div>
                    <button className="closeButton" onClick={onClose}>X</button>
                </div>
                <div className="inviteDialogBody">
                    <div className="inviteDialogBodyTitle">초대 받는 이메일</div>
                    <input
                        type="email"
                        className="inviteEmailInput"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailSuggestions.length > 0 && (
                        <ul className="suggestionsList">
                            {emailSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
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
