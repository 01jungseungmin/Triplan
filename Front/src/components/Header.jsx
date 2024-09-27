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
        const userId = getCookie("user_id");
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleMenuClick = (menuId, path) => {
        navigate(path);
    };

    const logoClick = () => {
        navigate('/');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsLoggedIn(false);
            navigate('/');
        } else {
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
                <a href="/" className="login-btn" onClick={handleLoginClick}>
                    {isLoggedIn ? (
                        <div className="logout-section">
                            <FontAwesomeIcon icon={faUser} className="faUser" size="lg" color="#adb5bd"/>
                            <div href="/" className="login-btn" onClick={handleLoginClick}>Log out</div>
                        </div>
                    ) : 'Log in'}
                </a>
            </div>
        </header>
    );
}

export default Header;
