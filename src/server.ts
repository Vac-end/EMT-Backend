import app from './app';
import { sequelize } from './shared/interfaces/models';
import { envConfig } from './shared/config/env.config';
import { logger } from './shared/utils/logger';

const PORT = envConfig.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    logger.info('Database connected');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    logger.error('Database connection failed', err);
    process.exit(1);
  });