const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: [Number],
    dateOfBirth: Date,
    displayImage: String,
    description: String,
    story: String,
    gender : {
      enum : ["MALE","FEMALE","OTHER"],
      default : "OTHER"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("friend", friendSchema);
