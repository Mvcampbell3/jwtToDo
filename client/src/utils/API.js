import Axios from "axios";



export default {
  loginUser(username, password) {
    return Axios.post("/api/user/login", { username, password })
  },

  checkAuth() {
    return Axios.get("/api/user/checkauth", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  }

  
}