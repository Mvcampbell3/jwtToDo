const router = require("express").Router();
const checkAuth = require("../../middleware/check-auth")
const UserController = require("../../controllers/user")

router.get("/test", UserController.user_test)

router.post("/signup", UserController.user_signup)

router.post("/login", UserController.user_login)

router.get("/checkauth", checkAuth, UserController.user_checkAuth)

module.exports = router;