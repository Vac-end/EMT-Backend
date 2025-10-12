import { Request, Response } from 'express';
import { courseContentService } from './courseContent.service';
import { handleServiceError } from '@utils/helpers';

export const CourseContentController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const CourseContents = await courseContentService.getAll();
      return res.status( 200 ).json( CourseContents );
    } catch ( error ) {
      handleServiceError( error, 'Get All CourseContents' );
      return res.status( 500 ).json( { message: 'Failed to fetch CourseContents' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'CourseContent ID is required' } );
      const CourseContent = await courseContentService.getById( id );
      if ( !CourseContent ) return res.status( 404 ).json( { message: 'CourseContent not found' } );
      return res.status( 200 ).json( CourseContent );
    } catch ( error ) {
      handleServiceError( error, 'Get CourseContent by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch CourseContent' } );
    }
  },

  getByLessonId: async ( req: Request, res: Response ) => {
    try {
      const { lessonId } = req.params;
      if ( !lessonId ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const CourseContent = await courseContentService.getByLessonId( lessonId );
      if ( !CourseContent ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( CourseContent );
    } catch ( error ) {
      handleServiceError( error, 'Get CourseContent by Lesson ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch CourseContent' } );
    }
  },

  getByType: async ( req: Request, res: Response ) => {
    try {
      const CourseContents = await courseContentService.getByType( req.params.type as 'video' | 'pdf' | 'quiz' | 'assignment' | 'other' );
      return res.status( 200 ).json( CourseContents );
    } catch ( error ) {
      handleServiceError( error, 'Get CourseContents by Type' );
      return res.status( 500 ).json( { message: 'Failed to fetch CourseContents by Type' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const CourseContent = await courseContentService.create( req.body );
      return res.status( 201 ).json( CourseContent );
    } catch ( error ) {
      handleServiceError( error, 'Create CourseContent' );
      return res.status( 400 ).json( { message: 'Failed to create CourseContent' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'CourseContent ID is required' } );
      const CourseContent = await courseContentService.update( id, req.body );
      if ( !CourseContent ) return res.status( 404 ).json( { message: 'CourseContent not found' } );
      return res.status( 200 ).json( CourseContent );
    } catch ( error ) {
      handleServiceError( error, 'Update CourseContent' );
      return res.status( 400 ).json( { message: 'Failed to update CourseContent' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'CourseContent ID is required' } );
      await courseContentService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete CourseContent' );
      return res.status( 500 ).json( { message: 'Failed to delete CourseContent' } );
    }
  },

};