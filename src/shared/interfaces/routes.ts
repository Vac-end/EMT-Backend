import { Router } from 'express'
import authRoutes from '@features/auth/auth.routes'
import userRoutes from '@features/user/user.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;