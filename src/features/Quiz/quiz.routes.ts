import { Router } from 'express';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './model/quiz.validation';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), QuizController.getAll );
router.get( '/:id', authMiddleware, QuizController.getById );
router.get( '/Lesson/:lessonId', authMiddleware, QuizController.getByLessonId );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( QuizSchema ), QuizController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( QuizSchema.partial() ), QuizController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), QuizController.delete );


export default router;