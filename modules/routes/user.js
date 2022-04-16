const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("add new user to database and send sends mail");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("this will add token to your cookies");
});

router.get("/login", auth, (req, res) => {
  console.log("check if already have token");
  res.send("user authorized");
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.json("remove cookies");
});

router.get("/verify/:token", (req, res) => {
  console.log(req.params.token);
  res.send("email verified");
});

module.exports = router;
