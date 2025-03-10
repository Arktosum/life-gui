import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  transactee: mongoose.Types.ObjectId;
  amount: number;
  remarks: string;
  mode: "SEND" | "RECEIVE";
  status: "PAID" | "UNPAID";
  completedAt?: Date;
  category: "EDUCATION" | "FOOD" | "HOUSING" | "TRANSPORTATION" | "GROOMING" | "OTHER" | "LENDING";
}

const TransactionSchema = new Schema<ITransaction>(
  {
    transactee: { type: Schema.Types.ObjectId, ref: "FinanceUser", required: true },
    amount: { type: Number, required: true },
    mode: { type: String, enum: ["SEND", "RECEIVE"], required: true },
    status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      required: true,
    },
    remarks: {
      type: String
    },
    completedAt: { type: Date },
    category: {
      type: String,
      enum: ["EDUCATION", "FOOD", "TRANSPORTATION", "GROOMING", "OTHER", "LENDING"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
