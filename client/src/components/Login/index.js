import React from 'react';
import "./login.css"

const Login = (props) => {
  return (
    <div className="loginArea login">
      <h2 className="logTitle">Login</h2>
      <div className="loginGroup">
        <label htmlFor="username">Username</label>
        <input className="logInput login" name="username" autoComplete="off" value={props.username} onChange={e => props.handleInput(e)} />
      </div>
      <div className="loginGroup">
        <label htmlFor="password">Password</label>
        <input className="logInput login" name="password" value={props.password} type="password" onChange={e => props.handleInput(e)} />
      </div>
      <div className="buttonArea">
        <button className="logBtn log" type="button" onClick={e => props.loginUser(e)}>Login</button>
        <button className="logBtn log" type="button" onClick={e => props.switchSignup(e)}>To SignUp</button>
      </div>
    </div>
  );
}

export default Login;