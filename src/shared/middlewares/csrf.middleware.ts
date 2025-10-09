import { Request, Response, NextFunction } from 'express';
import csurf from 'csurf';
import { logger } from '../utils/logger';

// Initialize CSRF protection with cookie-based token
const csrfProtection = csurf({ cookie: true });

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  csrfProtection(req, res, (err) => {
    if (err) {
      logger.error('CSRF validation failed', err);
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
    return next();
  });
};