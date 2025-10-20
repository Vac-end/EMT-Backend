import { handleServiceError } from '@utils/helpers';
import { Request, Response } from 'express';
import { courseService } from './course.service';

export const CourseController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Courses = await courseService.getAll();
      return res.status( 200 ).json( Courses );
    } catch ( error ) {
      handleServiceError( error, 'Get All Courses' );
      return res.status( 500 ).json( { message: 'Failed to fetch Courses' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const Course = await courseService.getById( id );
      if ( !Course ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( Course );
    } catch ( error ) {
      handleServiceError( error, 'Get Course by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Course' } );
    }
  },

  getAdminDashboard: async ( req: Request, res: Response ) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 9;
      const result = await courseService.getAdminDashboard(page, limit);
      return res.status(200).json(result);
    } catch ( error ) {
      handleServiceError( error, 'Get Admin Dashboard' );
      return res.status( 500 ).json( { message: 'Failed to fetch admin dashboard courses' } );
    }
  },

  getByCreatedId: async ( req: Request, res: Response ) => {
    try {
      const { createdBy } = req.params;
      if ( !createdBy ) return res.status( 400 ).json( { message: 'CreatedBy ID is required' } );
      const Course = await courseService.getByCreatedId( createdBy );
      if ( !Course ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( Course );
    } catch ( error ) {
      handleServiceError( error, 'Get Course by CreatedBy ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Course' } );
    }
  },

  getByAcademicLevelId: async ( req: Request, res: Response ) => {
    try {
      const { academiclevelId } = req.params;
      if ( !academiclevelId ) return res.status( 400 ).json( { message: 'AcademicLevel ID is required' } );
      const Course = await courseService.getByAcademicLevelId( academiclevelId );
      if ( !Course ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( Course );
    } catch ( error ) {
      handleServiceError( error, 'Get Course by AcademicLevel ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Course' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const Course = await courseService.create( req.body );
      return res.status( 201 ).json( Course );
    } catch ( error ) {
      handleServiceError( error, 'Create Course' );
      return res.status( 400 ).json( { message: 'Failed to create Course' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const Course = await courseService.update( id, req.body );
      if ( !Course ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( Course );
    } catch ( error ) {
      handleServiceError( error, 'Update Course' );
      return res.status( 400 ).json( { message: 'Failed to update Course' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      await courseService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Course' );
      return res.status( 500 ).json( { message: 'Failed to delete Course' } );
    }
  },
};