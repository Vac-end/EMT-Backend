import { sequelize } from '@config/db.config';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GlobalTrackingAttributes {
  id: string;
  userId: string;
  courseId: string;
  trackableType: 'module' | 'lesson' | 'quiz' | 'assignment' | 'announcement';
  trackableId: string;
  status: 'viewed' | 'completed' | 'started' | 'submitted';
  completedAt?: Date | null;
  trackedAt?: Date;
}

export interface GlobalTrackingCreationAttributes extends Optional<GlobalTrackingAttributes, 'id' | 'status' | 'completedAt' | 'trackedAt'> { }

export class GlobalTracking extends Model<GlobalTrackingAttributes, GlobalTrackingCreationAttributes> implements GlobalTrackingAttributes {
  declare id: string;
  declare userId: string;
  declare courseId: string;
  declare trackableType: 'module' | 'lesson' | 'quiz' | 'assignment' | 'announcement';
  declare trackableId: string;
  declare status: 'viewed' | 'completed' | 'started' | 'submitted';
  declare completedAt: Date | null;
  declare readonly trackedAt: Date;
}

GlobalTracking.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'User', key: 'id' } },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id' } },
  trackableType: { type: DataTypes.ENUM( 'module', 'lesson', 'quiz', 'assignment', 'announcement' ), allowNull: false },
  trackableId: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.ENUM( 'viewed', 'completed', 'started', 'submitted' ), defaultValue: 'viewed', allowNull: false },
  completedAt: { type: DataTypes.DATE, allowNull: true },
  trackedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'GlobalTracking', timestamps: true, updatedAt: 'trackedAt', indexes: [ { unique: true, fields: [ 'userId', 'trackableType', 'trackableId' ] } ] } );