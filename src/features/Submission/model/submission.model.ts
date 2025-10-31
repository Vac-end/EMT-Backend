import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export type SubmissionStatus = 'draft' | 'submitted' | 'graded';
export interface SubmissionAttributes{
  id: string;
  enrollmentId: string;
  grade: number | null;
  status: SubmissionStatus;
  assignmentId?: string;
  quizId?: string;
  groupId?: string;
  feedback?: string;
  textSubmission?: string;
  submittedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubmissionCreationAttributes extends Optional<SubmissionAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

export class Submission extends Model<SubmissionAttributes, SubmissionCreationAttributes> implements SubmissionAttributes{
  declare id: string;
  declare enrollmentId: string;
  declare grade: number | null;
  declare status: SubmissionStatus;
  declare assignmentId?: string;
  declare quizId?: string;
  declare groupId?: string;
  declare feedback?: string;
  declare textSubmission?: string;
  declare submittedAt?: Date | null;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Submission.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  enrollmentId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Enrollment', key: 'id' } },
  assignmentId: { type: DataTypes.UUID, allowNull: true, references: { model: 'Assignment', key: 'id' } },
  quizId: { type: DataTypes.UUID, allowNull: true, references: { model: 'Quiz', key: 'id' } },
  groupId: { type: DataTypes.UUID, allowNull: true, references: { model: 'Group', key: 'id' } },
  grade: { type: DataTypes.DECIMAL(5,2), allowNull: true, defaultValue: null },
  feedback: { type: DataTypes.STRING, allowNull: true },
  textSubmission: { type: DataTypes.TEXT, allowNull: true },
  submittedAt: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.ENUM('draft', 'submitted', 'graded'), allowNull: false, defaultValue: 'draft' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'Submission', timestamps: true})