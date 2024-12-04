import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './css/Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';


function Header() {
    const [selectedMenu, setSelectedMenu] = useState("navHome");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.toLowerCase();
        if (path === '/') {
            setSelectedMenu("navHome");
        } else if (path.includes('/mytrip')) {
            setSelectedMenu("navMyTrip");
        } else if (path.includes('/community')) {
            setSelectedMenu("navCommunity");
        } else if (path.includes('/placeboard')) {
            setSelectedMenu("navPlace");
        }
    }, [location.pathname]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userAuth = decodedToken.auth; // JWT의 'auth' 필드를 통해 권한 확인
                if (userAuth === 'ADMIN') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('JWT 디코딩 중 오류 발생:', error);
            }
        }
    }, []);

    const handleMenuClick = (menuId, path) => {
        setSelectedMenu(menuId); // 클릭된 메뉴를 선택된 메뉴로 설정
        navigate(path);
    };

    const logoClick = () => {
        {
            navigate('/');
        }
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            fetch('http://ec2-13-209-211-218.ap-northeast-2.compute.amazonaws.com:8080/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    navigate('/');
                } else {
                    console.error("로그아웃 실패");
                }
            })
            .catch((error) => {
                console.error("로그아웃 요청 중 오류 발생:", error);
            });
        } else {
            navigate('/login');
        }
    };

    const handleUserIconClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            navigate('/mypage');
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
                {isAdmin ? (
                    <>
                <a href="/"
                    className={`nav-item ${selectedMenu === "navHome" ? "selected" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navHome", '/'); }}>
                    홈
                </a>
                {isAdmin && (
                    <a href="/placeboard"
                        className={`nav-item ${selectedMenu === "navPlace" ? "selected" : ""}`}
                        onClick={(e) => { e.preventDefault(); handleMenuClick("navPlace", '/placeboard'); }}>
                        장소관리
                    </a>
                )}
                <a href="/community"
                    className={`nav-item ${selectedMenu === "navCommunity" ? "selected" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleMenuClick("navCommunity", '/community'); }}>
                    커뮤니티
                </a>
                </>
                ) : (
                    <>
                        <a href="/"
                            className={`nav-item ${selectedMenu === "navHome" ? "selected" : ""}`}
                            onClick={(e) => { e.preventDefault(); handleMenuClick("navHome", '/'); }}>
                            홈
                        </a>

                        <a href="/mytrip"
                            className={`nav-item ${selectedMenu === "navMyTrip" ? "selected" : ""}`}
                            onClick={(e) => { e.preventDefault(); handleMenuClick("navMyTrip", '/mytrip'); }}>
                            내 여행
                        </a>

                        <a href="/community"
                            className={`nav-item ${selectedMenu === "navCommunity" ? "selected" : ""}`}
                            onClick={(e) => { e.preventDefault(); handleMenuClick("navCommunity", '/community'); }}>
                            커뮤니티
                        </a>
                    </>
                )}
            </nav>
            <div className="auth">
                {isLoggedIn ? (
                    <div className="logout-section">
                        {isAdmin ? (
                            <div className="admin-text">관리자</div>
                        ) : (
                            <FontAwesomeIcon
                                icon={faUser}
                                className="faUser"
                                size="lg"
                                color="#adb5bd"
                                onClick={handleUserIconClick}
                            />
                        )}
                        <div className="login-btn" onClick={handleLogoutClick}>Log out</div>
                    </div>
                ) : (
                    <a href="/" className="login-btn" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log in</a>
                )}
            </div>
        </header>
    );
}

export default Header;