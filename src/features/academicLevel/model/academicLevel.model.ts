import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface AcademicLevelAttributes {
  id: string;
  name: string;
  orderIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademicLevelCreationAttributes extends Optional<AcademicLevelAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class AcademicLevel extends Model<AcademicLevelAttributes, AcademicLevelCreationAttributes> implements AcademicLevelAttributes {
  declare id: string;
  declare name: string;
  declare orderIndex: number;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

AcademicLevel.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'AcademicLevel', timestamps: true } );