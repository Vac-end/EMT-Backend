import { Request, Response } from 'express';
import { authService } from './auth.service';
import { validationResult } from 'express-validator';
import { handleServiceError } from '@utils/helpers';


export const authController = {
  login: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { email, password, otp } = req.body;
      const result = await authService.login( email, password, otp );
      if ( result.requiresOtp ) {
        return res.status( 200 ).json( { requiresOtp: true, userId: result.userId, role: result.role } );
      }
      return res.status( 200 ).json( {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        role: result.role,
        id: result.id,
      } );
    } catch ( error: any ) {
      handleServiceError( error, 'Login' );
      return res.status( 401 ).json( { message: error.message || 'Invalid credentials' } );
    }
  },

  enableTwoFactorAuth: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { id: userId } = req.user as { id: string; };
      const { secret, otpAuthUrl, message } = await authService.enableTwoFactorAuth( userId );
      return res.status( 200 ).json( { secret, otpAuthUrl, message } );
    } catch ( error: any ) {
      handleServiceError( error, 'Enable 2FA' );
      return res.status( 400 ).json( { message: error.message || 'Failed to enable 2FA' } );
    }
  },

  disableTwoFactorTemporarily: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { id: adminId, role } = req.user as { id: string; role: string; };
      if ( role !== 'administrador' ) {
        return res.status( 403 ).json( { message: 'Admin access required' } );
      }
      const { userId } = req.body;
      const result = await authService.disableTwoFactorTemporarily( userId, adminId );
      return res.status( 200 ).json( result );
    } catch ( error: any ) {
      handleServiceError( error, 'Disable 2FA' );
      return res.status( 400 ).json( { message: error.message || 'Failed to disable 2FA' } );
    }
  },

  refresh: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { refreshToken } = req.body;
      const accessToken = await authService.refresh( refreshToken );
      return res.status( 200 ).json( { accessToken } );
    } catch ( error: any ) {
      handleServiceError( error, 'Refresh' );
      return res.status( 401 ).json( { message: error.message || 'Invalid or expired refresh token' } );
    }
  },

  logout: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { refreshToken } = req.body;
      const result = await authService.logout( refreshToken );
      return res.status( 200 ).json( { message: 'Logged out successfully', ...result } );
    } catch ( error: any ) {
      handleServiceError( error, 'Logout' );
      return res.status( 500 ).json( { message: error.message || 'Logout failed' } );
    }
  },

  recoverPassword: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { email } = req.body;
      const result = await authService.recoverPassword( email );
      return res.status( 200 ).json( { message: 'Recovery email sent if account exists', ...result } );
    } catch ( error: any ) {
      handleServiceError( error, 'Recover Password' );
      return res.status( 500 ).json( { message: error.message || 'Failed to send recovery email' } );
    }
  },

  resetPassword: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { token, newPassword } = req.body;
      const result = await authService.resetPassword( token, newPassword );
      return res.status( 200 ).json( { message: 'Password reset successful', ...result } );
    } catch ( error: any ) {
      handleServiceError( error, 'Reset Password' );
      return res.status( 400 ).json( { message: error.message || 'Invalid recovery token or password reset failed' } );
    }
  },

  checkTwoFactorStatus: async ( req: Request, res: Response ) => {
    try {
      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { message: 'Validation failed', errors: errors.array() } );
      }

      const { id: userId } = req.user as { id: string; };
      const { isEnabled } = await authService.isTwoFactorEnabled( userId );
      return res.status( 200 ).json( { isTwoFactorEnabled: isEnabled } );
    } catch ( error: any ) {
      handleServiceError( error, 'Check 2FA Status' );
      return res.status( 500 ).json( { message: error.message || 'Failed to check 2FA status' } );
    }
  },
};