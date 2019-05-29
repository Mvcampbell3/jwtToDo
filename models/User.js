const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  taskIDs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
})

module.exports = User = mongoose.model("User", UserSchema);