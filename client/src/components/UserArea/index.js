import React from 'react';
import "./user.css"

import Login from "../Login"
import Signup from "../Signup"

const UserArea = (props) => {
  return (
    <div>
      {props.signup ?
        <Signup
          username={props.username}
          password={props.password}
          handleInput={props.handleInput}
          signupUser={props.signupUser}
          switchSignup={props.switchSignup}
        /> :
        <Login
          username={props.username}
          password={props.password}
          handleInput={props.handleInput}
          loginUser={props.loginUser}
          switchSignup={props.switchSignup}

        />
      }
    </div>
  );
}

export default UserArea;