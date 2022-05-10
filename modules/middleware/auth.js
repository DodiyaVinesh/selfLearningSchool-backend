const RESPONSE = require("../../RESPONSE");
const jwt = require("jsonwebtoken");
const User_Model = require("../../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("cookkies :", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User_Model.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.send(RESPONSE.UNAUTHORIZED);
  }
};

module.exports = auth;
