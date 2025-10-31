import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DOMAIN: process.env.DOMAIN || 'example.com',
  DATABASE_URL: process.env.DATABASE_URL || '',
  PRIVATE_KEY: process.env.PRIVATE_KEY || 'your-jwt-secret',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:4200',
  NODE_ENV: process.env.NODE_ENV || 'development',
  ACCESS_KEY: process.env.ACCESS_KEY || '',
  SECRET_KEY: process.env.SECRET_KEY || '',
  ENDPOINT_URL: process.env.ENDPOINT_URL || "https://111.r2.cloudflarestorage.com",
  PRIVATE_BUCKET_NAME: process.env.PRIVATE_BUCKET_NAME || "bucket",
  PUBLIC_BUCKET_NAME: process.env.PUBLIC_BUCKET_NAME || "public-bucket",
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || "",
};