const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../../model/user");
const auth = require("../middleware/auth");

const multer = require("multer");
const { storage, cloudinary } = require("../../cloudinary-config");
const {
  getLogin,
  logout,
  verifyOTP,
  register,
  postLogin,
} = require("../../controllers/user");
const upload = multer({ storage });

// create new user
router.post("/register", register);

// login / add tokens to cookies
router.post("/login", postLogin);

// auto login using token
router.get("/login", auth, getLogin);

// logout / remove token
router.get("/logout", logout);

router.post("/verify", verifyOTP);

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
