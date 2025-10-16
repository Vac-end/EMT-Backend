import { Router } from 'express';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { QuestionOptController } from './question.controller';
import { QuestionOptSchema } from './model/question.validation';


const router = Router();

router.get('/', authMiddleware, roleMiddleware(['administrador']), QuestionOptController.getAll);
router.get('/:id', authMiddleware, QuestionOptController.getById);
router.get('/question/:questionId', authMiddleware, QuestionOptController.getByQuestionId);
router.post('/', authMiddleware, roleMiddleware(['docente', 'administrador']), validate(QuestionOptSchema), QuestionOptController.create);
router.put('/:id', authMiddleware, roleMiddleware(['docente', 'administrador']), validate(QuestionOptSchema.partial()), QuestionOptController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['docente', 'administrador']), QuestionOptController.delete);

export default router;
