import mongoose, { Schema, Document } from 'mongoose';

export interface IFinanceUser extends Document {
    transactee: string,
    transactions: string[]
}

const FinanceUserSchema: Schema = new Schema({
    transactee: { type: String, required: true },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]
}, {
    timestamps: true
});

const FinanceUser = mongoose.model<IFinanceUser>('FinanceUser', FinanceUserSchema);

export default FinanceUser;
