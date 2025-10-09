import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
  return next();
};