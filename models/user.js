const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
    },
    dob: Date,
    image: String,
    password: {
      type: String,
    },
  },
  { timestamp: true }
);
const User = new mongoose.model("User", userSchema);
module.exports = User;
