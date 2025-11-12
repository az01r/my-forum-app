import { type Request, type Response, type NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../types/error-type.ts';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(422).json({ errors: errors.array().map((error) => error.msg) });
        // return;
        const error = new CustomError(errors.array().at(0)!.msg, 422);
        next(error);
    }
    next();
};