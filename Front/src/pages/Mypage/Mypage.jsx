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
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // 추가된 상태 변수들
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
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
    }, []);

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
            method: 'POST',
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

    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/mypage/modify/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                newPasswordConfirm: confirmPassword
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                    closePasswordModal();
                } else {
                    return response.text().then((text) => { throw new Error(text); });
                }
            })
            .catch(error => {
                console.error('Failed to change password:', error);
                alert(`비밀번호 변경에 실패했습니다`);
            });
    };


    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setCurrentPassword(''); // 비밀번호 입력 초기화
        setNewPassword('');
        setConfirmPassword('');
    };


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
                    <div className='myPageLayoutTitle'>
                        마이페이지
                    </div>
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
                    {renderContent()}
                </div>

                {/* 비밀번호 변경 모달 */}
                {isPasswordModalOpen && (
                    <>
                        <div className="backdrop" onClick={closePasswordModal}></div>
                        <div className="modal">
                            <button className="close-button" onClick={closePasswordModal}>×</button>
                            <div className="modal-content">
                                <h2>비밀번호 변경</h2>
                                <label htmlFor="currentPassword">현재 비밀번호</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    placeholder="현재 비밀번호"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />

                                <label htmlFor="newPassword">새 비밀번호</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    placeholder="새 비밀번호"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="새 비밀번호 확인"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button className="modal-button" onClick={handlePasswordChange}>변경하기</button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default Mypage;
