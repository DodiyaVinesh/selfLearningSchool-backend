// here we will check if user is authenticated or not
// this middleware will used in most request where we need to check if use is authenticated
// for ex. addpost,comment,ratting..etc

const user = require("../../model/user");

const auth = async (req, res, next) => {
  //do authentication
  // req.user = user.fing({lakf})
  req.user = await user.findById("625b1da9527375bee43b9e79");
  next();
};

module.exports = auth;
