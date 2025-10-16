import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { scheduleController } from './schedule.controller';
import { ScheduleSchema } from './model/schedule.validatos';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), scheduleController.getAll );
router.get( '/:id', authMiddleware, scheduleController.getById );
router.get( '/Lesson/:lessonId', authMiddleware, scheduleController.getByLessonId );
router.get( '/Course/:courseId', authMiddleware, scheduleController.getByCourseId );
router.get( '/startTime', authMiddleware, scheduleController.getByCourseId );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( ScheduleSchema ), scheduleController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( ScheduleSchema.partial() ), scheduleController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), scheduleController.delete );

export default router;