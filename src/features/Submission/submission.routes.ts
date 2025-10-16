import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { SubmissionController } from './submission.controller';
import { SubmissionSchema } from './model/submission.validation';

const router = Router();

router.get('/', authMiddleware, roleMiddleware(['administrador']), SubmissionController.getAll);
router.get('/:id', authMiddleware, SubmissionController.getById);
router.get('/lesson/:lessonId', authMiddleware, SubmissionController.getByLessonId);
router.get('/enrollment/:enrollmentId', authMiddleware, SubmissionController.getByEnrollmentId);
router.post('/', authMiddleware, validate(SubmissionSchema), SubmissionController.create);
router.put('/:id', authMiddleware, validate(SubmissionSchema.partial()), SubmissionController.update);
router.delete('/:id', authMiddleware, SubmissionController.delete);

export default router;
