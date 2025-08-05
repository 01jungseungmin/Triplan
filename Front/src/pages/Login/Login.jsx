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
      const response = await fetch('http://13.209.211.218:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: pass }),
      });
    
      // JSON으로 직접 파싱
      const data = await response.json();
      console.log('서버 응답 JSON:', data);
    
      if (!response.ok) {
        console.error("서버 응답 오류:", responseText);
        alert("로그인 실패: " + responseText);
        return;
      }
    
      if (!response.ok) {
        console.error("서버 응답 오류:", data);
        alert("로그인 실패: " + (data.message || '오류 발생'));
        return;
      }
      
      const token = data.accessToken;
      console.log('accessToken:', token, 'typeof:', typeof token);
      
      if (!token || typeof token !== 'string') {
        alert("서버 응답에 유효한 accessToken이 없습니다.");
        return;
      }
      
      localStorage.setItem('token', token);
    
      try {
        const decodedToken = jwtDecode(token);
        console.log('디코딩된 토큰:', decodedToken);
      } catch (decodeError) {
        console.error("JWT 디코딩 실패:", decodeError);
        alert("토큰 디코딩 실패");
        return;
      }
    
      alert("로그인 성공!");
      navigate('/');
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 네트워크 오류 발생");
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
