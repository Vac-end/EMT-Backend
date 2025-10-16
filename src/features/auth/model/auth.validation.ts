import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import z from 'zod';

export const loginSchema = z.object( {
  email: z.string().email(),
  password: z.string().min( 6 ),
  otp: z.string().optional(),
} );

export const resetPasswordSchema = z.object( {
  token: z.string(),
  newPassword: z.string().min( 6 ),
} );

export const enableDisableTwoFactorSchema = z.object( {
  userId: z.string().uuid(),
} );

export const recoverPasswordSchema = z.object( {
  email: z.string().email(),
} );

export const handleValidation = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    return true;
  }
  return false;
};