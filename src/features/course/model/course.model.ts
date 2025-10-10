import { sequelize } from '@config/db.config';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CourseAttributes {
  id: string;
  tittle: string;
  description: string;
  coverImageUrl: string;
  createdBy: string;
  academicLevelId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: string;
  declare tittle: string;
  declare description: string;
  declare coverImageUrl: string;
  declare createdBy: string;
  declare academicLevelId?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Course.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  tittle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  coverImageUrl: { type: DataTypes.STRING, allowNull: true },
  createdBy: { type: DataTypes.UUID, allowNull: false, references: { model: 'User', key: 'id' } },
  academicLevelId: { type: DataTypes.UUID, allowNull: true, references: { model: 'AcademicLevel', key: 'id' } },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Course', timestamps: true }
);