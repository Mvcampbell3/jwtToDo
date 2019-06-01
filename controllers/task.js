const Task = require("../models/Task");
const User = require("../models/User");


exports.get_user_tasks = (req, res, next) => {
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
}

exports.create_task = (req, res, next) => {
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
}

exports.change_complete = (req, res, next) => {
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
}

exports.delete_task = (req, res, next) => {
  let taskID = req.params.taskID;
  let userID = req.user.userID;

  Task.findById(taskID)
    .exec()
    .then(task => {
      if (task.userID === userID) {
        task.remove()
          .then(result => {
            res.status(200).json(result)
          })
          .catch(err => res.status(500).json(err))
      } else {
        res.status(401).json("Unauthorized")
      }

    })
    .catch(err => res.json(err))
}