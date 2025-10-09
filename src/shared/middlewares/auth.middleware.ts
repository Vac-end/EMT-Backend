import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { logger } from '../utils/logger';

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (err:any) {
    if (err instanceof jwt.TokenExpiredError) {
      logger.error('Token expired for request', { error: err.message, path: req.path });
      return res.status(401).json({ message: 'Token has expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      logger.error('Invalid token for request', { error: err.message, path: req.path });
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      logger.error('Authentication failed for request', { error: err.message, path: req.path });
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
};