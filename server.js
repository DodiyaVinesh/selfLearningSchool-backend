const express = require("express");
const router = express.Router();

const admin = require("./modules/routes/admin");
const user = require("./modules/routes/user");
const product = require("./modules/routes/product");

router.use("/admin", admin);
router.use("/user", user);
router.use("/product", product);

module.exports = router;
