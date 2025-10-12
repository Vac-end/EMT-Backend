import { Router } from 'express';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { LessonController } from './lesson.controller';
import { LessonSchema } from './model/lesson.validation';


const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), LessonController.getAll );
router.get( '/:id', authMiddleware, LessonController.getById );
router.get( '/module/:moduleId', authMiddleware, LessonController.getByModuleId );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( LessonSchema ), LessonController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( LessonSchema.partial() ), LessonController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), LessonController.delete );


export default router;