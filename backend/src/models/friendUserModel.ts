import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendUser extends Document {
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
    displayImage: string,
    description: string,
    story: string,
    gender: 'MALE' | 'FEMALE' | 'OTHER'
}


const FriendUserSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: String },
    displayImage: { type: String },
    description: { type: String },
    story: { type: String },
    gender: {
        type: String,
        enum: ['MALE', "FEMALE", 'OTHER'],
        default: "OTHER",
    }
}, {
    timestamps: true
});

const FriendUser = mongoose.model<IFriendUser>('friend', FriendUserSchema);

export default FriendUser;
