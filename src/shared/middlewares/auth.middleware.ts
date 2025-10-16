import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { logger } from '../utils/logger';
import { CustomJwtPayload } from '../../../types/express';

export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const authHeader = req.header( 'Authorization' );
    if ( !authHeader?.startsWith( 'Bearer ' ) ) {
      return res.status( 401 ).json( { message: 'No token provided or invalid format' } );
    }
    const token = authHeader.split( ' ' )[ 1 ];
    if ( !token ) {
      return res.status( 401 ).json( { message: 'Token not found in Authorization header' } );
    }
    const decoded = jwt.verify( token, envConfig.PRIVATE_KEY ) as CustomJwtPayload;
    req.user = decoded;
    return next();
  } catch ( err: unknown ) {
    if ( err instanceof jwt.TokenExpiredError ) {
      logger.warn( '⏰ Token expired', { path: req.path } );
      return res.status( 401 ).json( { message: 'Token has expired' } );
    }
    if ( err instanceof jwt.JsonWebTokenError ) {
      logger.error( 'Invalid token', { error: err.message, path: req.path } );
      return res.status( 401 ).json( { message: 'Invalid token' } );
    }
    logger.error( 'Authentication failed', { error: ( err as Error ).message, path: req.path } );
    return res.status( 500 ).json( { message: 'Authentication failed' } );
  }
};