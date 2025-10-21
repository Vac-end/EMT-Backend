import { sequelize } from '@config/db.config';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AnnouncementAttributes {
  id: string;
  courseId: string;
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnnouncementCreationAttributes extends Optional<AnnouncementAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
export class Announcement extends Model<AnnouncementAttributes, AnnouncementCreationAttributes> implements AnnouncementAttributes {
  declare id: string;
  declare courseId: string;
  declare userId: string;
  declare title: string;
  declare content: string;
  declare imageUrl: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Announcement.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id' } },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'User', key: 'id' } },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'Announcement', timestamps: true } );