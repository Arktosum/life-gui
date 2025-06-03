import { Request, Response } from 'express';
import {
    createFinanceUser,
    getAllFinanceUsers,
    getFinanceUserById,
    updateFinanceUser,
    deleteFinanceUser,
    getFinanceUsersByRegex,
} from '../services/financeUser.service';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createFinanceUser(req.body.username);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getAllFinanceUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getFinanceUserById(req.params.id);
        if (!user) return void res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateFinanceUser(req.params.id, req.body.username);
        if (!user) return void res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await deleteFinanceUser(req.params.id);
        if (!user) return void res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};



export const searchFinanceUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.query;
        if (typeof username !== 'string') {
            res.status(400).json({ message: 'Invalid username parameter.' });
            return;
        }
        const users = await getFinanceUsersByRegex(username);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
