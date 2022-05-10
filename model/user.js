const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    OTP: {
      type: Number,
    },
  },
  { timestamps: true }
);

User.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

module.exports = mongoose.model("Users", User);
