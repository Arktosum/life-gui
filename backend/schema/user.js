const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

// Define User model
const User = mongoose.model("user", userSchema);

module.exports = User;
