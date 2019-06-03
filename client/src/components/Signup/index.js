import React from 'react';
import "./signup.css"

const Signup = (props) => {
  return (
    <div className="loginArea signup">
      <h2 className="logTitle">SignUp</h2>
      <div className="loginGroup">
        <label htmlFor="username">Username</label>
        <input className="logInput signup" name="username" value={props.username} onChange={e => props.handleInput(e)} />
      </div>
      <div className="loginGroup">
        <label htmlFor="password">Password</label>
        <input className="logInput signup" name="password" value={props.password} type="password" onChange={e => props.handleInput(e)} />
      </div>
      <div className="buttonArea">
        <button className="logBtn sign" type="button" onClick={e => props.signupUser(e)}>Signup</button>
        <button className="logBtn sign" type="button" onClick={e => props.switchSignup(e)}>Back To Login</button>
      </div>

    </div>
  );
}

export default Signup;