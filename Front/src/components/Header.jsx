import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [selectedMenu, setSelectedMenu] = useState("navHome");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로그인 상태를 확인
        const userId = getCookie("user_id");
        if (userId) {
            setIsLoggedIn(true); // 로그인 상태로 설정
        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleMenuClick = (menuId, path) => {
        setSelectedMenu(menuId);
        navigate(path);
    };

    const logoClick = () => {
        navigate('/');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            // 로그아웃 처리
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsLoggedIn(false); // 상태 업데이트
            navigate('/'); // 홈으로 이동
        } else {
            navigate('/login'); // 로그인 페이지로 이동
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
                    id="navHome"
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navHome", '/'); }}>홈</a>

                <a href="/"
                    className={`nav-item ${selectedMenu === "navMyTrip" ? "selected" : ""}`}
                    id="navMyTrip"
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navMyTrip", '/mytrip'); }}>내 여행</a>

                <a href="/"
                    className={`nav-item ${selectedMenu === "navCommunity" ? "selected" : ""}`}
                    id="navCommunity"
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
