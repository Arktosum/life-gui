import { Router } from 'express';
import {
    addTransaction,
    getTransactions,
    getTransaction,
    updateTransactionHandler,
    deleteTransactionHandler,
    fetchDailySpending,
    fetchWeeklySpending,
    fetchBalance,
} from '../controllers/transaction.controller';

const router = Router();

router.post('/', addTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.put('/:id', updateTransactionHandler);
router.delete('/:id', deleteTransactionHandler);
router.get('/spending/balance', fetchBalance);
router.get('/spending/daily', fetchDailySpending);
router.get('/spending/weekly', fetchWeeklySpending);

export default router;
