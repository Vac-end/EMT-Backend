import { handleServiceError } from '@utils/helpers';
import { moduleRepository } from './module.repositories';
import { ModuleCreationAttributes } from './model/module.model';

export const ModuleService = {
  getAll: async () => {
    try {
      const Modules = await moduleRepository.findAll();
      return Modules;
    } catch ( error ) {
      handleServiceError( error, "Get All Modules" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Module = await moduleRepository.findById( id );
      return Module;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Module" );
      throw error;
    }
  },

  getByCourseId: async ( courseId: string ) => {
    try {
      const Module = await moduleRepository.findByCourseId( courseId );
      return Module;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Module" );
      throw error;
    }
  },

  create: async ( data: ModuleCreationAttributes ) => {
      try {
        return moduleRepository.create( { ...data } );
      } catch ( error ) {
        handleServiceError( error, "Create Module" );
        throw error;
      }
    },

  update: async ( id: string, data: Partial<ModuleCreationAttributes> ) => {
      try {
        return moduleRepository.update( id, data );
      } catch ( error ) {
        handleServiceError( error, "Update Module" );
        throw error;
      }
    },

  delete: async ( id: string ) => {
    try {
      const deleted = await moduleRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Module not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Module" );
      throw error;
    }
  },
};