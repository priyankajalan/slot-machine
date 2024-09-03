import { Request, Response, NextFunction } from 'express';

interface IError {
    name: string;
    code: number;
    message: string;
}

export const errorHandler = (err:IError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error Handler:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key error: Username already exists' });
  }

  res.status(500).json({ error: 'An unexpected error occurred' });
};