const router = require("express").Router();
const checkAuth = require("../../middleware/check-auth");
const TaskController = require("../../controllers/task");
// route starts with /api/task/

router.get("/usertasks/:userID", checkAuth, TaskController.get_user_tasks)

router.post("/newtask", checkAuth, TaskController.create_task)

router.put("/changecomplete", checkAuth, TaskController.change_complete)

router.delete("/deletetask/:taskID", checkAuth, TaskController.delete_task)


module.exports = router;
