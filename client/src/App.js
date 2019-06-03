import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";

// Components
import SubTask from "./components/SubTask"
import Task from "./components/Task"
import UserArea from "./components/UserArea"

class App extends Component {
  state = {
    username: "",
    password: "",
    user: false,
    userID: "",
    name: "",
    tasks: [],
    signup: false
  }

  componentDidMount() {
    this.checkAuth()
  }

  signupUser = e => {
    e.preventDefault();
    API.signupUser(this.state.username, this.state.password)
      .then(result => {
        console.log(result)
        this.loginUser();
      })
      .catch(err => {
        console.log(err);
        alert("Username already in use");
        this.setState({username:"", password:""})
      });
  }

  loginUser = e => {
    if (e) {
      e.preventDefault();
    }
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
            tasks: result.data.userAll.tasks,
            signup: false
          })
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
        console.log(result)
        this.updateTasksState();
      })
      .catch(err => console.log(err))
  }

  deleteTaskAnimation = taskID => {
    API.deleteTask(taskID)
      .then(result => {
        console.log(result)
        this.updateTasksState();
      })
      .catch(err => console.log(err))
  }

  switchSignup = e => {
    e.preventDefault();
    this.setState({ signup: !this.state.signup })
  }

  testScrollUp = e => {
    e.preventDefault();
    const task = document.getElementById(e.target.dataset.parent_id);
    const taskBtn = document.getElementById(`btn${e.target.dataset.parent_id}`)
    task.classList.add("taskLeave");
    taskBtn.style.display = "none"
    const deleteTaskInside = this.deleteTaskAnimation;
    const taskID = e.target.dataset.task_id;

    setTimeout(function() {
      task.style.display = "none"
      deleteTaskInside(taskID)
    }, 1000)
  }

  render() {
    return (
      <div>
        {this.state.user ? <header className="mainHeader">
          <h1 style={{ textTransform: "capitalize" }}>Welcome {this.state.username}</h1>
          <button className="logout" onClick={e => this.logout(e)}>Logout</button>
        </header> : <div>
            <UserArea
              user={this.state.user}
              username={this.state.username}
              password={this.state.password}
              handleInput={this.handleInput}
              loginUser={this.loginUser}
              signupUser={this.signupUser}
              signup={this.state.signup}
              switchSignup={this.switchSignup}
            />

          </div>
        }
        {this.state.user ?
          <div className="main">
            {this.state.user ? <SubTask name={this.state.name} handleInput={this.handleInput} submitTask={this.submitTask} /> : null}
            <div className="mainGrid">
              {this.state.tasks.length > 0 ? this.state.tasks.map(task => (
                <Task
                  taskID={task._id}
                  name={task.name}
                  isComplete={task.isCompleted}
                  changeComplete={this.changeComplete}
                  key={task._id}
                  deleteTask={this.deleteTask}
                  testScrollUp={this.testScrollUp}
                />
              )) : null}
            </div>
          </div>
          : null}
      </div>
    );
  }
}

export default App;
