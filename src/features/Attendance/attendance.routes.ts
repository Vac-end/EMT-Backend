import { authMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { AttendanceController } from './attendance.controller';
import { roleMiddleware } from '@middlewares/role.middleware';

const router = Router();
router.get( '/List', authMiddleware, AttendanceController.getByStatusEnrollment );
router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), AttendanceController.getAll );
router.get( '/:id', authMiddleware, AttendanceController.getById );
router.get( '/Enrollment/:enrollmentId', authMiddleware, AttendanceController.getByEnrollmentId );
router.get( '/Lesson/:lessonId', authMiddleware, AttendanceController.getByLessonId );
router.get( '/Status/:status', authMiddleware, AttendanceController.getByStatus);
router.post('/lesson', authMiddleware, roleMiddleware(['administrador']), AttendanceController.createForLesson);
router.put('/:id', authMiddleware, roleMiddleware(['administrador']), AttendanceController.update);
router.put('/', authMiddleware, roleMiddleware(['administrador']), AttendanceController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['administrador']), AttendanceController.delete);

export default router;