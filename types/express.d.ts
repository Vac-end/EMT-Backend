import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: JwtPayload | { id: string; role: string; iat: number; exp: number };
  }
}