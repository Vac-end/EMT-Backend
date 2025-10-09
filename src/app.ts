import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { envConfig } from './shared/config/env.config';
import { logger } from './shared/utils/logger';
import routes from './shared/interfaces/routes';
import { errorHandler } from './shared/middlewares/error.middleware';
import { notFoundHandler } from './shared/middlewares/notFound.middleware';
import { rateLimitMiddleware } from '@middlewares/rateLimit.middleware';

const app: Application = express();

// Middlewares globales
app.use(helmet());
app.use(cors({ origin: envConfig.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use(rateLimitMiddleware)
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;