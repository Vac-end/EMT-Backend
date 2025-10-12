import { Router } from 'express';
import { ModuleSchema } from './model/module.validation';
import { validate } from '@middlewares/validation.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { ModuleController } from './module.controller';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), ModuleController.getAll );
router.get( '/:id', authMiddleware, ModuleController.getById );
router.get( '/course/:courseId', authMiddleware, ModuleController.getByCourseId );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( ModuleSchema ), ModuleController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( ModuleSchema.partial() ), ModuleController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), ModuleController.delete );


export default router;