import React, { useEffect, useState } from 'react';
import '../Mypage/Mypage.css';
import Header from "../../components/Header";

function Mypage() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickName: ''
    });
    const [activeTab, setActiveTab] = useState('내 정보');
    const [loading, setLoading] = useState(true);
    const [passwordVerified, setPasswordVerified] = useState(false); // 비밀번호 인증 여부
    const [password, setPassword] = useState(''); // 비밀번호 입력 값
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 모달 창 열림 여부
    const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // 새 비밀번호 확인

    useEffect(() => {
        if (passwordVerified) {
            const token = localStorage.getItem('token');

            if (token) {
                fetch('http://localhost:8080/mypage/user-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setUserInfo({
                            email: data.email,
                            nickName: data.nickName
                        });
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Failed to load user information:', error);
                        alert('Failed to load user information.');
                        setLoading(false);
                    });
            }
        }
    }, [passwordVerified]);

    const handlePasswordVerification = () => {
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/mypage/password-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password })
        })
            .then(response => {
                if (response.ok) {
                    alert('비밀번호 인증 성공');
                    setPasswordVerified(true);
                } else {
                    alert('비밀번호 인증 실패');
                }
            })
            .catch(error => {
                console.error('Failed to verify password:', error);
                alert('비밀번호 인증에 실패했습니다.');
            });
    };

    const handlePasswordChangeSubmit = () => {
        if (!newPassword || !confirmNewPassword) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/mypage/modify/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                newPassword,
                confirmNewPassword
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                    closePasswordModal();
                } else {
                    alert('비밀번호 변경에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('Failed to change password:', error);
                alert('비밀번호 변경에 실패했습니다.');
            });
    };

    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/mypage/modify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => {
                if (response.ok) {
                    alert('정보가 성공적으로 업데이트되었습니다.');
                    return response.json();
                } else {
                    throw new Error('Failed to update user information');
                }
            })
            .then(data => {
                setUserInfo({
                    email: data.email,
                    nickName: data.nickName
                });
            })
            .catch(error => {
                console.error('Failed to update user information:', error);
                alert('정보 업데이트에 실패했습니다.');
            });
    };

    const renderPasswordVerification = () => (
        <div className="passwordVerificationContainer">
            <div className='passwordVerificationTitle'>비밀번호 재확인</div>
            <div className='passwordVerificationContent'>최신 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해주세요.</div>
            <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="checkPasswordInput"
            />
            <button className="verifyButton" onClick={handlePasswordVerification}>확인</button>
        </div>
    );

    const renderContent = () => {
        if (activeTab === '내 정보') {
            return (
                <div className="myPageForm">
                    <div className="formGroup">
                        <div className="emailTxt">이메일</div>
                        <input
                            type="email"
                            id="mypageEmailInput"
                            name="email"
                            value={userInfo.email}
                            placeholder='test@naver.com'
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="formGroup">
                        <div className="passwordChangeTxt">비밀번호</div>
                        <button className="passwordChangeButton" onClick={openPasswordModal}>비밀번호 변경</button>
                    </div>
                    <div className="formGroup">
                        <div className="nickNameTxt">닉네임</div>
                        <input
                            type="text"
                            id="mypageNickNameInput"
                            name="nickName"
                            value={userInfo.nickName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='saveButtonGroup'>
                        <button className="saveButton" onClick={handleSubmit}>저장하기</button>
                    </div>
                </div>
            );
        } else if (activeTab === '초대 알림') {
            return <div className="inviteNotification">초대 알림이 여기에 표시됩니다.</div>;
        }
    };

    return (
        <div className="MyPageContainer">
            <Header />
            <div className="myPageLayout">
                <div className='myPageLayoutTabContainer'>
                    <div className='myPageLayoutTitle'>마이페이지</div>
                    <div className="myPageTabs">
                        <div
                            className={`myPageTab ${activeTab === '내 정보' ? 'active' : ''}`}
                            onClick={() => setActiveTab('내 정보')}
                        >
                            내 정보
                        </div>
                        <div
                            className={`myPageTab ${activeTab === '초대 알림' ? 'active' : ''}`}
                            onClick={() => setActiveTab('초대 알림')}
                        >
                            초대 알림
                        </div>
                    </div>
                </div>
                <div className="myPageContent">
                    {!passwordVerified ? renderPasswordVerification() : renderContent()}
                </div>

                {/* 비밀번호 변경 모달 */}
                {isPasswordModalOpen && (
                    <div className="modalOverlay">
                        <div className="passwordModal">
                            <div className="modalHeader">
                                <div className='modalHeaderTitle'>비밀번호 변경</div>
                                <button className="modalCloseButton" onClick={closePasswordModal}>×</button>
                            </div>
                            <div className="passwordChangeModalBody">
                                <div className='currentPasswordBox'>
                                    <label className="currentPasswordLabel" htmlFor="currentPassword">현재 비밀번호</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        placeholder="현재 비밀번호"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="passChangeModalInput"
                                    />
                                </div>
                                <div className='newPasswordBox'>
                                    <label className="newPasswordLabel" htmlFor="newPassword">새 비밀번호</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        placeholder="새 비밀번호"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="passChangeModalInput"
                                    />
                                </div>
                                <div className='confirmNewPasswordBox'>
                                    <label className="confirmNewPasswordLabel" htmlFor="confirmNewPassword">새 비밀번호 확인</label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        placeholder="새 비밀번호 확인"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="passChangeModalInput"
                                    />
                                </div>
                            </div>
                            <div className="modalFooter">
                                <button className="modalButton" onClick={handlePasswordChangeSubmit}>변경하기</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Mypage;
