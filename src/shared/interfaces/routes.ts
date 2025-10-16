import { Router } from 'express'
import authRoutes from '@features/auth/auth.routes'
import userRoutes from '@features/user/user.routes'
import attendanceRoutes from '@features/Attendance/attendance.routes'
import academicLevelRoutes from '@features/AcademicLevel/academicLevel.routes'
import courseRoutes from '@features/course/course.routes'
import moduleRoutes from '@features/Module/module.routes'
import lessonRoutes from '@features/Lesson/lesson.routes'
import courseContentRoutes from '@features/courseContent/courseContent.routes'
import enrollmentRoutes from '@features/Enrollment/enrollment.routes'
import scheduleRoutes from '@features/Schedule/schedule.routes'
import quizRoutes from '@features/Quiz/quiz.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/academicLevel', academicLevelRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/lessons', lessonRoutes);
router.use('/courseContents', courseContentRoutes);
router.use('/enrollment', enrollmentRoutes);
router.use('/attendances', attendanceRoutes)
router.use('/schedules', scheduleRoutes);
router.use('/quizs', quizRoutes);

export default router;