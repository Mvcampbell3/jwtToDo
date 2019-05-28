const router = require("express").Router();
const bcrypt = require("bcrypt");


router.get("/test", (req,res) => {
  res.json("working here at api/user/test");
})

module.exports = router;