import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  transactee: mongoose.Types.ObjectId;
  amount: number;
  mode: "SEND" | "RECEIVE";
  isCompleted: boolean;
  completedAt?: Date;
  category: "EDUCATION" | "FOOD" | "TRANSPORTATION" | "GROOMING" | "OTHER" | "LEND";
}

const TransactionSchema = new Schema<ITransaction>(
  {
    transactee: { type: Schema.Types.ObjectId, ref: "TransactionUser", required: true },
    amount: { type: Number, required: true },
    mode: { type: String, enum: ["SEND", "RECEIVE"], required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    category: {
      type: String,
      enum: ["EDUCATION", "FOOD", "TRANSPORTATION", "GROOMING", "OTHER", "LEND"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
