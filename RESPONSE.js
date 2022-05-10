const UNKNOWN_ERROR = {
  resType: "error",
  msg: "Internal Server Error",
};
const UNAUTHORIZED = {
  resType: "error",
  msg: "Unauthorized. Provide valid token",
};

// post login
const NOT_REGISTRED = {
  resType: "error",
  msg: "Email id not registred",
};
const WRONG_PASSWORD = {
  resType: "error",
  msg: "You have entered wrong password",
};
const LOGGED_IN = {
  resType: "success",
  msg: "Successfully logged in.",
};
const NOT_VERIFIED = {
  resType: "error",
  msg: "Email id not verified, check your mailbox.",
};

// verify
const OTP_SENT = {
  resType: "success",
  msg: "OTP sent successfully, Check your inbox.",
};
const OTP_ALREADY_SENT = {
  resType: "warning",
  msg: "We have already sent you mail",
};
const INVALID_OTP = {
  resType: "warning",
  msg: "You have entered Invalid OTP",
};

// register
const ALREADY_REGISTRED = {
  resType: "warning",
  msg: "Mail id already registred, try login",
};

// logged out
const LOGGED_OUT = {
  resType: "success",
  msg: "Successfully Logged Out.",
};
module.exports = {
  UNKNOWN_ERROR,
  UNAUTHORIZED,
  NOT_REGISTRED,
  WRONG_PASSWORD,
  LOGGED_IN,
  OTP_SENT,
  OTP_ALREADY_SENT,
  ALREADY_REGISTRED,
  LOGGED_OUT,
  INVALID_OTP,
  NOT_VERIFIED,
};
