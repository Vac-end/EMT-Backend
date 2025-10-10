import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface QuestionAttributes{
  id: string;
  quizId: string;
  text: string;
  type: 'mcq' | 'true_false' | 'short_answer';
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes{
  declare id: string;
  declare quizId: string;
  declare text: string;
  declare type: 'mcq' | 'true_false' | 'short_answer';
  declare points: number;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Question.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  quizId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Quiz', key: 'id' } },
  text: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM( 'mcq', 'true_false', 'short_answer'), allowNull: false, defaultValue: 'mcq' },
  points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'Question', timestamps: true})