import { Router } from 'express';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { QuestionController } from './question.controller';
import { QuestionSchema } from './model/question.validation';

const router = Router();

router.get('/', authMiddleware, roleMiddleware(['administrador']), QuestionController.getAll);
router.get('/:id', authMiddleware, QuestionController.getById);
router.get('/quiz/:quizId', authMiddleware, QuestionController.getByQuizId);
router.post('/', authMiddleware, roleMiddleware(['docente', 'administrador']), validate(QuestionSchema), QuestionController.create);
router.put('/:id', authMiddleware, roleMiddleware(['docente', 'administrador']), validate(QuestionSchema.partial()), QuestionController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['docente', 'administrador']), QuestionController.delete);

export default router;
