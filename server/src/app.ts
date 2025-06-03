import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import financeUserRoutes from './routes/financeUser.routes';
import transactionRoutes from './routes/transaction.routes';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/financeusers/', financeUserRoutes);
app.use('/api/transactions', transactionRoutes);


app.get("/", (req, res) => {
    res.send("<h1>Welcome to the backend!</h1>")
})
export default app;
