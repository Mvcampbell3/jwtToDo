import Axios from "axios";

export default {

  signupUser(username, password) {
    return Axios.post("/api/user/signup", {username, password});
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
  }
}