import express from "express";
import * as financeUserController from "../controllers/financeUser.controller";

const router = express.Router();

router.post("/", financeUserController.createTransactionUser);
router.get("/search", financeUserController.searchTransactionUsers);
router.get("/searchById", financeUserController.searchTransactionUserById);


export default router;
