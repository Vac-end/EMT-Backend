import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface EnrollmentAttributes {
  id: string;
  userId: string;
  courseId: string;
  role: 'estudiante' | 'docente' | 'soporte';
  enrollmentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EnrollmentCreationAttributes extends Optional<EnrollmentAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> implements EnrollmentAttributes {
  declare id: string;
  declare userId: string;
  declare courseId: string;
  declare role: 'estudiante' | 'docente' | 'soporte';
  declare enrollmentDate: Date;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Enrollment.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'User', key: 'id' } },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id' } },
  role: { type: DataTypes.ENUM( 'estudiante', 'docente', 'soporte'), allowNull: false, defaultValue: 'estudiante' },
  enrollmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Enrollment', timestamps: true } );