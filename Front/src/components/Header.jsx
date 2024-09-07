import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Header.css';

function Header() {
    const [selectedMenu, setSelectedMenu] = useState("navHome");
    const navigate = useNavigate();

    const handleMenuClick = (menuId) => {
        setSelectedMenu(menuId);
    }

    const logoClick = () => {
        navigate('/');
    }

    const handleLoginClick = (e) => {
        e.preventDefault(); 
        navigate('/login'); 
    }

    return (
        <header className="header">
            <div className="logo" onClick={logoClick} style={{cursor: 'pointer'}}>
                <span className="maintitle">TRIPLAN</span>
                <span className="subtitle">TRIPLAN</span>
            </div>
            <nav className="nav-menu">
                <a href="/" 
                className={`nav-item ${selectedMenu === "navHome" ? "selected" : ""}`}

                id="navHome"
                onClick={(e) => {e.preventDefault(); handleMenuClick("navHome");}}>홈</a>
                <a href="/" 
                className={`nav-item ${selectedMenu === "navMyTrip" ? "selected" : ""}`}
                id="navMyTrip"
                onClick={(e) => {e.preventDefault(); handleMenuClick("navMyTrip");}}>내 여행</a>
                <a href="/" 
                className={`nav-item ${selectedMenu === "navCommunity" ? "selected" : ""}`}
                id="navCommunity"
                onClick={(e) => {e.preventDefault(); handleMenuClick("navCommunity");}}>커뮤니티</a>
            </nav>
            <div className="auth">
                <a href="/login" className="login-btn" onClick={handleLoginClick}>Log in</a>
            </div>
        </header>
    )
}

export default Header;