const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User")

const TaskSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  },

  userID: {
    type: String,
    required: true
  }
})

TaskSchema.pre("remove", { query: true }, function(next) {
  console.log(this)
  User.findByIdAndUpdate(this.userID, { $pull: { tasks: this._id } }, {new: true})
    .then(result => {
      next()
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
})

module.exports = Task = mongoose.model("Task", TaskSchema)