import express from "express";
import * as financeUserController from "../controllers/financeUser.controller";

const router = express.Router();

router.post("/", financeUserController.createFinanceUser);
router.get("/search", financeUserController.searchFinanceUsers);
router.get("/searchById", financeUserController.searchFinanceUserById);


export default router;
