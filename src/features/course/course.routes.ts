import { authMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { CourseController } from './course.controller';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { courseSchema } from './model/course.validation';

const router = Router();

router.get( '/admin-dashboard', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseController.getAdminDashboard );
router.get( '/:courseId/details', authMiddleware, CourseController.getDetails);
router.get( '/:courseId/content', authMiddleware, CourseController.getCourseContent );
router.get( '/:courseId/gradebook', authMiddleware, CourseController.getGradebook );
router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseController.getAll );
router.get( '/:id', authMiddleware, CourseController.getById );
router.get( '/CreatedBy/:createdBy', authMiddleware, CourseController.getByCreatedId );
router.get( '/byAcademicLevel/:academiclevelId', authMiddleware, CourseController.getByAcademicLevelId );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseSchema ), CourseController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseSchema.partial() ), CourseController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseController.delete );

export default router;