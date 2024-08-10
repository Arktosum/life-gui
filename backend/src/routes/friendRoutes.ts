import express from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { createFinanceUser } from '../controllers/financeController';
import { fetchAllFriendUsers, UpdateFriendUserById } from '../controllers/friendController';


const router = express.Router();

router.get('/', asyncHandler(fetchAllFriendUsers));
router.post('/:id', asyncHandler(UpdateFriendUserById));
router.post('/', asyncHandler(createFinanceUser));

export default router;

