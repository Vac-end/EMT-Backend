import { envConfig } from '@config/env.config';
import { userRepository } from '@features/user/user.repositories';
import { handleServiceError } from '@utils/helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { authRepository } from './auth.repositories';
import { emailService } from '@features/email/email.service';
const generateShortCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for ( let i = 0; i < 6; i++ ) {
    code += chars.charAt( Math.floor( Math.random() * chars.length ) );
  }
  return code;
};

const generateAccessToken = (user: any) => {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    academicLevelId: user.academicLevelId,
  };
  return jwt.sign(payload, envConfig.PRIVATE_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user: any) => {
  const payload = { sub: user.id };
  return jwt.sign(payload, envConfig.PRIVATE_KEY, { expiresIn: '7d' });
};

export const authService = {

  login: async ( email: string, password: string, otp?: string ) => {
    try {
      if ( !email || !password ) {
        throw new Error( 'Email and password are required' );
      }
      const user = await userRepository.findByEmailWithPassword( email );
      if ( !user || !user.password || !( await bcrypt.compare( password, user.password ) ) ) {
        throw new Error( 'Invalid credentials' );
      }

      if ( user.otpRequired ) {
        if ( !otp ) {
          return { requiresOtp: true, userId: user.id, role: user.role };
        }
        const twoFactor = await authRepository.findByUser( user.id );
        const otpToken = twoFactor.find( ( t ) => t.type === 'Otp' );
        if ( !otpToken || !otpToken.token ) {
          throw new Error( '2FA is enabled but no OTP secret found' );
        }
        const isValid = authenticator.check( otp, otpToken.token );
        if ( !isValid ) {
          throw new Error( 'Invalid OTP' );
        }
      }
      
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await authRepository.create( {
        token: refreshToken,
        userId: user.id,
        expires: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ),
        type: 'refreshToken',
      } );
      return {
        accessToken,
        refreshToken,
        user: { id: user.id, role: user.role, email: user.email, name: user.name, academicLevelId: user.academicLevelId },
      };
    } catch ( error ) {
      handleServiceError( error, 'Login' );
      throw error;
    }
  },

  enableTwoFactorAuth: async ( userId: string ) => {
    try {
      const user = await userRepository.findById( userId );
      if ( !user || ( user.role !== 'docente' && user.role !== 'administrador' ) ) {
        throw new Error( '2FA only available for teachers and admins' );
      }

      const existingTokens = await authRepository.findByUser( userId );
      const twoFactorAuth = existingTokens.find( ( t ) => t.type === 'Otp' );

      const secret = authenticator.generateSecret();
      if ( twoFactorAuth ) {
        await authRepository.deleteByToken( twoFactorAuth.token );
      }
      await authRepository.create( {
        token: secret,
        userId,
        type: 'Otp',
      } );

      await userRepository.update( userId, { otpRequired: true } );

      const otpAuthUrl = authenticator.keyuri( user.email, 'sancato.dev', secret );
      return {
        secret,
        otpAuthUrl,
        message: 'Scan this QR code with Authy to enable 2FA',
      };
    } catch ( error ) {
      handleServiceError( error, 'Enable 2FA' );
      throw error;
    }
  },

  disableTwoFactorTemporarily: async ( userId: string, adminId: string ) => {
    try {
      const admin = await userRepository.findById( adminId );
      if ( !admin || admin.role !== 'administrador' ) {
        throw new Error( 'Admin access required' );
      }
      const user = await userRepository.findById( userId );
      if ( !user || !user.otpRequired ) {
        throw new Error( '2FA not enabled for this user' );
      }
      const twoFactorTokens = await authRepository.findByUser( userId );
      const twoFactor = twoFactorTokens.find( ( t ) => t.type === 'Otp' );
      if ( twoFactor ) {
        await authRepository.deleteByToken( twoFactor.token );
      }
      await userRepository.update( userId, { otpRequired: false } );
      return { message: '2FA disabled' };
    } catch ( error ) {
      handleServiceError( error, 'Disable 2FA' );
      throw error;
    }
  },

  refresh: async ( token: string ) => {
    try {
      const refreshToken = await authRepository.findByToken( token );
      if ( !refreshToken || ( refreshToken.expires && refreshToken.expires < new Date() ) || refreshToken.type !== 'refreshToken' ) {
        throw new Error( 'Invalid or expired refresh token' );
      }
      const decoded = jwt.verify( token, envConfig.PRIVATE_KEY ) as { sub: string; };
      const user = await userRepository.findById( decoded.sub );
      if ( !user ) {
        throw new Error( 'User not found' );
      }
      return generateAccessToken(user);
    } catch ( error ) {
      handleServiceError( error, 'Refresh Token' );
      throw error;
    }
  },

  logout: async ( token: string ) => {
    try {
      const refreshToken = await authRepository.findByToken( token );
      if ( refreshToken && refreshToken.type === 'refreshToken' ) {
        await authRepository.deleteByToken( token );
      }
      return { success: true };
    } catch ( error ) {
      handleServiceError( error, 'Logout' );
      throw error;
    }
  },

  recoverPassword: async ( email: string ) => {
    try {
      const user = await userRepository.findByEmail( email );
      if ( !user ) {
        return;
      }
      const recoveryToken = generateShortCode();
      const expiresAt = new Date( Date.now() + 3600000 );
      await authRepository.create( {
        token: recoveryToken,
        userId: user.id,
        expires: expiresAt,
        type: 'recoveryToken',
      } );
      await emailService.send( email, 'Password Recovery', `Your recovery code is: ${ recoveryToken }. It expires at ${ expiresAt }` );
      return { success: true };
    } catch ( error ) {
      handleServiceError( error, 'Recover Password' );
      throw error;
    }
  },

  resetPassword: async ( token: string, newPassword: string ) => {
    try {
      const recoveryToken = await authRepository.findByToken( token );
      if ( !recoveryToken || ( recoveryToken.expires && recoveryToken.expires < new Date() ) || recoveryToken.type !== 'recoveryToken' ) {
        throw new Error( 'Invalid or expired recovery code' );
      }
      const user = await userRepository.findById( recoveryToken.userId );
      if ( !user ) {
        throw new Error( 'User not found' );
      }
      const hashedPassword = await bcrypt.hash( newPassword, 10 );
      await userRepository.update( user.id, { password: hashedPassword } );
      await authRepository.deleteByToken( token );
      return { success: true };
    } catch ( error ) {
      handleServiceError( error, 'Reset Password' );
      throw error;
    }
  },

  isTwoFactorEnabled: async ( userId: string ) => {
    try {
      const user = await userRepository.findById( userId );
      return { isEnabled: !!user?.otpRequired };
    } catch ( error ) {
      handleServiceError( error, 'Check 2FA Status' );
      throw error;
    }
  },
};