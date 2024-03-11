const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    name : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
    },
    dateOfBirth : {
        type : String,
        required : true,
    },
    displayImage : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    story : {
        type : String,
        required : true,
    },
    gender : {
        enum : ["MALE",'FEMALE','OTHER'],
        type : String,
        default : "OTHER",
        required : true
    }
  },
  { timestamps: true }
);

// Define User model
const User = mongoose.model("friend", friendSchema);

module.exports = User;
