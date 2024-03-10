const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    transactee: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["FOOD", "TRANSPORT", "EDUCATION", "GROOMING", "OTHER"],
      default: "OTHER",
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL"],
      default: "UNPAID",
      required: true,
    },
    mode: {
      type: String,
      enum: ["SEND", "RECEIVE"],
      required: true,
    },
  },
  { timestamps: true }
);

const Finance = mongoose.model("finance", financeSchema);

module.exports = Finance;
