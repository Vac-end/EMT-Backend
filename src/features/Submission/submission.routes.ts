import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { SubmissionController } from './submission.controller';
import { handleUploadSingle } from '@middlewares/upload.middleware';
import { validate } from '@middlewares/validation.middleware';
import { DeleteFileSchema, SubmitDraftSchema, UploadFileSchema } from './model/submission.validation';

const router = Router();

router.get( '/draft/assignment/:assignmentId', authMiddleware, SubmissionController.getDraft );
router.post( '/upload-file', authMiddleware, handleUploadSingle( 'file' ), validate( UploadFileSchema ), SubmissionController.uploadFile );
router.delete( '/file/:fileId', authMiddleware, validate( DeleteFileSchema ), SubmissionController.deleteFile );
router.put( '/:submissionId/submit', authMiddleware, validate( SubmitDraftSchema ), SubmissionController.submitDraft );
router.put( '/:submissionId/save-draft', authMiddleware, SubmissionController.saveDraft );
router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), SubmissionController.getAll );
router.get( '/:id', authMiddleware, SubmissionController.getById );
router.get( '/enrollment/:enrollmentId', authMiddleware, SubmissionController.getByEnrollmentId );
router.put( '/:id', authMiddleware, validate( SubmitDraftSchema ), SubmissionController.update );
router.delete( '/:id', authMiddleware, SubmissionController.delete );

export default router;
