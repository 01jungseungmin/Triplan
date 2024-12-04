import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

        // JWT 토큰과 이메일을 로컬 스토리지에 저장
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email); // 이메일 저장

        alert("로그인 성공!");

        // 이메일이 특정 관리자 계정이라면 adminPlace로 리다이렉션
        if (email === "admin@naver.com") {
          navigate('/admin/place/list');
        } else {
          // 일반 계정은 메인 페이지로 리다이렉션
          navigate('/main');
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
