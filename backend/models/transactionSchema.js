const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FinanceUser",
    },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["FOOD", "TRANSPORT", "EDUCATION", "GROOMING", "OTHER"],
      default: "FOOD",
    },
    status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
    },
    mode: {
      type: String,
      enum: ["SEND", "RECEIVE"],
      default: "SEND",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
