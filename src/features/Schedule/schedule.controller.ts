import { Request, Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { ScheduleService } from './schedule.service';

export const scheduleController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Schedules = await ScheduleService.getAll();
      return res.status( 200 ).json( Schedules );
    } catch ( error ) {
      handleServiceError( error, 'Get All Schedules' );
      return res.status( 500 ).json( { message: 'Failed to fetch Schedules' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Schedule ID is required' } );
      const Schedule = await ScheduleService.getById( id );
      if ( !Schedule ) return res.status( 404 ).json( { message: 'Schedule not found' } );
      return res.status( 200 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Get Schedule by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Schedule' } );
    }
  },

  getByLessonId: async ( req: Request, res: Response ) => {
    try {
      const { lessonId } = req.params;
      if ( !lessonId ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const Schedule = await ScheduleService.getByLessonId( lessonId );
      if ( !Schedule ) return res.status( 404 ).json( { message: 'Schedule not found' } );
      return res.status( 200 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Get Schedule by Lesson ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Schedule' } );
    }
  },

  getByCourseId: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const Schedule = await ScheduleService.getByCourseId( courseId );
      if ( !Schedule ) return res.status( 404 ).json( { message: 'Schedule not found' } );
      return res.status( 200 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Get Schedule by Course ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Schedule' } );
    }
  },

  getByStatus: async ( req: Request, res: Response ) => {
    try {
      const { startTime } = req.body;
      if ( !startTime ) return res.status( 400 ).json( { message: 'startTime is required' } );
      const Schedule = await ScheduleService.getByStartTime( startTime );
      if ( !Schedule ) return res.status( 404 ).json( { message: 'Schedule not found' } );
      return res.status( 200 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Get Schedule by startTime' );
      return res.status( 500 ).json( { message: 'Failed to fetch Schedule' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const Schedule = await ScheduleService.create( req.body );
      return res.status( 201 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Create Schedule' );
      return res.status( 400 ).json( { message: 'Failed to create Schedule' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Schedule ID is required' } );
      const Schedule = await ScheduleService.update( id, req.body );
      if ( !Schedule ) return res.status( 404 ).json( { message: 'Schedule not found' } );
      return res.status( 200 ).json( Schedule );
    } catch ( error ) {
      handleServiceError( error, 'Update Schedule' );
      return res.status( 400 ).json( { message: 'Failed to update Schedule' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Schedule ID is required' } );
      await ScheduleService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Schedule' );
      return res.status( 500 ).json( { message: 'Failed to delete Schedule' } );
    }
  },
};