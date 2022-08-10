import React from "react";
import "./register.css";

function Register() {
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
                <input type="text" placeholder="Username" className="loginInput" />
                <input type="email" placeholder="Email" className="loginInput" />
                <input type="text" placeholder="Password" className="loginInput" />
                <input type="text" placeholder="Confirm Password" className="loginInput" />
                <button className="loginButton">Sign Up</button>
                <button className="loginRegisterButton">Log In Account</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
