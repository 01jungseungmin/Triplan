import '../Mypage/Mypage.css';
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Mypage() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickName: ''
    });
    const [activeTab, setActiveTab] = useState('내 정보'); // State for tab selection
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:8080/api/userinfo', {
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
        // Handle the save functionality
        console.log('Saving user info:', userInfo);
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
                        <button className="passwordChangeButton">비밀번호 변경</button>
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

    if (loading) {
        return <div>로딩 중...</div>; // Show loading while fetching data
    }

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
            </div>
        </div>
    );
}

export default Mypage;
