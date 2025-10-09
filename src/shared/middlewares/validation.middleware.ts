import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

export const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    return next();
  } catch (err:any) {
    logger.error('Validation error', err);
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }
};