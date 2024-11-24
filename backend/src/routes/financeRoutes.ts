import express from 'express';
import { createFinanceUser, fetchTransactionById, deleteTransactionById, updateTransactionById, createTransaction, fetchAllTransactions, fetchFinanceUserById, fetchFinanceUsersRegex, fetchFinanceBalance } from '../controllers/financeController';
import asyncHandler from '../middlewares/asyncHandler';
import authenticateJWT from '../middlewares/authHandler';


const router = express.Router();

router.get('/transaction', asyncHandler(fetchAllTransactions));
router.get('/transaction/:id', asyncHandler(fetchTransactionById));
router.post('/transaction', asyncHandler(createTransaction));
router.delete('/transaction/:id', asyncHandler(deleteTransactionById));
router.post('/transaction/:id', asyncHandler(updateTransactionById));
router.get('/balance', asyncHandler(fetchFinanceBalance));


router.get('/user/:regex', asyncHandler(fetchFinanceUsersRegex));
router.post('/user', asyncHandler(createFinanceUser));
router.get('/user/id/:id', asyncHandler(fetchFinanceUserById));


export default router;

