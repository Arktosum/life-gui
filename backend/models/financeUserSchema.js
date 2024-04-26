const mongoose = require("mongoose");

const financeUserSchema = new mongoose.Schema(
  {
    transactee: { type: String, required: true, unique: true },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FinanceUser", financeUserSchema);
