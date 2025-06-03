import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB : ', connection.connection.name);
        console.log('MongoDB models : ', connection.modelNames());
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
