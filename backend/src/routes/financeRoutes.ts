import express from 'express';
import { createFinanceUser, fetchTransactionById, deleteTransaction, createTransaction, fetchAllTransactions, fetchFinanceUserById, fetchFinanceUsersRegex } from '../controllers/financeController';
import asyncHandler from '../middlewares/asyncHandler';


const router = express.Router();

router.get('/transaction', asyncHandler(fetchAllTransactions));
router.get('/transaction/:id', asyncHandler(fetchTransactionById));
router.post('/transaction', asyncHandler(createTransaction));
router.delete('/transaction/:id', asyncHandler(deleteTransaction));



router.get('/user/:regex', asyncHandler(fetchFinanceUsersRegex));
router.post('/user', asyncHandler(createFinanceUser));
router.get('/user/id/:id', asyncHandler(fetchFinanceUserById));


export default router;

