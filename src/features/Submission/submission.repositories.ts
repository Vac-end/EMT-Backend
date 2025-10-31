import { Assignment, File, Submission } from '@interfaces/models';
import { SubmissionAttributes, SubmissionCreationAttributes } from './model/submission.model';
import { CreateOptions, FindOrCreateOptions, Includeable, Transaction } from 'sequelize';

export const submissionRepository = {
  findAll: () => Submission.findAll(),

  findById: ( id: string, include?: Includeable[] ) => Submission.findByPk( id, include ? { include }: undefined ),

  findByEnrollmentId: ( enrollmentId: string ) => Submission.findAll( { where: { enrollmentId } } ),

  findDraft: ( whereQuery: any ) => {
    return Submission.findOne( {
      where: whereQuery,
      include: [
        { model: File, as: 'files', required: false },
        { model: Assignment, as: 'SubmissionAssignment' }
      ]
    } );
  },

  findOrCreateDraft: ( options: FindOrCreateOptions<SubmissionAttributes, SubmissionCreationAttributes> ) => {
    return Submission.findOrCreate( options );
  },

  findFileById: ( fileId: string ) => {
    return File.findByPk( fileId );
  },

  deleteFileById: ( fileId: string, transaction: Transaction ) => {
    return File.destroy( { where: { id: fileId }, transaction } );
  },

  create: ( data: SubmissionCreationAttributes, options?: CreateOptions ) => Submission.create( data, options ),

  update: ( id: string, data: Partial<SubmissionCreationAttributes> ) =>
    Submission.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) => Submission.destroy( { where: { id } } ),
};
