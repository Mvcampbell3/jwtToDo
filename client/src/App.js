import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";

class App extends Component {
  state = {
    username: "mike",
    password: "poop",
    user: false
  }

  loginUser = e => {
    e.preventDefault();
    API.loginUser(this.state.username, this.state.password)
      .then(result => {
        console.log(result);
        const token = result.data.token;
        localStorage.setItem("token", token)
      })
      .catch(err => console.log(err));
  }

  checkAuth = e => {
    e.preventDefault();
    API.checkAuth()
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>This is the starter MERN app</h1>
        <button onClick={e => this.loginUser(e)}>Test</button>
        <button onClick={e => this.checkAuth(e)}>Check</button>
      </div>
    );
  }
}

export default App;
