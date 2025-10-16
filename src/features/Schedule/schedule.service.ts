import { handleServiceError } from '@utils/helpers';
import { ScheduleRepository } from './schedule.repositories';
import { ScheduleCreationAttributes } from './model/schedule.model';

export const ScheduleService = {

  getAll: async () => {
    try {
      return await ScheduleRepository.findAll();
    } catch ( error ) {
      handleServiceError( error, " Get All Schedule" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      return await ScheduleRepository.findById( id );
    } catch ( error ) {
      handleServiceError( error, "Get By Id Schedule" );
      throw error;
    }
  },

  getByLessonId: async ( lessonId: string ) => {
    try {
      return await ScheduleRepository.findByLessonId( lessonId );
    } catch ( error ) {
      handleServiceError( error, "Get By Lesson Id Schedule" );
      throw error;
    }
  },

  getByCourseId: async ( courseId: string ) => {
    try {
      return await ScheduleRepository.findByCourseId( courseId );
    } catch ( error ) {
      handleServiceError( error, "Get By CourseId Schedule" );
      throw error;
    }
  },

  getByStartTime: async ( startTime: string ) => {
    try {
      return await ScheduleRepository.findByStartTime( startTime );
    } catch ( error ) {
      handleServiceError( error, "Get By StarTime Schedule" );
      throw error;
    }
  },

  create: async ( data: ScheduleCreationAttributes ) => {
    try {
      const existingSchedule = await ScheduleRepository.findByLessonId( data.lessonId );
      if ( existingSchedule ) {
        throw new Error( 'A schedule already exists for this lesson.' );
      }
      return await ScheduleRepository.create( { ...data } );
    } catch ( error ) {
      handleServiceError( error, "Create Schedule" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<ScheduleCreationAttributes> ) => {
    try {
      return await ScheduleRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update Schedule" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await ScheduleRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Schedule not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Schedule" );
      throw error;
    }
  },
};