"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeeklySpending = exports.fetchDailySpending = exports.fetchBalance = exports.deleteTransactionHandler = exports.updateTransactionHandler = exports.getTransaction = exports.getTransactions = exports.addTransaction = void 0;
const transaction_service_1 = require("../services/transaction.service");
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield (0, transaction_service_1.createTransaction)(req.body);
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});
exports.addTransaction = addTransaction;
const getTransactions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, transaction_service_1.getAllTransactions)();
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
});
exports.getTransactions = getTransactions;
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield (0, transaction_service_1.getTransactionById)(req.params.id);
        if (!transaction)
            return void res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transaction' });
    }
});
exports.getTransaction = getTransaction;
const updateTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield (0, transaction_service_1.updateTransaction)(req.params.id, req.body);
        if (!transaction)
            return void res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update transaction' });
    }
});
exports.updateTransactionHandler = updateTransactionHandler;
const deleteTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield (0, transaction_service_1.deleteTransaction)(req.params.id);
        if (!transaction)
            return void res.status(404).json({ error: 'Transaction not found' });
        res.json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});
exports.deleteTransactionHandler = deleteTransactionHandler;
const fetchBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balance = yield (0, transaction_service_1.getBalance)(req.params.id);
        if (!balance)
            return void res.status(404).json({ error: 'Error while calculating balance' });
        res.json(balance);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to calculate balance' });
    }
});
exports.fetchBalance = fetchBalance;
const fetchDailySpending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spending = yield (0, transaction_service_1.getDailySpending)(req.params.id);
        if (!spending)
            return void res.status(404).json({ error: 'Error while calculating daily spending' });
        res.json(spending);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to calculate daily spending' });
    }
});
exports.fetchDailySpending = fetchDailySpending;
const fetchWeeklySpending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spending = yield (0, transaction_service_1.getWeeklySpending)(req.params.id);
        if (!spending)
            return void res.status(404).json({ error: 'Error while calculating weekly spending' });
        res.json(spending);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to calculate weekly spending' });
    }
});
exports.fetchWeeklySpending = fetchWeeklySpending;
