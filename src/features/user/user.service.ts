import { handleServiceError } from '@utils/helpers';
import { userRepository } from './user.repositories';
import { UserCreationAttributes } from '@interfaces/models';
import bcrypt from 'bcrypt';

export const userService = {
  getAll: async () => {
    try {
      const Users = await userRepository.findAll();
      return Users;
    } catch ( error ) {
      handleServiceError( error, "Get All Users" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const User = await userRepository.findById( id );
      return User;
    } catch ( error ) {
      handleServiceError( error, "Get By Id User" );
      throw error;
    }
  },

  getByRole: async ( role: 'estudiante' | 'docente' | 'administrador' ) => {
    try {
      const User = await userRepository.findByRole( role );
      return User;
    } catch ( error ) {
      handleServiceError( error, "Get By Role User" );
      throw error;
    }
  },

  create: async ( data: UserCreationAttributes ) => {
    try {
      const UserExists = await userRepository.findByEmail( data.email );
      if ( UserExists ) { throw new Error( 'User exist' ); }
      const hashedPassword = await bcrypt.hash( data.password, 10 );
      return userRepository.create( { ...data, password: hashedPassword } );
    } catch ( error ) {
      handleServiceError( error, "Create User" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<UserCreationAttributes> ) => {
    try {
      if ( data.password ) throw new Error( 'Password update not allowed via this method' );
      return userRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update User" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await userRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' User not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete User" );
      throw error;
    }
  },
};