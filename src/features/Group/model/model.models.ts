import { sequelize } from '@config/db.config';
import { Enrollment } from '@interfaces/models';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GroupAttributes {
  id: string;
  courseId: string;
  name: string;
  description?: string | null;
  maxMembers?: number | null;
  isOpenForJoin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id' | 'description' | 'maxMembers' | 'isOpenForJoin' | 'createdAt' | 'updatedAt'> { }
export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  declare id: string;
  declare courseId: string;
  declare name: string;
  declare description: string | null;
  declare maxMembers: number | null;
  declare isOpenForJoin: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare members?: Enrollment[];
}

Group.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  courseId: { type: DataTypes.UUID, allowNull: false, references: { model: 'Course', key: 'id' } },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  maxMembers: { type: DataTypes.INTEGER, allowNull: true },
  isOpenForJoin: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {  sequelize,  modelName: 'Group',  timestamps: true});