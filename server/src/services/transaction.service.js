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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklySpending = exports.getDailySpending = exports.getBalance = exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getAllTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const createTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new transaction_model_1.default(data);
    return yield transaction.save();
});
exports.createTransaction = createTransaction;
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.find().populate('transactee');
});
exports.getAllTransactions = getAllTransactions;
const getTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.findById(id).populate('transactee');
});
exports.getTransactionById = getTransactionById;
const updateTransaction = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.findByIdAndUpdate(id, data, { new: true }).populate('transactee');
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.findByIdAndDelete(id);
});
exports.deleteTransaction = deleteTransaction;
const getBalance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield transaction_model_1.default.aggregate([
        {
            $match: {
                id,
            },
        },
        {
            $group: {
                _id: null,
                balance: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            {
                                $cond: [
                                    { $eq: ['$mode', 'SEND'] },
                                    { $multiply: [-1, '$amount'] },
                                    '$amount',
                                ],
                            },
                            0,
                        ],
                    },
                },
            },
        },
    ]);
    return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.balance) || 0;
});
exports.getBalance = getBalance;
const getDailySpending = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const result = yield transaction_model_1.default.aggregate([
        {
            $match: {
                id,
                mode: 'SEND',
                completedAt: { $gte: startOfDay, $lte: endOfDay },
            },
        },
        {
            $group: {
                _id: null,
                spentToday: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            '$amount',
                            0,
                        ],
                    },
                },
            },
        },
    ]);
    const spentToday = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.spentToday) || 0;
    return spentToday;
});
exports.getDailySpending = getDailySpending;
const getWeeklySpending = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    const result = yield transaction_model_1.default.aggregate([
        {
            $match: {
                id,
                mode: 'SEND',
                createdAt: { $gte: startOfWeek, $lte: endOfWeek },
            },
        },
        {
            $group: {
                _id: null,
                spentWeek: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            '$amount',
                            0,
                        ],
                    },
                },
            },
        },
    ]);
    const spentWeek = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.spentWeek) || 0;
    return spentWeek;
});
exports.getWeeklySpending = getWeeklySpending;
