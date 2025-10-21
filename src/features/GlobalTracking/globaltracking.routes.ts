import { authMiddleware } from '@middlewares/auth.middleware';
import { validate } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { GlobalTrackingController } from './globaltracking.controller';
import { globalTrackingSchema } from './model/globaltracking.validation';

const router = Router();

router.get( '/course/:courseId/user/:userId', authMiddleware, GlobalTrackingController.getUserProgressInCourse );
router.get( '/course/:courseId/completion', authMiddleware, GlobalTrackingController.getLessonCompletionPercentage );
router.put( '/', authMiddleware, validate( globalTrackingSchema ), GlobalTrackingController.updateProgress );

export default router;