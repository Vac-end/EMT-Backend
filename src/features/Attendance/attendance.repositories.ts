import { Attendance } from '@interfaces/models';
import { AttendanceCreationAttributes } from './model/attendance.model';
import { WhereOptions, Op, Transaction } from 'sequelize';


export const AttendanceRepository = {
  findAll: ( options = {} ) =>
    Attendance.findAll( options ),

  findById: ( id: string ) =>
    Attendance.findByPk( id ),

  findByEnrollmentId: ( enrollmentId: string ) =>
    Attendance.findAll( { where: { enrollmentId }, } ),

  findByLessonId: ( lessonId: string ) =>
    Attendance.findAll( { where: { lessonId } } ),

  findByStatusEnrollment: ( enrollmentId: string, status: 'present' | 'absent' | 'late' ) =>
    Attendance.findAll( { where: { enrollmentId, status } } ),

  findByStatus: ( status: 'present' | 'absent' | 'late' ) =>
    Attendance.findAll( { where: { status } } ),

  create: ( data: AttendanceCreationAttributes ) =>
    Attendance.create( data ),

  update: async ( id: string, data: Partial<AttendanceCreationAttributes>, options: { transaction?: Transaction; } ) => {
    const [ affectedCount, affectedRows ] = await Attendance.update( data, { where: { id }, returning: true, transaction: options.transaction ?? null } );
    return [ affectedCount, affectedRows ];
  },
  updateMany: async ( data: Partial<AttendanceCreationAttributes>, options: { ids?: string[]; filter?: WhereOptions; transaction?: Transaction; } ) => {
    const where: WhereOptions = options.ids ? { id: { [ Op.in ]: options.ids } } : options.filter || {};
    const [ affectedCount, affectedRows ] = await Attendance.update( data, { where, returning: true, transaction: options.transaction ?? null } );
    return [ affectedCount, affectedRows ];
  },

  delete: ( id: string ) =>
    Attendance.destroy( { where: { id } } ),
};
