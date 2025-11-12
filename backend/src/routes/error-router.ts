import type { Request, Response, NextFunction } from 'express';
import type CustomError from '../types/error-type.ts';

export default (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('Error manager', error);
    const statusCode = error.status || 500;
    const message = error.message;
    res.status(statusCode).json({ message });
};
