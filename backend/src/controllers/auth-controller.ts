import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../models/user.ts";
import CustomError from "../types/error-type.ts";

const jwtSign = (nickname: string) => {
    return jwt.sign(
        {
            nickname: nickname,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
}

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userAlreadyExist = await User.findOne({nickname, email});
        if (userAlreadyExist) {
            const errorMessage = userAlreadyExist.email === email ? 'E-Mail already registered.' : 'Nickname already taken.';
            throw new CustomError(errorMessage, 401);
        }
        const user = new User({nickname, email, password: hashedPassword});
        await user.save();
        const token = jwtSign(nickname);
        res.status(201).json({
            message: 'Signed up.',
            jwt: token
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError('E-Mail not registered yet.', 401);
        }
        const isEqual = await bcrypt.compare(password, user.password!);
        if (!isEqual) {
            throw new CustomError('Password is incorrect.', 401);
        }
        const token = jwtSign(user.nickname!);
        res.status(200).json({
            message: 'Logged in.',
            jwt: token
        });
    } catch (error) {
        next(error);
    }
};
