import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import '../Login/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const logoOnclick = () => {
    navigate('/');
  };

  const joinOnclick = () => {
    navigate('/Join');
  };

  const loginInput = email && pass;

  const loginForm = async (e) => {
    e.preventDefault();
  
    if (!loginInput) {
      alert("이메일, 비밀번호 모두 입력해주세요.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: pass }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', data.token);
  
        // JWT 토큰 디코딩하여 사용자 권한(auth) 추출
        const decodedToken = jwtDecode(data.token);
        const userAuth = decodedToken.auth; // 'auth' 필드를 사용
  
        alert("로그인 성공!");
  
        // 사용자의 권한에 따라 리디렉션
        if (userAuth === "ADMIN") {
          navigate('/admin/place/list');
        } else if (userAuth === "USER") {
          navigate('/');
        } else {
          navigate('/'); // 기본 홈으로 리디렉션
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-box">
          <div className="loginPage_logo" onClick={logoOnclick} style={{ cursor: 'pointer' }}>
            <span className="loginPage-maintitle">TRIPLAN</span>
            <span className="loginPage-subtitle">TRIPLAN</span>
          </div>
          <div className="loginPage_logoTxt">
            <div className="logoTxt">여행을 계획하고 공유하는 공간</div>
            <div className="logosubTxt1">맛집부터 관광 명소까지 모두 모여있어요.</div>
            <div className="logosubTxt2">자신의 계획을 다른 사용자에게 공유해요.</div>
          </div>
          <form onSubmit={loginForm}>
            <div className="login-email-box">
              <div className="email-title">이메일</div>
              <input
                type="text"
                placeholder="Email"
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-pass-box">
              <div className="pass-title">비밀번호</div>
              <input
                type="password"
                placeholder="Password"
                className="pass-input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button type="submit" className={`login-button ${loginInput ? 'active' : ''}`} disabled={!loginInput}>Login</button>
            <button type="button" className="join-button" onClick={joinOnclick} style={{ cursor: 'pointer' }}>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
