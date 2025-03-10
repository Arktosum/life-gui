import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as transactionUserService from "../services/transactionUser.service";

export const createTransactionUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await transactionUserService.createTransactionUser(username);
    res.status(201).json(user);
});

export const searchTransactionUsers = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.query;

    const users = await transactionUserService.findTransactionUsersByName(username as string);
    res.json(users);
});


export const searchTransactionUserById = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.query;

    const user = await transactionUserService.findTransactionUserById(_id as string);
    res.json(user);
});


