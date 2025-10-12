import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/db.config';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: 'estudiante' | 'docente' | 'administrador';
  name?: string;
  academicLevelId?: string;
  otpRequired?: boolean;
  imagePerfilUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare password: string;
  declare role: 'estudiante' | 'docente' | 'administrador';
  declare name?: string;
  declare academicLevelId?: string;
  declare otpRequired?: boolean;
  declare imagePerfilUrl?: string;
  declare resetPasswordToken?: string | null;
  declare resetPasswordExpires?: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM( 'estudiante', 'docente', 'administrador' ), allowNull: false, defaultValue: 'estudiante' },
    name: { type: DataTypes.STRING, allowNull: false },
    academicLevelId: { type: DataTypes.UUID, allowNull: true, references: { model: 'AcademicLevel', key: 'id' } },
    otpRequired: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    imagePerfilUrl: { type: DataTypes.STRING, allowNull: false, defaultValue:'/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'User', timestamps: true }
);