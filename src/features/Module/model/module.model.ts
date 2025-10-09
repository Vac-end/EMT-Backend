import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface ModuleAttributes {
  id: string;
  courseId: string;
  tittle: string;
  description?: string;
  orderIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
  declare id: string;
  declare courseId: string;
  declare tittle: string;
  declare description?: string;
  declare orderIndex: number;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Module.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id'}},
  tittle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  orderIndex: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Module', timestamps: false } );