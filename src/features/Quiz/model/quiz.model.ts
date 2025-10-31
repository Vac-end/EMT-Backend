import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface QuizAttributes {
  id: string;
  lessonId: string;
  tittle: string;
  description: string;
  duration: number;
  totalPoints: number;
  isGroupQuiz?:boolean;
  dueDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuizCreationAttributes extends Optional<QuizAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  declare id: string;
  declare lessonId: string;
  declare tittle: string;
  declare description: string;
  declare duration: number;
  declare totalPoints: number;
  declare isGroupQuiz?:boolean;
  declare dueDate?: Date | null;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Quiz.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  lessonId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Lesson', key: 'id'}},
  tittle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  duration: { type: DataTypes.INTEGER, allowNull: true },
  totalPoints: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  isGroupQuiz: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  dueDate: { type: DataTypes.DATE, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Quiz', timestamps: true } );