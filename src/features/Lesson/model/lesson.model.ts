import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface LessonAttributes {
  id: string;
  moduleId: string;
  tittle: string;
  orderIndex: number;
  description?: string;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LessonCreationAttributes extends Optional<LessonAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Lesson extends Model<LessonAttributes, LessonCreationAttributes> implements LessonAttributes {
  declare id: string;
  declare moduleId: string;
  declare tittle: string;
  declare orderIndex: number;
  declare description?: string;
  declare duration?: number;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Lesson.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  moduleId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Module', key: 'id'}},
  tittle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  orderIndex: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Lesson', timestamps: true } );