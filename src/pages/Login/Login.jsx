import React, { useState } from "react";
import '../Login/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logoTxt">TRIPLAN</div>
        <form>
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
