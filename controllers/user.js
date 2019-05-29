const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.user_test = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err))
}

exports.user_signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json(err)
    }
    const newUser = new User({
      username: req.body.username,
      password: hash
    });

    newUser.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User Created",
          success: true
        })
      })
      .catch(err => res.status(500).json(err))
  })
}

exports.user_login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          })
        }
        if (result === true) {
          jwt.sign(
            // payload of the token
            {
              username: user.username,
              userID: user._id,
              taskIDs: user.taskIDs
            },
            process.env.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
              if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                })
              }
              return res.status(200).json({
                message: "Auth succeeded",
                token
              })
            });

        } else {
          return res.status(401).json({
            message: "Auth failed"
          })
        }
      })
    })
    .catch(err => {
      res.status(401).json({
        message: "Auth failed"
      })
    })
}

exports.user_checkAuth = (req, res, next) => {
  const user = req.user
  User.findById(user.userID)
    .populate("taskIDs", "name isCompleted")
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))
}

exports.user_delete_users = (req, res, next) => {
  User.remove()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

