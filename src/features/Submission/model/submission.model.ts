import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface SubmissionAttributes{
  id: string;
  enrollmentId: string;
  lessonId: string;
  type: 'quiz' | 'assignment';
  grade: number;
  feedback: string;
  fileUrl?: string;
  submittedAt?: Date
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubmissionCreationAttributes extends Optional<SubmissionAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

export class Submission extends Model<SubmissionAttributes, SubmissionCreationAttributes> implements SubmissionAttributes{
  declare id: string;
  declare enrollmentId: string;
  declare lessonId: string;
  declare type: 'quiz' | 'assignment';
  declare grade: number;
  declare feedback: string;
  declare fileUrl?: string;
  declare submittedAt?: Date
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Submission.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  enrollmentId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Enrollment', key: 'id' } },
  lessonId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Lesson', key: 'id' } },
  type: { type: DataTypes.ENUM( 'quiz', 'assignment' ), allowNull: false },
  grade: { type: DataTypes.DECIMAL(5,2), allowNull: false, defaultValue: 0.00 },
  feedback: { type: DataTypes.STRING, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: true },
  submittedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'Submission', timestamps: true})