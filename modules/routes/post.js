const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// here post related requests: addpost,removepost,add ratting,comments..etc

// get perticular post data
router.get("/:id", (req, res) => {
  console.log(req.query);
});

// add new post
router.post("", auth, (req, res) => {
  console.log(req.body);
});

router.post("/ratting", auth, (req, res) => {
  console.log(req.body);
});

router.post("/comment", auth, (req, res) => {
  console.log(req.body);
});

module.exports = router;
