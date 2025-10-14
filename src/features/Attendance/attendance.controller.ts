import { Request, Response } from 'express';
import { attendanceService } from './attendance.service';
import { handleServiceError } from '@utils/helpers';
import { WhereOptions } from 'sequelize';
import { validateAttendancePayload, validateUpdateOptions } from './model/attendance.validation';

export const AttendanceController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Attendances = await attendanceService.getAll();
      return res.status( 200 ).json( Attendances );
    } catch ( error ) {
      handleServiceError( error, 'Get All Attendances' );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendances' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Attendance ID is required' } );
      const Attendance = await attendanceService.getById( id );
      if ( !Attendance ) return res.status( 404 ).json( { message: 'Attendance not found' } );
      return res.status( 200 ).json( Attendance );
    } catch ( error ) {
      handleServiceError( error, 'Get Attendance by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendance' } );
    }
  },

  getByEnrollmentId: async ( req: Request, res: Response ) => {
    try {
      const { enrollmentId } = req.params;
      if ( !enrollmentId ) return res.status( 400 ).json( { message: 'Enrollment ID is required' } );
      const Attendance = await attendanceService.getByEnrollmentId( enrollmentId );
      if ( !Attendance ) return res.status( 404 ).json( { message: 'Attendance not found' } );
      return res.status( 200 ).json( Attendance );
    } catch ( error ) {
      handleServiceError( error, 'Get Attendance by Enrollment ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendance' } );
    }
  },

  getByLessonId: async ( req: Request, res: Response ) => {
    try {
      const { lessonId } = req.params;
      if ( !lessonId ) return res.status( 400 ).json( { message: 'Lesson ID is required' } );
      const Attendance = await attendanceService.getByLessonId( lessonId );
      if ( !Attendance ) return res.status( 404 ).json( { message: 'Attendance not found' } );
      return res.status( 200 ).json( Attendance );
    } catch ( error ) {
      handleServiceError( error, 'Get Attendance by Lesson ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendance' } );
    }
  },

  getByStatus: async ( req: Request, res: Response ) => {
    try {
      const { status } = req.params;
      if ( !status ) return res.status( 400 ).json( { message: 'status is required' } );
      const Attendance = await attendanceService.getByStatus( status as 'present' | 'absent' | 'late' );
      if ( !Attendance ) return res.status( 404 ).json( { message: 'Attendance not found' } );
      return res.status( 200 ).json( Attendance );
    } catch ( error ) {
      handleServiceError( error, 'Get Attendance by status' );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendance' } );
    }
  },

  getByStatusEnrollment: async ( req: Request, res: Response ) => {
    try {
      const { enrollmentId, status } = req.query;
      if ( !enrollmentId || !status ) {
        throw new Error( 'El enrollmentId y el status son requeridos.' );
      }
      if ( !enrollmentId || typeof enrollmentId !== 'string' || enrollmentId.trim() === '' ||
        !status || typeof status !== 'string' || status.trim() === '' ) {
        throw new Error( 'El enrollmentId y el status son requeridos y no pueden estar vacíos.' );
      }
      if ( ![ 'present', 'absent', 'late' ].includes( status as string ) ) {
        throw new Error( 'El status debe ser "present", "absent" o "late".' );
      }
      const attendances = await attendanceService.getByStatusEnrollment( enrollmentId as string, status as 'present' | 'absent' | 'late' );
      return res.status( 200 ).json( { message: 'Asistencias encontradas', data: attendances, count: attendances.length } );
    } catch ( error ) {
      handleServiceError( error, " Get Status|Enrollment Filter" );
      return res.status( 500 ).json( { message: 'Failed to fetch Attendances by Status|Enrollment' } );
    }
  },

  createForLesson: async ( req: Request, res: Response ) => {
    try {
      const { lessonId } = req.body;
      if ( !lessonId ) {
        throw new Error( 'El lessonId es requerido en el cuerpo de la solicitud.' );
      }
      const Attendances = await attendanceService.createAttendanceForLesson( lessonId );
      if ( !Attendances ) return res.status( 404 ).json( { message: 'Lesson not found' } );
      return res.status( 201 ).json( Attendances );
    } catch ( error ) {
      handleServiceError( error, "CreateForLesson Attendence" );
      return res.status( 500 ).json( { message: 'Failed to CreateForLesson Attendence' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      const { ids, filter, ...data } = req.body;
      validateUpdateOptions( id, ids, filter );
      validateAttendancePayload( data );
      const updateOptions: { ids?: string[]; filter?: WhereOptions; } = {};
      if ( ids ) updateOptions.ids = ids;
      if ( filter ) updateOptions.filter = filter;
      const updatedAttendances = await attendanceService.update( id, data, updateOptions );
      return res.status( 200 ).json( {
        message: id
          ? 'Asistencia actualizada exitosamente'
          : 'Asistencias actualizadas exitosamente',
        data: id ? updatedAttendances[ 0 ] || null : updatedAttendances,
        count: updatedAttendances.length,
      } );
    } catch ( error ) {
      handleServiceError( error, 'Update Attendance' );
      return res.status( 400 ).json( { message: 'Failed to update Attendance' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Attendance ID is required' } );
      await attendanceService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Attendance' );
      return res.status( 500 ).json( { message: 'Failed to delete Attendance' } );
    }
  },

};