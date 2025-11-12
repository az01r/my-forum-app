import type { NextFunction, Request, Response } from "express";
import CustomError from '../types/error-type.ts';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const error = new CustomError("404 - Not Found", 500);
  next(error);
}
