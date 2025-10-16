import { handleServiceError } from '@utils/helpers';
import { quizRepository } from './quiz.repositories';
import { QuizCreationAttributes } from './model/quiz.model';

export const QuizService = {
  getAll: async () => {
    try {
      const Quizs = await quizRepository.findAll();
      return Quizs;
    } catch ( error ) {
      handleServiceError( error, "Get All Quizs" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Quiz = await quizRepository.findById( id );
      return Quiz;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Quiz" );
      throw error;
    }
  },

  getByLessonId: async ( lessonId: string ) => {
    try {
      const Quiz = await quizRepository.findByLessonId( lessonId );
      return Quiz;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Quiz" );
      throw error;
    }
  },

  create: async ( data: QuizCreationAttributes ) => {
      try {
        return quizRepository.create( { ...data } );
      } catch ( error ) {
        handleServiceError( error, "Create Quiz" );
        throw error;
      }
    },

  update: async ( id: string, data: Partial<QuizCreationAttributes> ) => {
      try {
        return quizRepository.update( id, data );
      } catch ( error ) {
        handleServiceError( error, "Update Quiz" );
        throw error;
      }
    },

  delete: async ( id: string ) => {
    try {
      const deleted = await quizRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Quiz not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Quiz" );
      throw error;
    }
  },
};