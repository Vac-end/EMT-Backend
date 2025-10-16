import { handleServiceError } from '@utils/helpers';
import { Request, Response } from 'express';
import { EnrollmentService } from './enrollment.service';


export const EnrollmentController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Enrollments = await EnrollmentService.getAll();
      return res.status( 200 ).json( Enrollments );
    } catch ( error ) {
      handleServiceError( error, 'Get All Enrollments' );
      return res.status( 500 ).json( { message: 'Failed to fetch Enrollments' } );
    }
  },
  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Enrollment ID is required' } );
      const enrollment = await EnrollmentService.getById( id );
      if ( !enrollment ) return res.status( 404 ).json( { message: 'Enrollment not found' } );
      return res.status( 200 ).json( enrollment );
    } catch ( error ) {
      handleServiceError( error, 'Get Enrollment by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Enrollment' } );
    }
  },

  getByUserId: async ( req: Request, res: Response ) => {
    try {
      const { userId } = req.params;
      if ( !userId ) return res.status( 400 ).json( { message: 'User ID is required' } );
      const enrollment = await EnrollmentService.getByUserId( userId );
      if ( !enrollment ) return res.status( 404 ).json( { message: 'User not found' } );
      return res.status( 200 ).json( enrollment );
    } catch ( error ) {
      handleServiceError( error, 'Get Enrollment by User ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Enrollment' } );
    }
  },

  getByCourseId: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const enrollment = await EnrollmentService.getByCourseId( courseId );
      if ( !enrollment ) return res.status( 404 ).json( { message: 'Course not found' } );
      return res.status( 200 ).json( enrollment );
    } catch ( error ) {
      handleServiceError( error, 'Get Enrollment by Course ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Enrollment' } );
    }
  },

  getCoursesByUserId: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ message: 'User ID is required' });
      const courses = await EnrollmentService.getCoursesByUserId(userId);
      return res.status(200).json(courses);
    } catch (error) {
      handleServiceError(error, 'Get Courses by User ID');
      return res.status(500).json({ message: 'Failed to fetch courses' });
    }
  },
  
  getByRole: async ( req: Request, res: Response ) => {
    try {
      const enrollments = await EnrollmentService.getByRole( req.params.role as 'estudiante' | 'docente' | 'soporte' );
      return res.status( 200 ).json( enrollments );
    } catch ( error ) {
      handleServiceError( error, 'Get enrollments by Role' );
      return res.status( 500 ).json( { message: 'Failed to fetch enrollments by role' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const enrollment = await EnrollmentService.create( req.body );
      return res.status( 201 ).json( enrollment );
    } catch ( error ) {
      handleServiceError( error, 'Create enrollment' );
      return res.status( 400 ).json( { message: 'Failed to create enrollment' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'enrollment ID is required' } );
      const enrollment = await EnrollmentService.update( id, req.body );
      if ( !enrollment ) return res.status( 404 ).json( { message: 'enrollment not found' } );
      return res.status( 200 ).json( enrollment );
    } catch ( error ) {
      handleServiceError( error, 'Update enrollment' );
      return res.status( 400 ).json( { message: 'Failed to update enrollment' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'enrollment ID is required' } );
      await EnrollmentService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete enrollment' );
      return res.status( 500 ).json( { message: 'Failed to delete enrollment' } );
    }
  },
};