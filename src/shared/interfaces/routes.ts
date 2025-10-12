import { Router } from 'express'
import authRoutes from '@features/auth/auth.routes'
import userRoutes from '@features/user/user.routes'
import attendanceRoutes from '@features/Attendance/attendance.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.use('/attendances', attendanceRoutes)

export default router;