

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as transactionService from "../services/transaction.service";

export const createTransaction = asyncHandler(async (req: Request, res: Response) => {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
});

export const findTransactionById = asyncHandler(async (req: Request, res: Response) => {
    const transaction = await transactionService.getTransactionById(req.body);
    res.json(transaction);
});

export const fetchAllTransactions = asyncHandler(async (req: Request, res: Response) => {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
});

export const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
    const updated = await transactionService.updateTransaction(req.params.id, req.body);
    res.json(updated);
});

export const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
    await transactionService.deleteTransaction(req.params.id);
    res.status(204).end();
});
