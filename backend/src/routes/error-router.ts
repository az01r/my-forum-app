import type { Request, Response, NextFunction } from 'express';
import type CustomError from '../types/error-type.ts';

export default (error: CustomError | any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    const messages = error.messages || error.message || 'An error occured';

    console.log(`\x1b[31m\Error ${statusCode}: ${messages}\x1b[0m`);
    
    res.status(statusCode).json({ messages });
};
