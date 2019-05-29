import React from 'react';
import "./login.css"

const Login = (props) => {
  return ( 
    <div>
      <input name="username" value={props.username} onChange={e=> props.handleInput(e)} />
      <input name="password" value={props.password} type="password" onChange={e=> props.handleInput(e)} />
      <button type="button" onClick={e => props.loginUser(e)}>Login</button>
    </div>
   );
}
 
export default Login;