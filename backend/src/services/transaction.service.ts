import Transaction, { ITransaction } from "../models/Transaction";

export const createTransaction = async (data: Partial<ITransaction>) => {
    return await Transaction.create(data);
};

export const getAllTransactions = async () => {
    return await Transaction.find().populate("transactee");
};

export const getTransactionById = async (id: string) => {
    return await Transaction.findById(id).populate("transactee");
};

export const updateTransaction = async (id: string, updates: Partial<ITransaction>) => {
    return await Transaction.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteTransaction = async (id: string) => {
    return await Transaction.findByIdAndDelete(id);
};
