import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import { envConfig } from './shared/config/env.config';
import { logger } from './shared/utils/logger';
import routes from './shared/interfaces/routes';
import { errorHandler } from './shared/middlewares/error.middleware';
import { notFoundHandler } from './shared/middlewares/notFound.middleware';
import { rateLimitMiddleware } from '@middlewares/rateLimit.middleware';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Middlewares globales
app.use(helmet());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const allowedOrigins = [
  'http://localhost:4200',  //desarrollo
  'https://sancato.dev'      //producción
];
app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use('/api', routes);
app.use(rateLimitMiddleware)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;