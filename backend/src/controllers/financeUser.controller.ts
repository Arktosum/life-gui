import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as financeUserService from "../services/financeUser.service";

export const createTransactionUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await financeUserService.createFinanceUser(username);
    res.status(201).json(user);
});

export const searchTransactionUsers = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.query;

    const users = await financeUserService.findFinanceUsersByName(username as string);
    res.json(users);
});


export const searchTransactionUserById = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.query;

    const user = await financeUserService.findFinanceUserById(_id as string);
    res.json(user);
});


