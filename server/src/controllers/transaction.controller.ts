import { Request, Response } from 'express';
import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getBalance,
    getWeeklySpending,
    getDailySpending,
} from '../services/transaction.service';

export const addTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

export const getTransactions = async (_req: Request, res: Response) => {
    try {
        const transactions = await getAllTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
};

export const getTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await getTransactionById(req.params.id);
        if (!transaction) return void res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transaction' });
    }
};

export const updateTransactionHandler = async (req: Request, res: Response) => {
    try {
        const transaction = await updateTransaction(req.params.id, req.body);
        if (!transaction) return void res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update transaction' });
    }
};

export const deleteTransactionHandler = async (req: Request, res: Response) => {
    try {
        const transaction = await deleteTransaction(req.params.id);
        if (!transaction) return void res.status(404).json({ error: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
};


export const fetchBalance = async (req: Request, res: Response) => {
    try {
        const balance = await getBalance(req.params.id);
        if (!balance) return void res.status(404).json({ error: 'Error while calculating balance' });
        res.json(balance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate balance' });
    }
};

export const fetchDailySpending = async (req: Request, res: Response) => {
    try {
        const spending = await getDailySpending(req.params.id);
        if (!spending) return void res.status(404).json({ error: 'Error while calculating daily spending' });
        res.json(spending);
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate daily spending' });
    }
};

export const fetchWeeklySpending = async (req: Request, res: Response) => {
    try {
        const spending = await getWeeklySpending(req.params.id);
        if (!spending) return void res.status(404).json({ error: 'Error while calculating weekly spending' });
        res.json(spending);
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate weekly spending' });
    }
};
