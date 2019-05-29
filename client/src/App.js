import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";
import jwt from "jsonwebtoken";

// Components
import Login from "./components/Login"
import Signup from "./components/Signup"

class App extends Component {
  state = {
    username: "",
    password: "",
    user: false,
    userID: "",
    tasks: []
  }

  componentDidMount() {
    this.checkAuth()
  }

  signupUser = e => {
    e.preventDefault();
    API.signupUser(this.state.username, this.state.password)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err));
  }

  loginUser = e => {
    e.preventDefault();
    API.loginUser(this.state.username, this.state.password)
      .then(result => {
        console.log(result.data);
        const token = result.data.token;
        localStorage.setItem("token", token)
        const decoded = jwt.decode(token)
        this.setState({ user: true, userID: decoded.userID, password: ""})
      })
      .catch(err => console.log(err));
  }

  checkAuth = e => {
    if (e) {
      e.preventDefault();
    }
    API.checkAuth()
      .then(result => {
        console.log(result.data)
        if (!this.state.user) {
          this.setState({ user: true, userID: result.data.user.userID, username: result.data.user.username })
        }
      })
      .catch(err => {
        if (this.state.user) {
          this.setState({ user: false })
        }
        console.log({ user: false });
      })
  }

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({ user: false })
    console.log({ user: false })
  }

  deleteAllUsers = e => {
    e.preventDefault();
    API.deleteAll()
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div style={{ width: "80%", margin: "1em auto" }}>
        <button onClick={e => this.loginUser(e)}>Test</button>
        <button onClick={e => this.checkAuth(e)}>Check</button>
        <button onClick={e => this.logout(e)}>Logout</button>
        <button onClick={e => this.deleteAllUsers(e)}>Delete Users</button>
        {this.state.user ? <div>
          <h1 style={{textTransform: "capitalize"}}>Welcome {this.state.username}</h1>
        </div> : <div>
          <Login
            username={this.state.username}
            password={this.state.password}
            handleInput={this.handleInput}
            loginUser={this.loginUser}
          />
          <hr />
          <Signup
            username={this.state.username}
            password={this.state.password}
            handleInput={this.handleInput}
            signupUser={this.signupUser}
          />
        </div>
        }

      </div>
    );
  }
}

export default App;
