import mongoose, { Document, Schema } from 'mongoose';

export type TransactionCategory = 'FOOD' | 'RENT' | 'SALARY' | 'OTHER';
export type TransactionStatus = 'PAID' | 'PENDING' | 'FAILED';
export type TransactionMode = 'SEND' | 'RECEIVE';

export interface ITransaction extends Document {
    transactee: mongoose.Types.ObjectId;
    amount: number;
    category: TransactionCategory;
    status: TransactionStatus;
    mode: TransactionMode;
    remarks?: string;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
    {
        transactee: { type: Schema.Types.ObjectId, ref: 'FinanceUser', required: true },
        amount: { type: Number, required: true },
        category: { type: String, enum: ['FOOD', 'RENT', 'SALARY', 'OTHER'], required: true },
        status: { type: String, enum: ['PAID', 'PENDING', 'FAILED'], required: true },
        mode: { type: String, enum: ['SEND', 'RECEIVE'], required: true },
        remarks: { type: String },
        completedAt: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
