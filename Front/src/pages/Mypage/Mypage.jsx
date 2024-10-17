import '../Mypage/Mypage.css';
import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';

function Mypage() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:8080/api/userinfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 토큰 포함
                }
            })
                .then(response => response.json())
                .then(data => setUserInfo(data)) // 사용자 정보를 상태에 저장
                .catch(error => {
                    console.error('사용자 정보 불러오기 실패:', error);
                    alert('사용자 정보를 불러오지 못했습니다.');
                });
        }
    }, []);

    if (!userInfo) {
        return <div>로딩 중...</div>; // 사용자 정보를 불러오는 동안 로딩 표시
    }

    return (
        <div className="MyPageContainer">
            <Header />
            <div>
                <h2>마이페이지</h2>
                <p>이름: {userInfo.email}</p>
                <p>이메일: {userInfo.nickName}</p>
            </div>
            {/* 필요한 사용자 정보 추가 */}
        </div>
    );
}

export default Mypage;