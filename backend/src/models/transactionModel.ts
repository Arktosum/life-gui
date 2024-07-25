import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ITransaction extends Document {
    transactee: string,
    amount: number,
    category: "FOOD" | "TRANSPORT" | "GROOMING" | "OTHER" | "EDUCATION",
    mode: "SEND" | "RECEIVE",
    status: "PAID" | "UNPAID" | "PARTIAL",
    partial: number,
    remarks: string
}

const TransactionSchema: Schema = new Schema({
    transactee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinanceUser"
    },
    amount: {
        type: Number
    },
    category: {
        type: String,
        enum: ["FOOD", "TRANSPORT", "GROOMING", "OTHER", "EDUCATION"],
        default: "OTHER"
    },
    mode: {
        type: String,
        enum: ['SEND', 'RECEIVE'],
        default: "SEND",
    },
    status: {
        type: String,
        enum: ['PAID', "UNPAID", 'PARTIAL'],
        default: "UNPAID",
    },
    partial: Number,
    remarks: String
}, {
    timestamps: true
});

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
