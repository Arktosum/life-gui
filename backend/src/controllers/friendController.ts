import { Request, Response } from "express";
import FriendUser from "../models/friendUserModel";

export async function createFinanceUser(req: Request, res: Response) {
    const user = new FriendUser(req.body);
    await user.save();
    res.status(201).json(user);
};

export async function fetchAllFriendUsers(req: Request, res: Response) {
    const friends = await FriendUser.find()
    res.status(200).json(friends);
};

export async function UpdateFriendUserById(req: Request, res: Response) {
    const item = await FriendUser.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
        res.status(404).json({ message: 'item not found' });
        return;
    }
    res.status(200).json(item);
};