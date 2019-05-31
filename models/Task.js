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

// TaskSchema.pre("remove", { query: true }, (next) => {
//   console.log("removing document")
//   console.log(this)
// })

module.exports = Task = mongoose.model("Task", TaskSchema)