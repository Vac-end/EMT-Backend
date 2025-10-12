import { handleServiceError } from '@utils/helpers';
import { CourseContentRepository } from './courseContent.repositories';
import { CourseContentCreationAttributes } from './model/courseContent.model';

export const courseContentService = {
  getAll: async () => {
    try {
      const CourseContents = await CourseContentRepository.findAll();
      return CourseContents;
    } catch ( error ) {
      handleServiceError( error, "Get All CourseContents" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const CourseContent = await CourseContentRepository.findById( id );
      return CourseContent;
    } catch ( error ) {
      handleServiceError( error, "Get By Id CourseContent" );
      throw error;
    }
  },

  getByLessonId: async ( lessonId: string ) => {
      try {
        const CourseContent = await CourseContentRepository.findByLessonId( lessonId );
        return CourseContent;
      } catch ( error ) {
        handleServiceError( error, "Get By Id CourseContent" );
        throw error;
      }
    },

  getByType: async ( type: 'video' | 'pdf' | 'quiz' | 'assignment' | 'other' ) => {
    try {
      const CourseContent = await CourseContentRepository.findByType( type );
      return CourseContent;
    } catch ( error ) {
      handleServiceError( error, "Get By Type CourseContent" );
      throw error;
    }
  },

  create: async ( data: CourseContentCreationAttributes ) => {
    try {
      return CourseContentRepository.create( { ...data } );
    } catch ( error ) {
      handleServiceError( error, "Create CourseContent" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<CourseContentCreationAttributes> ) => {
    try {
      return CourseContentRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update CourseContent" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await CourseContentRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' CourseContent not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete CourseContent" );
      throw error;
    }
  },
};