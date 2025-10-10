import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface ScheduleAttributes{
  id: string;
  courseId: string;
  lessonId: string;
  startTime: Date;
  endTime: Date;
  mode: 'live' | 'recorded' 
  meetingLink?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  declare id: string;
  declare courseId: string;
  declare lessonId: string;
  declare startTime: Date;
  declare endTime: Date;
  declare mode: 'live' | 'recorded' ;
  declare meetingLink?: string
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Schedule.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id'}},
  lessonId: { type: DataTypes.UUID, allowNull: true, references: { model: 'Lesson', key: 'id'}},
  startTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  endTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  mode: { type: DataTypes.ENUM( 'live', 'recorded' ), allowNull: false, defaultValue: 'recorded' },
  meetingLink: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Schedule', timestamps: true } );