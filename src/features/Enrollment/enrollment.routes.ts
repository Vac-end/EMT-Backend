import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { Router } from 'express';
import { EnrollmentController } from './enrollment.controller';
import { validate } from '@middlewares/validation.middleware';
import { EnrollmentSchema } from './model/enrollment.validation';

const router = Router();

router.get( '/my-courses', authMiddleware, roleMiddleware( [ 'estudiante' ] ), EnrollmentController.getStudentDashboard );
router.get( '/my-teaching-courses', authMiddleware, roleMiddleware( [ 'docente' ] ), EnrollmentController.getTeacherDashboard );
router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), EnrollmentController.getAll );
router.get( '/:id', authMiddleware, EnrollmentController.getById );
router.get( '/user/:userId', authMiddleware, EnrollmentController.getByUserId );
router.get( '/course/:courseId', authMiddleware, EnrollmentController.getByCourseId );
router.get( '/role/:role', authMiddleware, EnrollmentController.getByRole );
router.get( '/user/:userId/courses', authMiddleware, EnrollmentController.getCoursesByUserId );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( EnrollmentSchema ), EnrollmentController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( EnrollmentSchema.partial() ), EnrollmentController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), EnrollmentController.delete );


export default router;