import { Assignment } from '@interfaces/models';
import { AssignmentCreationAttributes } from './model/assignment.model';
import { CreateOptions, Includeable, Transaction } from 'sequelize';

export const assignmentRepository = {
  findAll: () => Assignment.findAll(),

  findById: ( id: string, include?: Includeable[] ) => {
    return Assignment.findByPk( id, include ? { include } : undefined );
  },

  findByLessonId: ( lessonId: string ) => Assignment.findAll( { where: { lessonId } } ),

  create: ( data: AssignmentCreationAttributes, options?: CreateOptions ) => Assignment.create( data, options ),

  update: ( id: string, data: Partial<AssignmentCreationAttributes>, options?: { transaction: Transaction; } ) =>
    Assignment.update( data, { where: { id }, ...options } ),

  delete: ( id: string, options?: { transaction: Transaction; } ) => Assignment.destroy( { where: { id }, ...options } ),
};