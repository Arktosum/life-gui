import { Router } from 'express';
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    searchFinanceUsers,
} from '../controllers/financeUser.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/search', searchFinanceUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



export default router;
