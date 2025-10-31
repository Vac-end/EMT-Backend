import { handleServiceError } from '@utils/helpers';
import { assignmentRepository } from './assignment.repositories';
import { Assignment, AssignmentCreationAttributes } from './model/assignment.model';
import { Enrollment, File, Group, Lesson, Module, Submission, User } from '@interfaces/models';
import { uploadService } from '@features/upload/upload.service';
import { sequelize } from '../../shared/config/db.config';
import { v4 as uuidv4 } from 'uuid';
import { FileCreationAttributes } from '@features/Submission/model/File.model';
import { Op } from 'sequelize';

export const AssignmentService = {
  getAll: async () => {
    try {
      const Assignments = await assignmentRepository.findAll();
      return Assignments;
    } catch ( error ) {
      handleServiceError( error, 'Get All Assignments' );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const assignment = await assignmentRepository.findById( id, [
        { model: File, as: 'files', required: false }
      ] );
      return assignment;
    } catch ( error ) {
      handleServiceError( error, 'Get By Id Assignment' );
      throw error;
    }
  },

  getByLessonId: async ( lessonId: string ) => {
    try {
      const Assignments = await assignmentRepository.findByLessonId( lessonId );
      return Assignments;
    } catch ( error ) {
      handleServiceError( error, 'Get By LessonId Assignment' );
      throw error;
    }
  },

  create: async ( data: AssignmentCreationAttributes, files: Express.Multer.File[] ) => {
    const t = await sequelize.transaction();
    try {
      const assignment = await assignmentRepository.create( data, { transaction: t } );
      if ( files && files.length > 0 ) {
        const destination = `assignments/${ assignment.id }`;
        const uploadedFilesData = await uploadService.uploadPublic( files, destination );

        if ( !uploadedFilesData || uploadedFilesData.length === 0 ) {
          throw new Error( 'Error al subir archivos adjuntos' );
        }
        const filesToCreate: FileCreationAttributes[] = uploadedFilesData.map( fileData => {
          return {
            id: uuidv4(),
            fileUrl: fileData.fileUrl,
            fileName: fileData.fileName,
            fileKey: fileData.fileKey,
            fileType: fileData.fileType,
            fileSize: fileData.fileSize,
            resourceId: assignment.id,
            resourceType: 'assignment',
          };
        } );
        await File.bulkCreate( filesToCreate, { transaction: t } );
      }
      await t.commit();
      const result = await Assignment.findByPk( assignment.id, {
        include: [ { model: File, as: 'files' } ]
      } );
      return result;
    } catch ( error ) {
      await t.rollback();
      handleServiceError( error, 'Create Assignment' );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<AssignmentCreationAttributes>, files?: Express.Multer.File[] ) => {
    const t = await sequelize.transaction();
    try {
      if ( files && files.length > 0 ) {
        const destination = `assignments/${ id }`;
        const oldFiles = await File.findAll( {
          where: { resourceId: id, resourceType: 'assignment' },
          transaction: t
        } );
        await Promise.all(
          oldFiles.map( file => uploadService.deletePublicByKey( file.fileKey ) )
        );
        await File.destroy( {
          where: { resourceId: id, resourceType: 'assignment' },
          transaction: t
        } );
        const uploadedFilesData = await uploadService.uploadPublic( files, destination );
        if ( !uploadedFilesData || uploadedFilesData.length === 0 ) {
          throw new Error( 'Error al subir los nuevos archivos adjuntos' );
        }
        const filesToCreate: FileCreationAttributes[] = uploadedFilesData.map( fileData => ( {
          id: uuidv4(),
          fileUrl: fileData.fileUrl,
          fileName: fileData.fileName,
          fileKey: fileData.fileKey,
          fileType: fileData.fileType,
          resourceId: id,
          resourceType: 'assignment',
        } ) );
        await File.bulkCreate( filesToCreate, { transaction: t } );
      }
      await assignmentRepository.update( id, data, { transaction: t } );
      await t.commit();
      return assignmentRepository.findById( id, [
        { model: File, as: 'files', required: false }
      ] );
    } catch ( error ) {
      await t.rollback();
      handleServiceError( error, 'Update Assignment' );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    const t = await sequelize.transaction();
    try {
      const filesToDelete = await File.findAll( {
        where: { resourceId: id, resourceType: 'assignment' },
        transaction: t
      } );
      if ( filesToDelete && filesToDelete.length > 0 ) {
        await Promise.all(
          filesToDelete.map( file => uploadService.deletePublicByKey( file.fileKey ) )
        );
        await File.destroy( {
          where: { resourceId: id, resourceType: 'assignment' },
          transaction: t
        } );
      }
      await Submission.destroy( {
        where: { assignmentId: id },
        transaction: t
      } );
      const deleted = await assignmentRepository.delete( id, { transaction: t } );
      if ( deleted === 0 ) throw new Error( 'Assignment not found' );
      await t.commit();
      return deleted;
    } catch ( error ) {
      await t.rollback();
      handleServiceError( error, 'Delete Assignment' );
      throw error;
    }
  },

  getAssignmentSubmissionDetails: async ( assignmentId: string, userId: string ) => {
    try {
      const assignment = await Assignment.findByPk( assignmentId, {
        include: [ {
          model: File,
          as: 'files',
          where: { resourceType: 'assignment' },
          required: false,
          attributes: [ 'id', 'fileUrl', 'fileName', 'fileType' ]
        } ]
      } );
      if ( !assignment ) {
        throw new Error( 'Assignment not found' );
      }
      const lesson = await Lesson.findByPk( assignment.lessonId, {
        include: [ { model: Module, as: 'LessonModule', attributes: [ 'courseId' ] } ]
      } );
      const courseId = ( lesson as any )?.LessonModule?.courseId;
      if ( !courseId ) {
        throw new Error( 'Could not determine the course for this assignment.' );
      }
      const enrollment = await Enrollment.findOne( {
        where: { courseId, userId },
        attributes: [ 'id', 'groupId' ]
      } );
      if ( !enrollment ) {
        throw new Error( 'Forbidden: User is not enrolled in the course for this assignment.' );
      }
      const enrollmentId = enrollment.id;
      const userGroupId = enrollment.groupId;
      const whereQuery: any = {
        assignmentId: assignmentId,
        [ Op.or ]: [ { enrollmentId: enrollmentId } ]
      };
      if ( assignment.isGroupAssignment && userGroupId ) {
        whereQuery[ Op.or ].push( { groupId: userGroupId } );
      }
      const submission = await Submission.findOne( {
        where: whereQuery,
        order: [ [ 'status', 'DESC' ], [ 'submittedAt', 'DESC' ] ],
        include: [ {
          model: File,
          as: 'files',
          where: { resourceType: 'submission' },
          required: false,
          attributes: [ 'id', 'fileUrl', 'fileName', 'fileType' ]
        } ]
      } );
      const countWhere: any = {
        assignmentId: assignmentId,
        status: { [ Op.not ]: 'draft' }
      };
      if ( assignment.isGroupAssignment && userGroupId ) {
        countWhere.groupId = userGroupId;
      } else {
        countWhere.enrollmentId = enrollmentId;
      }
      const submissionCount = await Submission.count( { where: countWhere } );
      let groupDetails = null;
      if ( assignment.isGroupAssignment && userGroupId ) {
        const group = await Group.findByPk( userGroupId, {
          include: [ {
            model: Enrollment,
            as: 'GroupMembers',
            attributes: [ 'userId' ],
            include: [ {
              model: User,
              as: 'EnrolledUser',
              attributes: [ 'id', 'name', 'imagePerfilUrl' ]
            } ]
          } ]
        } );
        if ( group ) {
          const members = ( group as any ).GroupMembers?.map( ( gm: any ) => gm.EnrolledUser ).filter( Boolean ) ?? [];
          groupDetails = {
            id: group.id,
            name: group.name,
            members: members
          };
        }
      }
      return {
        assignment: {
          id: assignment.id,
          tittle: assignment.tittle,
          description: assignment.description,
          dueDate: assignment.dueDate,
          maxScore: assignment.maxScore,
          files: ( assignment as any ).files,
          isGroupAssignment: assignment.isGroupAssignment,
          maxAttempts: assignment.maxAttempts ?? 1
        },
        submission: submission ? {
          id: submission.id,
          grade: submission.grade !== null ? parseFloat( submission.grade.toString() ) : null,
          feedback: submission.feedback,
          files: ( submission as any ).files,
          textSubmission: submission.textSubmission,
          submittedAt: submission.submittedAt,
          status: submission.status
        } : null,
        group: groupDetails,
        submissionCount: submissionCount
      };
    } catch ( error ) {
      handleServiceError( error, 'Get Assignment Submission Details' );
      throw error;
    }
  },

};