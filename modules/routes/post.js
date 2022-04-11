const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// get perticular post data
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send("perticular post with comment,full ratting data");
});

// get multiple post data
router.get("/", (req, res) => {
  console.log(req.query);
  res.send("send all post matches with query params");
});

// add new post
router.post("/add", auth, (req, res) => {
  console.log(req.body);
  res.send("added new post");
});

router.post("/ratting", auth, (req, res) => {
  console.log(req.body);
  res.send("added/updated ratting");
});

router.post("/comment", auth, (req, res) => {
  console.log(req.body);
  res.send("added comment");
});

module.exports = router;
