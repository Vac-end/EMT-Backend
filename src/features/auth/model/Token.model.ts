import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface TokenAttributes {
  id: string;
  token: string;
  userId: string;
  expires?: Date;
  type: 'refreshToken' | 'Otp' | 'recoveryToken';
  createdAt: Date;
}

export interface TokenCreationAttributes extends Optional<TokenAttributes, 'id' | 'createdAt'> { }

export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
  declare id: string;
  declare token: string;
  declare userId: string;
  declare expires?: Date;
  declare type: 'refreshToken' | 'Otp' | 'recoveryToken';
  declare readonly createdAt: Date;
}

Token.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'User', key: 'id' } },
  expires: { type: DataTypes.DATE, allowNull: true },
  type: { type: DataTypes.ENUM( 'refreshToken', 'Otp', 'recoveryToken' ), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Token', timestamps: false } );