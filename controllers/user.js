const User_Model = require("../model/user");
const RESPONSE = require("../RESPONSE");
const bcrypt = require("bcrypt");

// get user data or auto login
const getLogin = (req, res) => {
  res.send({ ...RESPONSE.LOGGED_IN, user: req.user });
};

// add cookie when submit login form
const postLogin = async (req, res) => {
  try {
    let user = await User_Model.findOne({ email: req.body.email });
    if (!user) return res.send(RESPONSE.NOT_REGISTRED);
    if (!user.isVerified) return res.send(RESPONSE.NOT_VERIFIED);

    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (err) {
        throw new Error();
      }
      if (same) {
        setCookie(user, req, res);
      } else {
        res.send(RESPONSE.WRONG_PASSWORD);
      }
    });
  } catch (err) {
    console.log(err);
    res.send(RESPONSE.UNKNOWN_ERROR);
  }
};

// register new user send otp
const register = async (req, res) => {
  try {
    let newPass = await bcrypt.hash(req.body.password, 8);
    req.body.password = newPass;
    const user = await User_Model.findOne({ email: req.body.email });
    if (user) {
      if (user.OTP) {
        res.send(RESPONSE.OTP_ALREADY_SENT);
      } else {
        res.send(RESPONSE.ALREADY_REGISTRED);
      }
      return;
    }
    req.body.OTP = Math.floor(Math.random() * 899999) + 100000;
    const newUser = new User_Model(req.body);
    await newUser.save();
    res.send(RESPONSE.OTP_SENT);
  } catch (err) {
    console.log(err);
    res.send(RESPONSE.UNKNOWN_ERROR);
  }
};

// verify otp and set cookie
const verifyOTP = async (req, res) => {
  const OTP = parseInt(req.body.otp);
  const email = req.body.email;
  const user = await User_Model.findOne({ email });
  if (!user) {
    return res.send(RESPONSE.UNKNOWN_ERROR);
  }
  if (!user.OTP) {
    return res.send(RESPONSE.ALREADY_REGISTRED);
  }
  if (OTP != user.OTP) {
    return res.send(RESPONSE.INVALID_OTP);
  }
  await user.updateOne({ $unset: { OTP: "" }, $set: { isVerified: true } });
  setCookie(user, req, res);
};

// Logged out
const logout = (req, res) => {
  res.clearCookie("token");
  res.send(RESPONSE.LOGGED_OUT);
};

module.exports = {
  getLogin,
  postLogin,
  register,
  verifyOTP,
  logout,
};

async function setCookie(user, req, res) {
  const token = await user.generateToken();
  const cookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  if (req.body.stayLoggedIn == "true") {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    cookieOption.expires = expires;
  }
  res.cookie("token", token, cookieOption);
  res.send(RESPONSE.LOGGED_IN);
}
