import { Request, Response } from 'express';
import { logger } from '../utils/logger';

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const status = err.status || 500;

  logger.error('Unhandled error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    status,
    timestamp: new Date().toISOString(),
    userId: req.user?.id || 'anonymous',
    ip: req.ip,
  });

  res.status(status).json({
    message: status === 500 ? 'An unexpected error occurred' : err.message,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};