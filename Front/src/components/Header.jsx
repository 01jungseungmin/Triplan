import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [selectedMenu, setSelectedMenu] = useState("navHome");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로를 가져오기 위한 hook

    useEffect(() => {
        // 페이지 이동 시 URL 경로에 따라 선택된 메뉴를 업데이트
        const path = location.pathname.toLowerCase(); // 경로를 소문자로 변환
        if (path === '/') {
            setSelectedMenu("navHome");
        } else if (path.includes('/mytrip')) { // 경로에 '/mytrip'이 포함된 경우
            setSelectedMenu("navMyTrip");
        } else if (path.includes('/community')) {
            setSelectedMenu("navCommunity");
        }
    }, [location.pathname]); // 경로가 바뀔 때마다 실행

    useEffect(() => {
        // localStorage에서 토큰이 있는지 확인하여 로그인 상태 결정
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
        }
    }, []);

    const handleMenuClick = (menuId, path) => {
        navigate(path);
    };

    const logoClick = () => {
        navigate('/');
    };

    // 로그아웃 처리 함수
    const handleLogoutClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            // 백엔드로 로그아웃 요청 보내기
            fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // 토큰을 Authorization 헤더에 포함
                }
            })
            .then((response) => {
                if (response.ok) {
                    // 로그아웃 성공 시, localStorage에서 토큰 삭제
                    localStorage.removeItem("token");
                    setIsLoggedIn(false); // 로그인 상태 해제
                    navigate('/'); // 홈으로 이동
                } else {
                    console.error("로그아웃 실패");
                }
            })
            .catch((error) => {
                console.error("로그아웃 요청 중 오류 발생:", error);
            });
        } else {
            navigate('/login'); // 로그인 페이지로 이동
        }
    };

    // 마이페이지로 이동하는 함수
    const handleUserIconClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            navigate('/mypage'); // 마이페이지로 이동
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    };

    return (
        <header className="header">
            <div className="logo" onClick={logoClick} style={{ cursor: 'pointer' }}>
                <span className="maintitle">TRIPLAN</span>
                <span className="subtitle">TRIPLAN</span>
            </div>
            <nav className="nav-menu">
                <a href="/"
                    className={`nav-item ${selectedMenu === "navHome" ? "selected" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navHome", '/'); }}>홈</a>

                <a href="/mytrip"
                    className={`nav-item ${selectedMenu === "navMyTrip" ? "selected" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navMyTrip", '/mytrip'); }}>내 여행</a>

                <a href="/community"
                    className={`nav-item ${selectedMenu === "navCommunity" ? "selected" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navCommunity", '/community'); }}>커뮤니티</a>
            </nav>
            <div className="auth">
                {isLoggedIn ? (
                    <div className="logout-section">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="faUser"
                            size="lg"
                            color="#adb5bd"
                            onClick={handleUserIconClick} // 아이콘 클릭 시 마이페이지로 이동
                        />
                        <div className="login-btn" onClick={handleLogoutClick}>Log out</div> {/* 로그아웃 버튼 */}
                    </div>
                ) : (
                    <a href="/" className="login-btn" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log in</a>
                )}
            </div>
        </header>
    );
}

export default Header;
