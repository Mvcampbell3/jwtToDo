import Axios from "axios";

export default {

  signupUser(username, password) {
    return Axios.post("/api/user/signup", { username, password });
  },

  loginUser(username, password) {
    return Axios.post("/api/user/login", { username, password });
  },

  checkAuth() {
    return Axios.get("/api/user/checkauth", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  deleteAll() {
    return Axios.delete("/api/user/deleteall");
  },

  submitTask(name) {
    return Axios.post("/api/task/newTask", { name }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  changeComplete(taskID) {
    return Axios.put("api/task/changecomplete", { taskID }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },


  updateTasks(userID) {
    return Axios.get(`/api/task/usertasks/${userID}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  },

  deleteTask(taskID) {
    return Axios.delete(`/api/task/deletetask/${taskID}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  }


}
