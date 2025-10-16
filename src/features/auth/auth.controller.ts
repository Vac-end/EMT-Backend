import { Request, Response } from 'express';
import { authService } from './auth.service';
import { handleServiceError } from '@utils/helpers';
import { handleValidation } from './model/auth.validation';
import { envConfig } from '../../shared/config/env.config';

export const authController = {
  login: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { email, password, otp } = req.body;
      const result = await authService.login( email, password, otp );

      if ( result.requiresOtp ) {
        return res.status( 200 ).json( {
          requiresOtp: true,
          userId: result.userId,
          role: result.role,
        } );
      }
      res.cookie( 'refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      } );

      return res.status( 200 ).json( {
        accessToken: result.accessToken,
        role: result.role,
        id: result.userId,
      } );
    } catch ( error ) {
      handleServiceError( error, 'Login' );
      return res.status( 401 ).json( { message: 'Invalid credentials' } );
    }
  },

  enableTwoFactorAuth: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { userId } = req.body;
      const { secret, otpAuthUrl, message } = await authService.enableTwoFactorAuth( userId );
      return res.status( 200 ).json( { secret, otpAuthUrl, message } );
    } catch ( error ) {
      handleServiceError( error, 'Enable 2FA' );
      return res.status( 400 ).json( { message: 'Failed to enable 2FA' } );
    }
  },

  disableTwoFactorTemporarily: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { adminId, role, userId } = req.body;
      if ( role !== 'administrador' ) {
        return res.status( 403 ).json( { message: 'Admin access required' } );
      }

      const result = await authService.disableTwoFactorTemporarily( userId, adminId );
      return res.status( 200 ).json( result );
    } catch ( error ) {
      handleServiceError( error, 'Disable 2FA' );
      return res.status( 400 ).json( { message: 'Failed to disable 2FA' } );
    }
  },

  refresh: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const token = req.cookies.refreshToken;
      if ( !token ) {
        return res.status( 401 ).json( { message: 'No refresh token provided' } );
      }

      const accessToken = await authService.refresh( token );
      return res.status( 200 ).json( { accessToken } );
    } catch ( error ) {
      handleServiceError( error, 'Refresh' );
      return res.status( 401 ).json( { message: 'Invalid or expired refresh token' } );
    }
  },

  logout: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;
      const token = req.cookies.refreshToken;
      if ( !token ) {
        return res.status( 400 ).json( { message: 'No refresh token found' } );
      }
      await authService.logout( token );
      res.clearCookie( 'refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
      } );
      return res.status( 200 ).json( { message: 'Logged out successfully' } );
    } catch ( error ) {
      handleServiceError( error, 'Logout' );
      return res.status( 500 ).json( { message: 'Logout failed' } );
    }
  },

  recoverPassword: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { email } = req.body;
      const result = await authService.recoverPassword( email );
      return res.status( 200 ).json( { message: 'Recovery email sent if account exists', ...result } );
    } catch ( error ) {
      handleServiceError( error, 'Recover Password' );
      return res.status( 500 ).json( { message: 'Failed to send recovery email' } );
    }
  },

  resetPassword: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { token, newPassword } = req.body;
      const result = await authService.resetPassword( token, newPassword );
      return res.status( 200 ).json( { message: 'Password reset successful', ...result } );
    } catch ( error ) {
      handleServiceError( error, 'Reset Password' );
      return res.status( 400 ).json( { message: 'Invalid recovery token or password reset failed' } );
    }
  },

  checkTwoFactorStatus: async ( req: Request, res: Response ) => {
    try {
      if ( handleValidation( req, res ) ) return;

      const { userId } = req.body;
      const { isEnabled } = await authService.isTwoFactorEnabled( userId );
      return res.status( 200 ).json( { isTwoFactorEnabled: isEnabled } );
    } catch ( error ) {
      handleServiceError( error, 'Check 2FA Status' );
      return res.status( 500 ).json( { message: 'Failed to check 2FA status' } );
    }
  },
};
