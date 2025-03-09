import mongoose from "mongoose";

const TransactionUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("TransactionUser", TransactionUserSchema);
