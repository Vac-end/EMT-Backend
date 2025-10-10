import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface QuestionOptAttributes{
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionOptCreationAttributes extends Optional<QuestionOptAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

export class QuestionOpt extends Model<QuestionOptAttributes, QuestionOptCreationAttributes> implements QuestionOptAttributes{
  declare id: string;
  declare questionId: string;
  declare text: string;
  declare isCorrect: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

QuestionOpt.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  questionId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Question', key: 'id' } },
  text: { type: DataTypes.STRING, allowNull: false },
  isCorrect: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{ sequelize, modelName: 'QuestionOptions', timestamps: true})