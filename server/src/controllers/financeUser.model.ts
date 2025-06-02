import mongoose, { Document, Schema } from 'mongoose';

export interface IFinanceUser extends Document {
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

const FinanceUserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.model<IFinanceUser>('FinanceUser', FinanceUserSchema);
