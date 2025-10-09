import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { Router } from 'express';
import { userController } from './user.controller';
import { validate } from '@middlewares/validation.middleware';
import { userSchema } from './model/user.validation';

const router = Router();

router.get( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), userController.getAll );
router.get( '/:id', authMiddleware, userController.getById );
router.post( '/', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( userSchema ), userController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), validate( userSchema.partial() ), userController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'administrador' ] ), userController.delete );
router.get( '/role/:role', authMiddleware, roleMiddleware( [ 'administrador' ] ), userController.getByRole );

export default router;