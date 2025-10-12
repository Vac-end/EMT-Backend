import { handleServiceError } from '@utils/helpers';
import { lessonRepository } from './lesson.repositories';
import { LessonCreationAttributes } from './model/lesson.model';

export const LessonService = {
  getAll: async () => {
    try {
      const Lessons = await lessonRepository.findAll();
      return Lessons;
    } catch ( error ) {
      handleServiceError( error, "Get All Lessons" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Lesson = await lessonRepository.findById( id );
      return Lesson;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Lesson" );
      throw error;
    }
  },

  getByModuleId: async ( molduleId: string ) => {
    try {
      const Lesson = await lessonRepository.findByModuleId( molduleId );
      return Lesson;
    } catch ( error ) {
      handleServiceError( error, "Get By ModuleId Lesson" );
      throw error;
    }
  },

  create: async ( data: LessonCreationAttributes ) => {
    try {
      return lessonRepository.create( { ...data } );
    } catch ( error ) {
      handleServiceError( error, "Create Lesson" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<LessonCreationAttributes> ) => {
    try {
      return lessonRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update Lesson" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await lessonRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Lesson not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Lesson" );
      throw error;
    }
  },
};