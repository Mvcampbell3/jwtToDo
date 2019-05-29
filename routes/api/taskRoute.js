const router = require("express").Router();
const checkAuth = require("../../middleware/check-auth");
const TaskController = require("../../controllers/task");
const Task = require("../../models/Task");
const User = require("../../models/User");

// route starts with /api/task/

router.get("/usertasks/:userID", checkAuth, (req, res, next) => {
  if (req.user.userID === req.params.userID) {
    Task.find({ userID: req.user.userID })
      .exec()
      .then(result => {
        return res.status(200).json(result)
      })
      .catch(err => res.status(500).json(err))
  } else {
    return res.status(401).json("Unauthorized")
  }
})

router.post("/newtask", checkAuth, (req, res, next) => {
  let saved, updated;
  console.log(req.body)
  const newTask = new Task({
    name: req.body.name,
    userID: req.user.userID
  })
  newTask.save()
    .then(savedTask => {
      saved = savedTask;
      User.findByIdAndUpdate(saved.userID, { $push: { taskIDs: saved._id } }, { new: true })
        .exec()
        .then(updatedUser => {
          updated = updatedUser;
          res.status(201).json({
            saved,
            updated
          })
        })
        .catch(err => res.status(500).json(err))
      // res.status(201).json(result);
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;
