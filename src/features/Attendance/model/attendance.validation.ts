import z from 'zod';
import { Op, WhereOptions } from 'sequelize';
import { AttendanceCreationAttributes } from './attendance.model';
import { AttendanceRepository } from '../attendance.repositories';
import { ScheduleRepository } from '@features/Schedule/schedule.repositories';
import { lessonRepository } from '@features/Lesson/lesson.repositories';
import { enrollmentRepository } from '@features/Enrollment/enrollment.repositories';

export const AttendanceSchema = z.object( {
  enrollmentId: z.string(),
  lessonId: z.string(),
  status: z.enum( [ 'present', 'absent', 'late' ] ).default( 'absent' ),
} );

export const validateAttendancePayload = ( data: Partial<AttendanceCreationAttributes> ) => {
  if ( !data ) throw new Error( 'No se proporcionaron datos para actualizar.' );
  if ( data.status && ![ 'present', 'absent', 'late' ].includes( data.status ) ) {
    throw new Error( 'El status debe ser "present", "absent" o "late".' );
  }
  if ( data.enrollmentId && typeof data.enrollmentId !== 'string' ) {
    throw new Error( 'El enrollmentId debe ser una cadena válida.' );
  }
  if ( data.lessonId && typeof data.lessonId !== 'string' ) {
    throw new Error( 'El lessonId debe ser una cadena válida.' );
  }
};

export const validateUpdateOptions = ( id?: string, ids?: string[], filter?: WhereOptions ) => {
  if ( id && ( ids || filter ) ) throw new Error( 'No se puede proporcionar un ID junto con ids o filter.' );
  if ( !id && !ids && !filter ) throw new Error( 'Se requiere un ID, una lista de IDs o un filtro.' );
  if ( ids && ( !Array.isArray( ids ) || ids.length === 0 ) ) throw new Error( 'El campo ids debe ser un array no vacío.' );
  if ( filter && Object.keys( filter ).length === 0 ) throw new Error( 'El filtro no puede estar vacío.' );
};

export const validateBusinessRules = async (
  attendances: any[],
  data: Partial<AttendanceCreationAttributes>
) => {
  if ( !attendances || attendances.length === 0 )
    throw new Error( 'No se encontraron asistencias para actualizar con los criterios proporcionados.' );
  const enrollmentIds = [ ...new Set( attendances.map( ( a ) => a.enrollmentId ) ) ];
  const enrollments = await enrollmentRepository.findAll( {
    where: { id: { [ Op.in ]: enrollmentIds } },
  } );
  for ( const enrollment of enrollments ) {
    if ( enrollment.role !== 'estudiante' ) {
      throw new Error( `La asistencia con enrollmentId ${ enrollment.id } no pertenece a un estudiante.` );
    }
  }
  if ( data.enrollmentId ) {
    const newEnrollment = await enrollmentRepository.findById( data.enrollmentId );
    if ( !newEnrollment ) throw new Error( 'El enrollmentId proporcionado no existe.' );
    if ( newEnrollment.role !== 'estudiante' )
      throw new Error( 'El enrollmentId proporcionado no pertenece a un estudiante.' );
  }
  if ( data.lessonId ) {
    const lesson = await lessonRepository.findById( data.lessonId );
    if ( !lesson ) throw new Error( 'El lessonId proporcionado no existe.' );
    const schedules = await ScheduleRepository.findByLessonId( data.lessonId );
    if ( !schedules || schedules.length === 0 )
      throw new Error( 'No se encontró un horario para la lección proporcionada.' );
    if ( schedules.length > 1 )
      throw new Error( 'Múltiples horarios encontrados para la lección. Solo se permite uno por lección.' );
  }
  if ( data.enrollmentId || data.lessonId ) {
    for ( const attendance of attendances ) {
      const existingAttendance = await AttendanceRepository.findAll( {
        where: {
          enrollmentId: data.enrollmentId || attendance.enrollmentId,
          lessonId: data.lessonId || attendance.lessonId,
          id: { [ Op.ne ]: attendance.id },
        },
      } );
      if ( existingAttendance.length > 0 ) {
        throw new Error(
          `Ya existe una asistencia para enrollmentId ${ data.enrollmentId || attendance.enrollmentId
          } y lessonId ${ data.lessonId || attendance.lessonId }.`
        );
      }
    }
  }
};

export const validateGetByStatusEnrollment = ( enrollmentId?: string, status?: string ) => {
  if ( !enrollmentId || !status )
    throw new Error( 'El enrollmentId y el status son requeridos.' );

  if ( typeof enrollmentId !== 'string' || enrollmentId.trim() === '' )
    throw new Error( 'El enrollmentId no puede estar vacío.' );

  if ( typeof status !== 'string' || ![ 'present', 'absent', 'late' ].includes( status ) )
    throw new Error( 'El status debe ser "present", "absent" o "late".' );
};

export const validateLessonId = ( lessonId?: string ) => {
  if ( !lessonId ) throw new Error( 'El lessonId es requerido.' );
};

export const validateCreateAttendanceForLesson = async (lessonId: string) => {
  if (!lessonId) throw new Error('El lessonId es requerido.');

  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('El lessonId proporcionado no existe.');

  const schedules = await ScheduleRepository.findByLessonId(lessonId);
  if (!schedules?.length) throw new Error('No se encontró un horario para esta lección.');
  if (schedules.length > 1)
    throw new Error('Múltiples horarios encontrados. Solo se permite uno por lección.');

  const schedule = schedules[0];
  if (!schedule?.courseId) throw new Error('El horario no está asociado a un curso.');
  if (schedule.endTime < new Date())
    throw new Error('No se puede crear asistencia para clases pasadas.');

  const enrollments = await enrollmentRepository.findByCourseId(schedule.courseId, {
    role: 'estudiante',
  });
  if (!enrollments?.length)
    throw new Error('No hay estudiantes inscritos en el curso asociado.');

  const existing = await AttendanceRepository.findAll({
    where: { lessonId, enrollmentId: enrollments.map((e) => e.id) },
  });
  if (existing.length) throw new Error('Ya existen asistencias para esta lección.');

  return { schedule, enrollments };
};
