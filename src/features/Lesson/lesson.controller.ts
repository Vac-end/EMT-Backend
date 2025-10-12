import { Request, Response } from 'express'
import { LessonService } from './lesson.service';
import { handleServiceError } from '@utils/helpers';

export const LessonController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Lessons = await LessonService.getAll();
      return res.status( 200 ).json( Lessons );
    } catch ( error ) {
      handleServiceError( error, 'Get All Lessons' );
      return res.status( 500 ).json( { message: 'Failed to fetch Lessons' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const Lesson = await LessonService.getById( id );
      if ( !Lesson ) return res.status( 404 ).json( { message: 'Lesson not found' } );
      return res.status( 200 ).json( Lesson );
    } catch ( error ) {
      handleServiceError( error, 'Get Lessons by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Lesson' } );
    }
  },

  getByModuleId: async ( req: Request, res: Response ) => {
    try {
      const { moduleId } = req.params;
      if ( !moduleId ) return res.status( 400 ).json( { message: 'Module ID is required' } );
      const Lesson = await LessonService.getByModuleId( moduleId );
      if ( !Lesson ) return res.status( 404 ).json( { message: 'Lesson not found' } );
      return res.status( 200 ).json( Lesson );
    } catch ( error ) {
      handleServiceError( error, 'Get Lesson by Module ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Lesson' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const Lesson = await LessonService.create( req.body );
      return res.status( 201 ).json( Lesson );
    } catch ( error ) {
      handleServiceError( error, 'Create Lesson' );
      return res.status( 400 ).json( { message: 'Failed to create Lesson' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const Lesson = await LessonService.update( id, req.body );
      if ( !Lesson ) return res.status( 404 ).json( { message: 'Lesson not found' } );
      return res.status( 200 ).json( Lesson );
    } catch ( error ) {
      handleServiceError( error, 'Update Lesson' );
      return res.status( 400 ).json( { message: 'Failed to update Lesson' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      await LessonService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Lesson' );
      return res.status( 500 ).json( { message: 'Failed to delete Lesson' } );
    }
  },
};