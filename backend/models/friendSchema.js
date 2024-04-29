const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date },
    displayImage: { type: String },
    description: { type: String },
    story: { type: String },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "OTHER",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);
