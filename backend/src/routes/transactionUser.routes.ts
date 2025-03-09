import express from "express";
import * as transactionUserController from "../controllers/transactionUser.controller";

const router = express.Router();

router.post("/", transactionUserController.createTransactionUser);
router.get("/search", transactionUserController.searchTransactionUsers);

export default router;
