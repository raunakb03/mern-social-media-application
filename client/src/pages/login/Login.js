import React from "react";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Connect with the friends and the world around you with social.
          </span>
        </div>
        <div className="loginRight">
            <div className="loginBox">
                <input type="email" placeholder="Email" className="loginInput" />
                <input type="text" placeholder="Password" className="loginInput" />
                <button className="loginButton">Log In</button>
                <span className="loginForgot">Forgot Password</span>
                <button className="loginRegisterButton">Create Account</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
