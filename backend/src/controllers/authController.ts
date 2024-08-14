import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');

};
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Email address is not registered!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ email }, process.env.SECRET_KEY ?? "", { expiresIn: '1h' });
    res.cookie('token', token, {
        maxAge: 3600000, // in milliseconds
        httpOnly: true, // can't be accessed via JavaScript
        secure: true, // only sent over HTTPS
    });
    res.send({ username: user.username, _id: user.id });
};

export async function logoutUser(req: Request, res: Response) {
    res.clearCookie('token');
    res.send('Logged out');
}
export async function protectedRoute(req: Request, res: Response) {
    res.send('You have access to the protected route!');
}

