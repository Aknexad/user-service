import { Request, Response, NextFunction } from 'express';

interface Error {
  statusCode?: number;
  data?: object | string;
  message: string;
}

export const hikaError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const data = error.data || error.message;
  return res.status(statusCode).json(data);
};
