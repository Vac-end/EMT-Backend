import { Token } from '@features/auth/model/Token.model';
import { sequelize } from '../config/db.config'
import { User } from '@features/user/model/user.model';
import { AcademicLevel } from '@features/AcademicLevel/model/academicLevel.model';
import { Course } from '@features/course/model/course.model';
import { Module } from '@features/Module/model/module.model';
import { Lesson } from '@features/Lesson/model/lesson.model';
import { CourseContent } from '@features/courseContent/model/courseContent.model';
import { Enrollment } from '@features/Enrollment/model/enrollment.model';
import { Attendance } from '@features/Attendance/model/attendance.model';
import { Schedule } from '@features/Schedule/model/schedule.model';

User.hasMany(Token, { foreignKey: 'userId', as: 'UserToken' });
Token.belongsTo(User, { foreignKey: 'userId', as: 'TokenOwner' });

User.belongsTo(AcademicLevel, { foreignKey: 'academicLevelId', as: 'UserAcademicLevel' });
AcademicLevel.hasMany(User, { foreignKey: 'academicLevelId', as: 'AcademicLevelUsers' });

User.hasMany(Course, { foreignKey: 'createdBy', as: 'UserCreatedCourse' });
Course.belongsTo(User, { foreignKey: 'createdBy', as: 'CourseCreator' });

Course.belongsTo(AcademicLevel, { foreignKey: 'academicLevelId', as: 'CourseAcademicLevel' });
AcademicLevel.hasMany(Course, { foreignKey: 'academicLevelId', as: 'AcademicLevelCourses' });

Course.hasMany(Module, { foreignKey: 'courseId', as: 'CourseModulesList' });
Module.belongsTo(Course, { foreignKey: 'courseId', as: 'ModuleCourse' });

Module.hasMany(Lesson, { foreignKey: 'moduleId', as: 'ModuleLessonsList' });
Lesson.belongsTo(Module, { foreignKey: 'moduleId', as: 'LessonModule' });

Lesson.hasMany(CourseContent,{ foreignKey: 'lessonId', as: 'LessonCourseContentList' })
CourseContent.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'CourseContentLesson' });

User.hasMany(Enrollment, { foreignKey: 'userId', as: 'UserCourseEnrollments' });
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'EnrolledUser' });

Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'CourseEnrolledUsers' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'EnrolledCourse' });

Enrollment.hasMany(Attendance, { foreignKey: 'enrollmentId', as: 'EnrollmentAttendances' });
Attendance.belongsTo(Enrollment, { foreignKey: 'enrollmentId', as: 'AttendanceEnrollment' });

Lesson.hasMany(Attendance, { foreignKey: 'lessonId', as: 'LessonAttendances' });
Attendance.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'AttendanceLesson' });

Course.hasMany(Schedule, { foreignKey: 'courseId', as: 'CourseSchedules' });
Schedule.belongsTo(Course, { foreignKey: 'courseId', as: 'ScheduleCourse' });

Lesson.hasMany(Schedule, { foreignKey: 'lessonId', as: 'LessonSchedules' });
Schedule.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'ScheduleLesson' });

export { sequelize, User, Token, AcademicLevel, Course, Module, Lesson, CourseContent, Enrollment, Attendance, Schedule}