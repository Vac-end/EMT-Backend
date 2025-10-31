import { Request, Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { SubmissionService } from './submission.service';
import { getSubmissionContext } from './model/submission.validation';

export const SubmissionController = {
  getDraft: async ( req: Request, res: Response ) => {
    try {
      const { assignmentId } = req.params;
      if (!assignmentId) {
        return res.status(400).json({ message: 'assignmentId es requerido en los parámetros' });
      }
      const { enrollmentId, groupId } = await getSubmissionContext( req, assignmentId );
      const data = await SubmissionService.getOrCreateDraft( enrollmentId, assignmentId, groupId );
      return res.status( 200 ).json( data );
    } catch ( error: any ) {
      handleServiceError( error, 'Get Draft Submission' );
      if ( error.message.includes( 'Usuario no inscrito' ) ) {
        return res.status( 403 ).json( { message: error.message } );
      }
      return res.status( 500 ).json( { message: 'Failed to fetch draft' } );
    }
  },

  uploadFile: async ( req: Request, res: Response ) => {
    try {
      const { submissionId, assignmentId } = req.body;
      const file = req.file;
      if ( !file ) {
        return res.status( 400 ).json( { message: 'No se ha subido ningún archivo' } );
      }
      if ( !submissionId || !assignmentId ) {
        return res.status( 400 ).json( { message: 'submissionId y assignmentId son requeridos en el body' } );
      }
      const { enrollmentId } = await getSubmissionContext( req, assignmentId );
      const newFile = await SubmissionService.uploadFileToDraft( submissionId, enrollmentId, file );
      return res.status( 201 ).json( newFile );
    } catch ( error ) {
      handleServiceError( error, 'Upload File' );
      return res.status( 400 ).json( { message: 'Failed to upload file' } );
    }
  },

  deleteFile: async ( req: Request, res: Response ) => {
    try {
      const { fileId } = req.params;
      const { assignmentId } = req.body;
      if ( !fileId || !assignmentId ) {
        return res.status( 400 ).json( { message: 'fileId (param) y assignmentId (body) son requeridos' } );
      }
      const { enrollmentId, groupId } = await getSubmissionContext( req, assignmentId );
      await SubmissionService.deleteFileFromDraft( fileId, enrollmentId, groupId );
      return res.status( 200 ).json( { message: 'Archivo eliminado' } );
    } catch ( error: any ) {
      handleServiceError( error, 'Delete File' );
      return res.status( 400 ).json( { message: error.message || 'Failed to delete file' } );
    }
  },

  submitDraft: async ( req: Request, res: Response ) => {
    try {
      const { submissionId } = req.params;
      const { textSubmission, assignmentId } = req.body;
      if (!submissionId) {
         return res.status(400).json({ message: 'submissionId es requerido en los parámetros' });
      }
      if (!assignmentId) {
         return res.status(400).json({ message: 'assignmentId es requerido en el body' });
      }
      const { enrollmentId, groupId } = await getSubmissionContext( req, assignmentId );
      const submission = await SubmissionService.submitDraft( submissionId, enrollmentId, groupId, { textSubmission } );
      return res.status( 200 ).json( submission );
    } catch ( error: any ) {
      handleServiceError( error, 'Submit Draft' );
      return res.status( 400 ).json( { message: error.message || 'Failed to submit draft' } );
    }
  },

  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Submissions = await SubmissionService.getAll();
      return res.status( 200 ).json( Submissions );
    } catch ( error ) {
      handleServiceError( error, 'Get All Submissions' );
      return res.status( 500 ).json( { message: 'Failed to fetch submissions' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Submission ID is required' } );
      const Submission = await SubmissionService.getById( id );
      if ( !Submission ) return res.status( 404 ).json( { message: 'Submission not found' } );
      return res.status( 200 ).json( Submission );
    } catch ( error ) {
      handleServiceError( error, 'Get Submission by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch submission' } );
    }
  },

  getByEnrollmentId: async ( req: Request, res: Response ) => {
    try {
      const { enrollmentId } = req.params;
      if ( !enrollmentId ) return res.status( 400 ).json( { message: 'Enrollment ID is required' } );
      const Submissions = await SubmissionService.getByEnrollmentId( enrollmentId );
      return res.status( 200 ).json( Submissions );
    } catch ( error ) {
      handleServiceError( error, 'Get Submissions by Enrollment' );
      return res.status( 500 ).json( { message: 'Failed to fetch submissions' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Submission ID is required' } );
      const Submission = await SubmissionService.update( id, req.body );
      return res.status( 200 ).json( Submission );
    } catch ( error ) {
      handleServiceError( error, 'Update Submission' );
      return res.status( 400 ).json( { message: 'Failed to update submission' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Submission ID is required' } );
      await SubmissionService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Submission' );
      return res.status( 500 ).json( { message: 'Failed to delete submission' } );
    }
  },
  
  saveDraft: async ( req: Request, res: Response ) => {
    try {
      const { submissionId } = req.params;
      const { textSubmission, assignmentId } = req.body;
      if ( !submissionId ) {
        return res.status( 400 ).json( { message: 'submissionId es requerido en los parámetros' } );
      }
      if ( !assignmentId ) {
        return res.status( 400 ).json( { message: 'assignmentId es requerido en el body' } );
      }
      const { enrollmentId } = await getSubmissionContext( req, assignmentId );
      const result = await SubmissionService.saveDraft( submissionId, enrollmentId, { textSubmission } );
      return res.status( 200 ).json( result );
    } catch ( error: any ) {
      handleServiceError( error, 'Save Draft' );
      return res.status( 400 ).json( { message: error.message || 'Failed to save draft' } );
    }
  },

};