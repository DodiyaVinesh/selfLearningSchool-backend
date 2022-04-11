const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("register", (req, res) => {
  console.log(req.body);
});

router.post("/login", (req, res) => {
  console.log(req.body);
});

router.get("/login", auth, (req, res) => {
  console.log("to check if user already logged in");
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.json({
    msg: "loggedout",
  });
});

module.exports = router;
