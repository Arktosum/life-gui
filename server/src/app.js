"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const financeUser_routes_1 = __importDefault(require("./routes/financeUser.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
dotenv_1.default.config();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/financeusers/', financeUser_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the backend!</h1>");
});
exports.default = app;
