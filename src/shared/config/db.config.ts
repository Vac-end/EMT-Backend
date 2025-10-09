import { Sequelize } from 'sequelize';
import { envConfig } from './env.config';

export const sequelize = new Sequelize(envConfig.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
  }
});