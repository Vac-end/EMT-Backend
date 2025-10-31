import { handleServiceError } from '@utils/helpers';
import { submissionRepository } from './submission.repositories';
import { Submission, SubmissionCreationAttributes } from './model/submission.model';
import { Assignment, Enrollment, File, Group, sequelize, User } from '@interfaces/models';
import { uploadService } from '@features/upload/upload.service';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { FileCreationAttributes } from './model/File.model';

export const SubmissionService = {
  getAll: async () => {
    try {
      return await submissionRepository.findAll();
    } catch ( error ) {
      handleServiceError( error, 'Get All Submissions' );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      return await submissionRepository.findById( id, [
        { model: File, as: 'files', required: false },
        { model: Assignment, as: 'SubmissionAssignment' }
      ] );
    } catch ( error ) {
      handleServiceError( error, 'Get Submission By ID' );
      throw error;
    }
  },

  getByEnrollmentId: async ( enrollmentId: string ) => {
    try {
      return await submissionRepository.findByEnrollmentId( enrollmentId );
    } catch ( error ) {
      handleServiceError( error, 'Get Submissions By EnrollmentId' );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<SubmissionCreationAttributes> ) => {
    try {
      return await submissionRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, 'Update Submission' );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await submissionRepository.delete( id );
      if ( deleted === 0 ) throw new Error( 'Submission not found' );
      return deleted;
    } catch ( error ) {
      handleServiceError( error, 'Delete Submission' );
      throw error;
    }
  },

  getOrCreateDraft: async (enrollmentId: string, assignmentId: string, groupId: string | null) => {
    try {
      const assignment = await Assignment.findByPk(assignmentId, {
         include: [{ 
           model: File, 
           as: 'files', 
           required: false,
           where: { resourceType: 'assignment' }
         }]
      });
      if (!assignment) {
        throw new Error('Asignación no encontrada');
      }
      let submission: Submission | null = null;
      let group: Group | null = null;
      let submissionCount = 0;
      const maxAttempts = assignment.maxAttempts ?? 1;
      const whereQueryDraft: any = { assignmentId, status: 'draft' };
      const whereQuerySubmitted: any = { assignmentId, status: { [Op.not]: 'draft' } };
      if (assignment.isGroupAssignment && groupId) {
        whereQueryDraft.groupId = groupId;
        whereQuerySubmitted.groupId = groupId;
        group = await Group.findByPk(groupId, { 
          include: [{ 
            model: Enrollment, 
            as: 'GroupMembers',
            attributes: ['id', 'userId'],
            include: [{
              model: User,
              as: 'EnrolledUser',
              attributes: ['id', 'name', 'imagePerfilUrl']
            }]
          }]
        });
      } else {
        whereQueryDraft.enrollmentId = enrollmentId;
        whereQuerySubmitted.enrollmentId = enrollmentId;
      }
      submissionCount = await Submission.count({ where: whereQuerySubmitted });
      const canAttempt = maxAttempts === 0 || submissionCount < maxAttempts;
      if (canAttempt) {
        submission = await submissionRepository.findDraft(whereQueryDraft); 
        if (!submission) {
          const newSubmissionData: SubmissionCreationAttributes = {
            id: uuidv4(),
            enrollmentId,
            assignmentId,
            status: 'draft',
            grade: null,
            ...(groupId && assignment.isGroupAssignment && { groupId: groupId })
          };
          const newSubmission = await submissionRepository.create(newSubmissionData);
          submission = await submissionRepository.findById(newSubmission.id, [
            { model: File, as: 'files', required: false },
            { model: Assignment, as: 'SubmissionAssignment' }
          ]);
        }
      } else {
        submission = await Submission.findOne({
          where: whereQuerySubmitted,
          order: [['submittedAt', 'DESC']],
          include: [
            { model: File, as: 'files', required: false }
          ]
        });
      }
      const response = {
        assignment: assignment,
        submission: submission,
        submissionCount: submissionCount,
        group: group
      };
      return response;
    } catch (error) {
      handleServiceError(error, 'Get or Create Draft Submission');
      throw error;
    }
  },

  uploadFileToDraft: async ( submissionId: string, enrollmentId: string, file: Express.Multer.File ) => {
    const t = await sequelize.transaction();
    try {
      const submission = await submissionRepository.findById( submissionId );
      if ( !submission || submission.status !== 'draft' ) {
        throw new Error( 'Borrador no válido' );
      }
      if ( submission.enrollmentId !== enrollmentId && !submission.groupId ) {
        throw new Error( 'No autorizado' );
      }
      const destination = `submissions/${ submission.id }`;
      const [ uploadedFileData ] = await uploadService.uploadPublic( [ file ], destination );
      if ( !uploadedFileData ) {
        throw new Error( 'Falló la subida del archivo a R2' );
      }
      const fileToCreate: FileCreationAttributes = {
        id: uuidv4(),
        fileUrl: uploadedFileData.fileUrl,
        fileName: uploadedFileData.fileName,
        fileKey: uploadedFileData.fileKey,
        fileType: uploadedFileData.fileType,
        resourceId: submission.id,
        resourceType: 'submission',
      };
      const newFile = await File.create( fileToCreate, { transaction: t } );
      await t.commit();
      return newFile;
    } catch ( error ) {
      await t.rollback();
      handleServiceError( error, 'Upload File to Draft' );
      throw error;
    }
  },

  deleteFileFromDraft: async ( fileId: string, enrollmentId: string, groupId: string | null ) => {
    const t = await sequelize.transaction();
    try {
      const file = await submissionRepository.findFileById( fileId );
      if ( !file ) throw new Error( 'Archivo no encontrado' );
      const submission = await submissionRepository.findById( file.resourceId );
      if ( !submission || submission.status !== 'draft' ) {
        throw new Error( 'No se puede borrar un archivo de una entrega enviada' );
      }
      const isOwner = submission.enrollmentId === enrollmentId;
      const isGroupMember = submission.groupId !== null && submission.groupId === groupId;
      if ( !isOwner && !isGroupMember ) {
        throw new Error( 'No autorizado para borrar este archivo' );
      }
      await uploadService.deletePublicByKey( file.fileKey );
      await submissionRepository.deleteFileById( fileId, t );
      await t.commit();
      return { message: 'Archivo eliminado' };
    } catch ( error ) {
      await t.rollback();
      handleServiceError( error, 'Delete File from Draft' );
      throw error;
    }
  },

  submitDraft: async ( submissionId: string, enrollmentId: string, groupId: string | null, data: { textSubmission?: string; } ) => {
    try {
      const submission = await submissionRepository.findById( submissionId );
      if ( !submission ) {
        throw new Error( 'Entrega no encontrada' );
      }
      const isOwner = submission.enrollmentId === enrollmentId;
      const isGroupMember = submission.groupId !== null && submission.groupId === groupId;
      if ( !isOwner && !isGroupMember ) {
        throw new Error( 'No autorizado para enviar esta entrega' );
      }
      if ( submission.status !== 'draft' ) {
        throw new Error( 'Esta entrega ya ha sido enviada' );
      }
      const assignment = await Assignment.findByPk( submission.assignmentId, { attributes: [ 'maxAttempts', 'isGroupAssignment' ] } );
      const maxAttempts = assignment?.maxAttempts ?? 1;
      if ( maxAttempts > 0 ) {
        const countWhere: any = {
          assignmentId: submission.assignmentId,
          status: { [ Op.not ]: 'draft' }
        };
        if ( assignment?.isGroupAssignment && groupId ) {
          countWhere.groupId = groupId;
        } else {
          countWhere.enrollmentId = enrollmentId;
        }
        const currentSubmissionCount = await Submission.count( { where: countWhere } );
        if ( currentSubmissionCount >= maxAttempts ) {
          throw new Error( `Se ha alcanzado el límite de ${ maxAttempts } intentos.` );
        }
      }
      const updateData: Partial<SubmissionCreationAttributes> = {
        status: 'submitted',
        submittedAt: new Date(),
        enrollmentId: enrollmentId,
        ...( data.textSubmission && { textSubmission: data.textSubmission } )
      };
      await submissionRepository.update( submissionId, updateData );
      const finalSubmission = await submissionRepository.findById( submissionId, [
        { model: File, as: 'files', required: false }
      ] );

      if ( !finalSubmission ) {
        throw new Error( 'Falló la actualización de la entrega' );
      }
      return finalSubmission;
    } catch ( error ) {
      handleServiceError( error, 'Submit Draft' );
      throw error;
    }
  },

  saveDraft: async (submissionId: string, enrollmentId: string, data: { textSubmission?: string }) => {
    try {
      const submission = await submissionRepository.findById(submissionId);
      if (!submission) {
        throw new Error('Entrega no encontrada');
      }
      if (submission.enrollmentId !== enrollmentId && !submission.groupId) {
         throw new Error('No autorizado');
      }
      if (submission.status !== 'draft') {
        throw new Error('No se puede guardar un borrador en una entrega ya enviada');
      }
      const updateData: Partial<SubmissionCreationAttributes> = {};
      if (data.textSubmission !== undefined) {
        updateData.textSubmission = data.textSubmission;
      }
      await submissionRepository.update(submissionId, updateData);
      return { message: 'Borrador guardado' };
    } catch (error) {
      handleServiceError(error, 'Save Draft');
      throw error;
    }
  },

};
