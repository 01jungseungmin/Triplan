import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/Login.css';

function Login() {
  const navigate = useNavigate();
  const[email, setEmail] = useState("");
  const[pass, setPass] = useState("");

  const logoOnclick = () => {
    navigate('/');
  }

  const joinOnclick = () => {
    navigate('/Join')
  }

  const loginForm= (e) => {
    e.preventDefault();

    if(!email || !pass) {
      alert("이메일, 비밀번호 모두 입력해주세요.");
      return;
    } else {
      alert(email + ", " + pass + ", ");
      return;
    }
  }

  return (
    <div className="login">
    <div className="login-container">
      <div className="login-box">
        <div className="loginPage_logo" onClick={logoOnclick} style={{cursor: 'pointer'}}>
            <span className="loginPage-maintitle">TRIPLAN</span>
            <span className="loginPage-subtitle">TRIPLAN</span>
        </div>
        <div className="loginPage_logoTxt">
          <div className="logoTxt">여행을 계획하고 공유하는 공간</div>
          <div className="logosubTxt1">맛집부터 관광 명소까지 모두 모여있어요.</div>
          <div className="logosubTxt2">자신의 계획을 다른 사용들에게 공유해요.</div>
        </div>
        <form onSubmit={loginForm}>
          <div className="login-email-box">
            <div className="email-title">이메일</div>
            <input type="email" placeholder="Email" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-pass-box">
            <div className="pass-title">비밀번호</div>
            <input type="password" placeholder="Password" className="pass-input" value={pass} onChange={(e) => setPass(e.target.value)}/>
          </div>
          <button type="submit" className="login-button">Login</button>
          <button className="join-button" onClick={joinOnclick} style={{cursor: 'pointer'}}>회원가입</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
