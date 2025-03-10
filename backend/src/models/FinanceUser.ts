import mongoose from "mongoose";

const FinanceUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("FinanceUser", FinanceUserSchema);
