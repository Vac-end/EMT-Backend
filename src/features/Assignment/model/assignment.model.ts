import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface AssignmentAttributes{
  id: string;
  lessonId: string;
  tittle: string;
  description: string;
  dueDate: Date;
  maxScore: number;
  isGroupAssignment?: boolean;
  maxAttempts?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

export class Assignment extends Model<AssignmentAttributes, AssignmentCreationAttributes> implements AssignmentAttributes{
  declare id: string;
  declare lessonId: string;
  declare tittle: string;
  declare description: string;
  declare dueDate: Date;
  declare maxScore: number;
  declare isGroupAssignment?: boolean;
  declare maxAttempts?: number;
  declare readonly  createdAt?: Date;
  declare readonly  updatedAt?: Date;
}

Assignment.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  lessonId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Lesson', key: 'id' } },
  tittle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  dueDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  maxScore: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100},
  isGroupAssignment: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  maxAttempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'Assignment', timestamps: true})