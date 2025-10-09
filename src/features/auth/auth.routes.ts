import { Router } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { enableDisableTwoFactorSchema, loginSchema, recoverPasswordSchema, resetPasswordSchema } from './model/auth.validation';

const router = Router();

router.post( '/login', validate( loginSchema ), authController.login );
router.post( '/enable-two-factor', authMiddleware, validate( enableDisableTwoFactorSchema ), roleMiddleware( [ 'docente', 'administrador' ] ), authController.enableTwoFactorAuth );
router.post( '/disable-two-factor', authMiddleware, validate( enableDisableTwoFactorSchema ), roleMiddleware( [ 'docente', 'administrador' ] ), authController.disableTwoFactorTemporarily );
router.post( '/recover-password', validate( recoverPasswordSchema ), authController.recoverPassword );
router.post( '/reset-password', validate( resetPasswordSchema ), authController.resetPassword );
router.post( '/refresh', authController.refresh );
router.post( '/is-two-factor-enabled', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), authController.checkTwoFactorStatus );

export default router;