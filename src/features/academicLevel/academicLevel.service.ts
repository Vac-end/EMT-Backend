import { handleServiceError } from '@utils/helpers';
import { academicLevelRepository } from '@features/AcademicLevel/academicLevel.repositories';
import { AcademicLevelCreationAttributes } from '@interfaces/models';

export const academicLevelService = {
  getAll: async () => {
    try {
      return academicLevelRepository.findAll();
    } catch ( error ) {
      handleServiceError( error, "Get All AcademicLevel" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const AcademicLevel = await academicLevelRepository.findById( id );
      return AcademicLevel;
    } catch ( error ) {
      handleServiceError( error, "Get By Id AcademicLevel" );
      throw error;
    }
  },

  create: async ( data: AcademicLevelCreationAttributes ) => {
    try {
      return academicLevelRepository.create( data );
    } catch ( error ) {
      handleServiceError( error, "Create AcademicLevel" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<AcademicLevelCreationAttributes> ) => {
    try {
      return academicLevelRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update AcademicLevel" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await academicLevelRepository.delete( id );
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete AcademicLevel" );
      throw error;
    }

  }
};