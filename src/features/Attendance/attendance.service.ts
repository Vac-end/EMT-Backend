import { handleServiceError } from '@utils/helpers';
import { AttendanceRepository } from './attendance.repositories';
import { enrollmentRepository } from '@features/Enrollment/enrollment.repositories';
import { Attendance, AttendanceCreationAttributes } from './model/attendance.model';
import { sequelize } from '@config/db.config';
import { Op, UniqueConstraintError, WhereOptions } from 'sequelize';
import { validateAttendancePayload, validateBusinessRules, validateCreateAttendanceForLesson, validateUpdateOptions } from './model/attendance.validation';

export const attendanceService = {
  getAll: async () => {
    try {
      return await AttendanceRepository.findAll();
    } catch ( error ) {
      handleServiceError( error, "Get All Attendances" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      return await AttendanceRepository.findById( id );
    } catch ( error ) {
      handleServiceError( error, "Get By Id Attendance" );
      return error;
    }
  },

  getByEnrollmentId: async ( enrollmentId: string ) => {
    try {
      return await AttendanceRepository.findByEnrollmentId( enrollmentId );
    } catch ( error ) {
      handleServiceError( error, "Get By Enrollment Id Attendance" );
      throw error;
    }
  },

  getByLessonId: async ( lessonId: string ) => {
    try {
      return await AttendanceRepository.findByLessonId( lessonId );
    } catch ( error ) {
      handleServiceError( error, "Get By Course Id Attendance" );
      throw error;
    }
  },

  getByStatusEnrollment: async ( enrollmentId: string, status: 'present' | 'absent' | 'late' ) => {
    try {
      if ( !enrollmentId || ![ 'present', 'absent', 'late' ].includes( status ) ) { throw new Error( 'The provided Enrollment or Status is not valid.' ); }
      const enrollment = await enrollmentRepository.findById( enrollmentId );
      if ( !enrollment ) {
        throw new Error( 'El enrollmentId proporcionado no existe.' );
      }
      const Attendances = await AttendanceRepository.findByStatusEnrollment( enrollmentId, status );
      if ( !Attendances || Attendances.length === 0 ) { throw new Error( `No attendances were found for enrollmentId ${ enrollmentId } with status ${ status }.` ); }
      return Attendances;
    } catch ( error ) {
      handleServiceError( error, "Get By Status|Enrollment Attendance" );
      throw error;
    }
  },

  getByStatus: async ( status: 'present' | 'absent' | 'late' ) => {
    try {
      return await AttendanceRepository.findByStatus( status );
    } catch ( error ) {
      handleServiceError( error, "Get By Status Attendace" );
      throw error;
    }
  },

  createAttendanceForLesson: async ( lessonId: string ) => {
    try {
      const { enrollments } = await validateCreateAttendanceForLesson( lessonId );

      const attendanceData: AttendanceCreationAttributes[] = enrollments.map( ( e ) => ( {
        enrollmentId: e.id,
        lessonId,
        status: 'absent',
      } ) );

      return await sequelize.transaction( async ( t ) =>
        Attendance.bulkCreate( attendanceData, { validate: true, transaction: t } )
      );
    } catch ( error ) {
      if ( error instanceof UniqueConstraintError ) {
        handleServiceError( error, 'Create Attendance for Lesson' );
        throw new Error( 'An attendance record already exists for this enrollmentId and lessonId.' );
      }
      handleServiceError( error, 'Create Attendance for Lesson' );
      throw error;
    }
  },

  update: async ( id?: string, data: Partial<AttendanceCreationAttributes> = {}, options: { ids?: string[]; filter?: WhereOptions; } = {} ) => {
    try {
      validateUpdateOptions( id, options.ids, options.filter );
      validateAttendancePayload( data );
      let where: WhereOptions = {};
      if ( id ) where.id = id;
      else if ( options.ids ) where.id = { [ Op.in ]: options.ids };
      else if ( options.filter ) where = options.filter;
      const attendances = await AttendanceRepository.findAll( { where } );
      await validateBusinessRules( attendances, data );
      await sequelize.transaction( async ( t ) => {
        if ( id ) await AttendanceRepository.update( id, data, { transaction: t } );
        else await AttendanceRepository.updateMany( data, { filter: where, transaction: t } );
      } );
      const updatedAttendances = await AttendanceRepository.findAll( { where } );
      return updatedAttendances.map( ( a ) => a.get( { plain: true } ) );
    } catch ( error ) {
      handleServiceError( error, 'Update Attendance' );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      if ( !id ) {
        throw new Error( 'The attendance ID is required.' );
      }
      const deleted = await AttendanceRepository.delete( id );
      if ( deleted === 0 ) {
        throw new Error( 'No attendance record found with the provided ID.' );
      }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, 'Delete Attendance' );
      throw error;
    }
  },

};