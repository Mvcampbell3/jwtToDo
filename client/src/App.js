import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";

// Components
import Login from "./components/Login"
import Signup from "./components/Signup"
import SubTask from "./components/SubTask"
import Task from "./components/Task"

class App extends Component {
  state = {
    username: "",
    password: "",
    user: false,
    userID: "",
    name: "",
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
        this.checkAuth()
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
        if (result.data.user) {
          this.setState({
            user: true,
            userID: result.data.userAll._id,
            username: result.data.userAll.username,
            tasks: result.data.userAll.tasks
          })

        }
      })
      .catch(err => {
        if (this.state.user) {
          this.setState({ user: false })
          // console.log(err)
        }
        console.log({ user: false });
        // console.log(err)
      })
  }

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({ user: false, username: "", password: "", tasks: [] })
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

  submitTask = e => {
    e.preventDefault();
    API.submitTask(this.state.name)
      .then(newTask => {
        console.log(newTask);
        this.setState({ name: "" })
        this.updateTasksState();
      })
      .catch(err => console.log(err))
  }

  changeComplete = e => {
    e.preventDefault();
    API.changeComplete(e.target.dataset.task_id)
      .then(result => {
        console.log(result)
        this.setState({ tasks: result.data })
      })
      .catch(err => console.log(err));
  }

  updateTasksState = () => {
    API.updateTasks(this.state.userID)
      .then(result => {
        console.log(result)
        this.setState({ tasks: result.data })
      })
      .catch(err => console.log(err));
  }

  deleteTask = e => {
    e.preventDefault();
    API.deleteTask(e.target.dataset.task_id)
      .then(result => {
        console.log(result.data[0].tasks)
        // this.setState({ tasks: result.data[0].tasks })
        this.updateTasksState()
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div style={{ width: "80%", margin: "1em auto" }}>
        <button onClick={e => this.checkAuth(e)}>Check</button>
        <button onClick={e => this.logout(e)}>Logout</button>
        <button onClick={e => this.deleteAllUsers(e)}>Delete Users</button>
        {this.state.user ? <div>
          <h1 style={{ textTransform: "capitalize" }}>Welcome {this.state.username}</h1>
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
        {this.state.user ? <SubTask name={this.state.name} handleInput={this.handleInput} submitTask={this.submitTask} /> : null}
        {this.state.tasks.length > 0 ? this.state.tasks.map(task => (
          <Task
            taskID={task._id}
            name={task.name}
            isComplete={task.isCompleted}
            changeComplete={this.changeComplete}
            key={task._id}
            deleteTask={this.deleteTask}
          />
        )) : null}

      </div>
    );
  }
}

export default App;
