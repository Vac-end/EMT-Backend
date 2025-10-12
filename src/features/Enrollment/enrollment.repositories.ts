import { Enrollment } from '@interfaces/models';
import { EnrollmentCreationAttributes } from './model/enrollment.model';

export const enrollmentRepository = {
  findAll: ( options = {} ) =>
    Enrollment.findAll( options ),

  findById: ( id: string ) =>
    Enrollment.findByPk( id ),

  findByUserId: ( userId: string ) =>
    Enrollment.findAll( { where: { userId }, } ),

  findByCourseId: ( courseId: string, options: { role?: 'estudiante' | 'docente' | 'soporte' } = {} ) =>
    Enrollment.findAll( { where: { courseId, ...(options.role && { role: options.role}) } } ),

  findByRole: ( role: 'estudiante' | 'docente' | 'soporte' ) =>
    Enrollment.findAll( { where: { role } } ),

  create: ( data: EnrollmentCreationAttributes ) =>
    Enrollment.create( data ),

  update: ( id: string, data: Partial<EnrollmentCreationAttributes> ) =>
    Enrollment.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Enrollment.destroy( { where: { id } } ),
};
