const router = require("express").Router();
const checkAuth = require("../../middleware/check-auth");
const TaskController = require("../../controllers/task");
const Task = require("../../models/Task");
const User = require("../../models/User");
const mongoose = require("mongoose")

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
  const newTask = new Task({
    name: req.body.name,
    userID: req.user.userID
  })
  newTask.save()
    .then(savedTask => {
      saved = savedTask;
      User.findByIdAndUpdate(saved.userID, { $push: { tasks: saved._id } }, { new: true })
        .exec()
        .then(updatedUser => {
          updated = updatedUser;
          res.status(201).json({
            saved,
            updated
          })
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put("/changecomplete", checkAuth, (req, res, next) => {
  Task.findById(req.body.taskID)
    .exec()
    .then(task => {
      if (task.userID === req.user.userID) {

        task.isCompleted = !task.isCompleted;
        task.save()
          .then(result => {
            if (result.userID) {
              Task.find({ userID: result.userID })
                .exec()
                .then(result => res.status(200).json(result))
                .catch(err => res.status(500).json(err))
            }

          })
          .catch(err => res.status(500).json(err))
      } else {
        res.status(401).json("Unauthorized")
      }
    })
    .catch(err => res.status(500).json(err))
})

router.delete("/deletetask/:taskID", checkAuth, (req, res, next) => {
  let taskID = req.params.taskID;
  let userID = req.user.userID;
  Task.findById(taskID)
    .then(task => {
      if (task.userID === userID) {
        // console.log(userID, taskID)
        let promises = [
          User.findByIdAndUpdate(userID, { $pull: { tasks: taskID } }, { new: true }),
          Task.findByIdAndDelete(taskID)
        ]
        Promise.all(promises)
          .then(result => {
            // console.log(result);
            return res.status(200).json(result)
          })
          .catch(err => {
            console.log(err)
            return res.status(500).json(err)
          })
      } else {
        return res.status(401).json("Unathorized")
      }
    })
    .catch(err => {
      res.status(404).json(err)
    }
    )

})


module.exports = router;
