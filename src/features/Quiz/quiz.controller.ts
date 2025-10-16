import { Request , Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { QuizService } from './quiz.service';

export const QuizController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Quizs = await QuizService.getAll();
      return res.status( 200 ).json( Quizs );
    } catch ( error ) {
      handleServiceError( error, 'Get All Quiz' );
      return res.status( 500 ).json( { message: 'Failed to fetch Quiz' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Quiz ID is required' } );
      const Quiz = await QuizService.getById( id );
      if ( !Quiz ) return res.status( 404 ).json( { message: 'Quiz not found' } );
      return res.status( 200 ).json( Quiz );
    } catch ( error ) {
      handleServiceError( error, 'Get Quiz by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Quiz' } );
    }
  },

  getByLessonId: async ( req: Request, res: Response ) => {
    try {
      const { lessonId } = req.params;
      if ( !lessonId ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const Quiz = await QuizService.getByLessonId( lessonId );
      if ( !Quiz ) return res.status( 404 ).json( { message: 'Quiz not found' } );
      return res.status( 200 ).json( Quiz );
    } catch ( error ) {
      handleServiceError( error, 'Get Quiz by Lesson ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Quiz' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const Quiz = await QuizService.create( req.body );
      return res.status( 201 ).json( Quiz );
    } catch ( error ) {
      handleServiceError( error, 'Create Quiz' );
      return res.status( 400 ).json( { message: 'Failed to create Quiz' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Quiz ID is required' } );
      const Quiz = await QuizService.update( id, req.body );
      if ( !Quiz ) return res.status( 404 ).json( { message: 'Quiz not found' } );
      return res.status( 200 ).json( Quiz );
    } catch ( error ) {
      handleServiceError( error, 'Update Quiz' );
      return res.status( 400 ).json( { message: 'Failed to update Quiz' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Quiz ID is required' } );
      await QuizService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Quiz' );
      return res.status( 500 ).json( { message: 'Failed to delete Quiz' } );
    }
  },
};