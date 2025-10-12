import { authMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { academicLevelSchema } from './model/academicLevel.validation';
import { AcademicLevelController } from './academicLevel.controller';

const router = Router();

router.get( '/', authMiddleware, AcademicLevelController.getAll );
router.get( '/:id', authMiddleware, AcademicLevelController.getById );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( academicLevelSchema ), AcademicLevelController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( academicLevelSchema.partial() ), AcademicLevelController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), AcademicLevelController.delete );

export default router;