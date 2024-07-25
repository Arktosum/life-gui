import express from 'express';
import { createFinanceUser, createTransaction, fetchAllTransactions, fetchFinanceUserById, fetchFinanceUsersRegex } from '../controllers/financeController';
import asyncHandler from '../middlewares/asyncHandler';


const router = express.Router();

router.get('/transaction', asyncHandler(fetchAllTransactions));
router.post('/transaction/', asyncHandler(createTransaction));



router.get('/:regex', asyncHandler(fetchFinanceUsersRegex));
router.post('/user', asyncHandler(createFinanceUser));
router.get('/user/:id', asyncHandler(fetchFinanceUserById));





export default router;

