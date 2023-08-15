const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    transactee: String,
    amount: Number,
    category: String,
    description: String,
    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL"],
      default: "UNPAID",
    },
    mode: {
      type: String,
      enum: ["SEND", "RECEIVE"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("finance", financeSchema);
