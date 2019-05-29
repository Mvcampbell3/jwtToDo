import React from 'react';
import "./signup.css"

const Signup = (props) => {
  return ( 
    <div>
      <input name="username" value={props.username} onChange={e=> props.handleInput(e)} />
      <input name="password" value={props.password} type="password" onChange={e=> props.handleInput(e)} />
      <button type="button" onClick={e => props.signupUser(e)}>Signup</button>
    </div>
   );
}
 
export default Signup;