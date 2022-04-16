const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../../model/user");
const auth = require("../middleware/auth");

const multer = require("multer");
const { storage, cloudinary } = require("../../cloudinary-config");
const upload = multer({ storage });

// create new user
router.post("/register", async (req, res) => {
  let newPass = await bcrypt.hash(req.body.password, 8);
  req.body.password = newPass;

  user.create(req.body, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(400).send("can not create");
    }
    console.log("created", data);
    res.send("Created user");
  });
});

// login / add tokens to cookies
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let currentUser = await user.findOne({ email: req.body.email });
    if (!currentUser) {
      return res.send("please register first");
    }

    bcrypt.compare(req.body.password, currentUser.password, (err, same) => {
      if (err) {
        console.log(err);
      }
      if (same) {
        res.send(currentUser);
      } else {
        res.status(400).send("Wrong Password");
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("internal server error");
  }
});

// auto login using token
router.get("/login", auth, (req, res) => {
  console.log("check if already have token");
  res.send("user authorized");
});

// logout / remove token
router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.json("remove cookies");
});

router.get("/verify/:token", (req, res) => {
  console.log(req.params.token);
  res.send("email verified");
});

// add/update profile picture
router.post("/profile", auth, upload.single("img"), (req, res) => {
  if (req.user.profile) {
    let imgUrl = req.user.profile;
    let imgPath =
      "Upload/" +
      imgUrl.substring(imgUrl.lastIndexOf("/") + 1, imgUrl.lastIndexOf("."));
    cloudinary.uploader.destroy(imgPath, function (err, result) {
      if (!err && result && result.result == "ok") {
        console.log("deleted successfull");
      }
    });
  }
  req.user.profile = req.file.path;
  req.user.save();
  res.send({ msg: "done successfully", file: req.file });
});

module.exports = router;
