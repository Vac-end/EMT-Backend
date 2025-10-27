import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface SubmissionAttributes{
  id: string;
  enrollmentId: string;
  assignmentId: string;
  quizId: string;
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
  declare assignmentId: string;
  declare quizId: string;
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
  assignmentId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Assignment', key: 'id' } },
  quizId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Quiz', key: 'id' } },
  grade: { type: DataTypes.DECIMAL(5,2), allowNull: false, defaultValue: 0.00 },
  feedback: { type: DataTypes.STRING, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: true },
  submittedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'Submission', timestamps: true})