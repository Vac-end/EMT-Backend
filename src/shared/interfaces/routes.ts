import { Router } from 'express'
import authRoutes from '@features/auth/auth.routes'
import userRoutes from '@features/user/user.routes'
import attendanceRoutes from '@features/Attendance/attendance.routes'
import academicLevelRoutes from '@features/AcademicLevel/academicLevel.routes'
import courseRoutes from '@features/course/course.routes'
import moduleRoutes from '@features/Module/module.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/academicLevel', academicLevelRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/attendances', attendanceRoutes)

export default router;