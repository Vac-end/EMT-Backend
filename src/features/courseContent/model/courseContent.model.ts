import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface CourseContentAttributes {
  id: string;
  lessonId: string;
  type: 'video' | 'pdf' | 'quiz' | 'assignment' | 'other';
  orderIndex: number;
  contentUrl?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseContentCreationAttributes extends Optional<CourseContentAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class CourseContent extends Model<CourseContentAttributes, CourseContentCreationAttributes> implements CourseContentAttributes {
  declare id: string;
  declare lessonId: string;
  declare type: 'video' | 'pdf' | 'quiz' | 'assignment' | 'other';
  declare orderIndex: number;
  declare contentUrl?: string;
  declare description?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

CourseContent.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  lessonId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Lesson', key: 'id'}},
  type: { type: DataTypes.ENUM('video', 'pdf', 'quiz', 'assignment', 'other'), allowNull: false, defaultValue: 'other' },
  orderIndex: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  contentUrl: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'CourseContent', timestamps: true } );