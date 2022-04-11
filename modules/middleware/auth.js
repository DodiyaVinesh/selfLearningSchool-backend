// here we will check if user is authenticated or not
// this middleware will used in most request where we need to check if use is authenticated
// for ex. addpost,comment,ratting..etc

const auth = (req, res, next) => {
  //do authentication
  next();
};

module.exports = auth;
