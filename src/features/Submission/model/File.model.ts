import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';
import { CONTENT_TYPE_VALUES, ContentType } from '@utils/types';

export interface FileAttributes {
  id: string;
  fileUrl: string;
  fileName: string;
  fileKey: string;
  resourceId: string;
  resourceType: string;
  fileType?: ContentType;
}

export interface FileCreationAttributes extends Optional<FileAttributes, 'id'> { }

export class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  declare id: string;
  declare fileUrl: string;
  declare fileName: string;
  declare fileKey: string;
  declare resourceId: string;
  declare resourceType: string;
  declare fileType?: ContentType;
}

File.init( {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  fileName: { type: DataTypes.STRING, allowNull: false },
  fileKey: { type: DataTypes.STRING, allowNull: false },
  fileType: { type: DataTypes.ENUM(...CONTENT_TYPE_VALUES), allowNull: true },
  resourceId: { type: DataTypes.UUID, allowNull: false },
  resourceType: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, modelName: 'File', timestamps: true, indexes: [ { name: 'idx_file_resource', fields: [ 'resourceId', 'resourceType' ], }, ], } );

