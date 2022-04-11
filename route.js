const express = require("express");
const router = express.Router();

const user = require("./modules/routes/user");
const post = require("./modules/routes/post");

router.use("/user", user);
router.use("/post", post);

module.exports = router;
