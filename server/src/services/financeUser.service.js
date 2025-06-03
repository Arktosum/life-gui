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
exports.getFinanceUsersByRegex = exports.deleteFinanceUser = exports.updateFinanceUser = exports.getFinanceUserById = exports.getAllFinanceUsers = exports.createFinanceUser = void 0;
const financeUser_model_1 = __importDefault(require("../models/financeUser.model"));
const createFinanceUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new financeUser_model_1.default({ username });
    return yield user.save();
});
exports.createFinanceUser = createFinanceUser;
const getAllFinanceUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield financeUser_model_1.default.find();
});
exports.getAllFinanceUsers = getAllFinanceUsers;
const getFinanceUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield financeUser_model_1.default.findById(id);
});
exports.getFinanceUserById = getFinanceUserById;
const updateFinanceUser = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield financeUser_model_1.default.findByIdAndUpdate(id, { username }, { new: true });
});
exports.updateFinanceUser = updateFinanceUser;
const deleteFinanceUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield financeUser_model_1.default.findByIdAndDelete(id);
});
exports.deleteFinanceUser = deleteFinanceUser;
const getFinanceUsersByRegex = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(username, 'i'); // Case-insensitive search
    return yield financeUser_model_1.default.find({ username: { $regex: regex } });
});
exports.getFinanceUsersByRegex = getFinanceUsersByRegex;
