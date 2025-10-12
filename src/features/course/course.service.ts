import { handleServiceError } from '@utils/helpers';
import { courseRepository } from './course.repositories';
import { CourseCreationAttributes } from './model/course.model';

export const courseService = {
  getAll: async () => {
    try {
      const Courses = await courseRepository.findAll();
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get All Courses" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Courses = await courseRepository.findById( id );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Courses" );
      throw error;
    }
  },

  getByCreatedId: async ( createdBy: string ) => {
    try {
      const Courses = await courseRepository.findByCreatedId( createdBy );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By CreatedId Courses" );
      throw error;
    }
  },

  getByAcademicLevelId: async ( academicLevelId: string ) => {
    try {
      const Courses = await courseRepository.findByAcademicLevelId( academicLevelId );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By AcademicLevelId Courses" );
      throw error;
    }
  },

  create: async ( data: CourseCreationAttributes ) => {
    try {
      return courseRepository.create( { ...data } );
    } catch ( error ) {
      handleServiceError( error, "Create Courses" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<CourseCreationAttributes> ) => {
    try {
      return courseRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update Courses" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await courseRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Courses not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Courses" );
      throw error;
    }
  },
};