import { Request, Response } from "express";
import FinanceUser, { IFinanceUser } from "../models/financeUserModel";
import Transaction from "../models/transactionModel";

export async function createFinanceUser(req: Request, res: Response) {
    const user = new FinanceUser(req.body);
    await user.save();
    res.status(201).json(user);
};

export async function fetchAllTransactions(req: Request, res: Response) {
    const transactions = await Transaction.find().populate("transactee").sort({ updatedAt: 'desc' });
    res.status(200).json(transactions);
};


export async function fetchFinanceUsersRegex(req: Request, res: Response) {
    const regex = req.params.regex
    const financeUsers = await FinanceUser.find({ transactee: { $regex: regex, $options: 'i' } }).sort({ updatedAt: 'desc' });
    res.status(200).json(financeUsers);
};



export async function fetchFinanceUserById(req: Request, res: Response) {
    const id = req.params.id;
    const transactions = await FinanceUser.findById(id);
    res.status(200).json(transactions);
};


export async function createTransaction(req: Request, res: Response) {
    const financeUser = await FinanceUser.findById(req.body.transactee)

    if (!financeUser) {
        res.status(400).json({ message: "Cannot find user!" });
    }

    const transaction = new Transaction(req.body);
    if (!transaction) {
        res.status(400).json({ message: "Failed to create transaction!" });
    }
    await transaction.save();

    financeUser?.transactions.push(transaction._id as string);
    await financeUser?.save();

    res.status(201).json(transaction);
};


