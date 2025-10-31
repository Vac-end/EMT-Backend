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
import questionRoutes from '@features/Question/question.routes'
import questionOpsRoutes from '@features/Question/questionOpt.routes'
import assignmentRoutes from '@features/Assignment/assignment.routes'
import submissionRoutes from '@features/Submission/submission.routes'
import trackRoutes from '@features/GlobalTracking/globaltracking.routes'
import groupRoutes from '@features/Group/group.routes'
import announcementRoutes from '@features/Announcements/announcements.routes'
import uploadRoutes from '@features/upload/upload.routes'

const router = Router();

router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/academicLevel', academicLevelRoutes);
router.use('/users', userRoutes);
router.use('/announcements', announcementRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/lessons', lessonRoutes);
router.use('/courseContents', courseContentRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/attendances', attendanceRoutes)
router.use('/schedules', scheduleRoutes);
router.use('/quizs', quizRoutes);
router.use('/questions', questionRoutes);
router.use('/questionOps', questionOpsRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/tracks', trackRoutes);
router.use('/groups', groupRoutes);

export default router;