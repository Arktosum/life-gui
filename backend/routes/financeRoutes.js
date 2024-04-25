const express = require("express");

const financeController = require("../controllers/financeController");
const financeRouter = express.Router();

financeRouter.post("/", financeController.createFinanceUser);
financeRouter.put("/:id", financeController.updateFinanceUser);
financeRouter.delete("/:id", financeController.deleteFinanceUser);

financeRouter.get("/", financeController.fetchAllFinanceUsers);

// financeRouter.post("/", financeController.createTransaction);
financeRouter.delete("/:id", financeController.deleteTransaction);

financeRouter.get("/", financeController.fetchAllTransactions);

financeRouter.post('/:id',financeController.payFinanceUser);

module.exports = financeRouter;
