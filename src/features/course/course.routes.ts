import { authMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { CourseController } from './course.controller';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { courseSchema } from './model/course.validation';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseController.getAll );
router.get( '/:id', authMiddleware, CourseController.getById );
router.get( '/CreatedBy/:createdBy', authMiddleware, CourseController.getByCreatedId );
router.get( '/byAcademicLevel', authMiddleware, CourseController.getByAcademicLevelId );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseSchema ), CourseController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseSchema.partial() ), CourseController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseController.delete );

export default router;