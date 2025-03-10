import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import transactionRoutes from "./routes/transaction.routes";
import financeUserRoutes from "./routes/financeUser.routes";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount user routes
app.use("/api/transaction", transactionRoutes);
app.use("/api/financeUser", financeUserRoutes);


export default app;

