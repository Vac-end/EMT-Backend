import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface AttendanceAttributes{
  id: string;
  enrollmentId: string;
  lessonId: string;
  status: 'present' | 'absent' | 'late';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes> implements AttendanceAttributes {
  declare id: string;
  declare enrollmentId: string;
  declare lessonId: string;
  declare status: 'present' | 'absent' | 'late';
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Attendance.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  enrollmentId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Enrollment', key: 'id'}},
  lessonId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Lesson', key: 'id'}},
  status: { type: DataTypes.ENUM( 'present', 'absent', 'late' ), allowNull: false, defaultValue: 'absent' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Attendance', timestamps: true } );