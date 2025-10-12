import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { Router } from 'express';
import { CourseContentController } from './courseContent.controller';
import { courseContentSchema } from './model/courseContent.validation';
import { validate } from '@middlewares/validation.middleware';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseContentController.getAll );
router.get( '/:id', authMiddleware, CourseContentController.getById );
router.get( '/Lesson/:lessonId', authMiddleware, CourseContentController.getByLessonId );
router.get( '/Type/:type', authMiddleware, CourseContentController.getByType );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseContentSchema ), CourseContentController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( courseContentSchema.partial() ), CourseContentController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), CourseContentController.delete );


export default router;

