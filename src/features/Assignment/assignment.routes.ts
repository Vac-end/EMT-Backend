import { Router } from 'express';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { AssignmentController } from './assignment.controller';
import { AssignmentSchema } from './model/assignment.validation';
import { handleUploadArray } from '@middlewares/upload.middleware';

const router = Router();

router.get( '/:assignmentId/submission-details', authMiddleware, AssignmentController.getSubmissionDetails );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), handleUploadArray( 'files', 10 ), validate( AssignmentSchema ), AssignmentController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), handleUploadArray( 'files', 10 ), validate( AssignmentSchema.partial() ), AssignmentController.update );
router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), AssignmentController.getAll );
router.get( '/:id', authMiddleware, AssignmentController.getById );
router.get( '/lesson/:lessonId', authMiddleware, AssignmentController.getByLessonId );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), AssignmentController.delete );

export default router;
