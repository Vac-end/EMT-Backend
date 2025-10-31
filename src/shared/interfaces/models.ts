import { Token } from '@features/auth/model/Token.model';
import { sequelize } from '@config/db.config';
import { User, UserCreationAttributes } from '@features/user/model/user.model';
import { AcademicLevel, AcademicLevelCreationAttributes } from '@features/AcademicLevel/model/academicLevel.model';
import { Course, CourseCreationAttributes } from '@features/course/model/course.model';
import { Module } from '@features/Module/model/module.model';
import { Lesson } from '@features/Lesson/model/lesson.model';
import { CourseContent } from '@features/courseContent/model/courseContent.model';
import { Enrollment, EnrollmentCreationAttributes } from '@features/Enrollment/model/enrollment.model';
import { Attendance } from '@features/Attendance/model/attendance.model';
import { Schedule } from '@features/Schedule/model/schedule.model';
import { Question } from '@features/Question/model/question.model';
import { QuestionOpt } from '@features/Question/model/questionOps.model';
import { Quiz } from '@features/Quiz/model/quiz.model';
import { Assignment } from '@features/Assignment/model/assignment.model';
import { Submission } from '@features/Submission/model/submission.model';
import { Announcement } from '@features/Announcements/model/announcements.model';
import { GlobalTracking } from '@features/GlobalTracking/model/globaltracking.model';
import { GlobalTrackingCreationAttributes, GlobalTrackingAttributes } from '../../features/GlobalTracking/model/globaltracking.model';
import { GroupCreationAttributes, Group, GroupAttributes } from '../../features/Group/model/model.models';
import { EnrollmentAttributes } from '../../features/Enrollment/model/enrollment.model';
import { File } from '@features/Submission/model/File.model';

User.hasMany( Token, { foreignKey: 'userId', as: 'UserToken' } );
Token.belongsTo( User, { foreignKey: 'userId', as: 'TokenOwner' } );

User.belongsTo( AcademicLevel, { foreignKey: 'academicLevelId', as: 'UserAcademicLevel' } );
AcademicLevel.hasMany( User, { foreignKey: 'academicLevelId', as: 'AcademicLevelUsers' } );

User.hasMany( Course, { foreignKey: 'createdBy', as: 'UserCreatedCourse' } );
Course.belongsTo( User, { foreignKey: 'createdBy', as: 'CourseCreator' } );

Course.belongsTo( AcademicLevel, { foreignKey: 'academicLevelId', as: 'CourseAcademicLevel' } );
AcademicLevel.hasMany( Course, { foreignKey: 'academicLevelId', as: 'AcademicLevelCourses' } );

Course.hasMany( Module, { foreignKey: 'courseId', as: 'CourseModulesList' } );
Module.belongsTo( Course, { foreignKey: 'courseId', as: 'ModuleCourse' } );

Module.hasMany( Lesson, { foreignKey: 'moduleId', as: 'ModuleLessonsList' } );
Lesson.belongsTo( Module, { foreignKey: 'moduleId', as: 'LessonModule' } );

Lesson.hasMany( CourseContent, { foreignKey: 'lessonId', as: 'LessonCourseContentList' } );
CourseContent.belongsTo( Lesson, { foreignKey: 'lessonId', as: 'CourseContentLesson' } );

User.hasMany( Enrollment, { foreignKey: 'userId', as: 'UserCourseEnrollments' } );
Enrollment.belongsTo( User, { foreignKey: 'userId', as: 'EnrolledUser' } );

Course.hasMany( Enrollment, { foreignKey: 'courseId', as: 'CourseEnrolledUsers' } );
Enrollment.belongsTo( Course, { foreignKey: 'courseId', as: 'EnrolledCourse' } );

Enrollment.hasMany( Attendance, { foreignKey: 'enrollmentId', as: 'EnrollmentAttendances' } );
Attendance.belongsTo( Enrollment, { foreignKey: 'enrollmentId', as: 'AttendanceEnrollment' } );

Lesson.hasMany( Attendance, { foreignKey: 'lessonId', as: 'LessonAttendances' } );
Attendance.belongsTo( Lesson, { foreignKey: 'lessonId', as: 'AttendanceLesson' } );

Course.hasMany( Schedule, { foreignKey: 'courseId', as: 'CourseSchedules' } );
Schedule.belongsTo( Course, { foreignKey: 'courseId', as: 'ScheduleCourse' } );

Lesson.hasMany( Schedule, { foreignKey: 'lessonId', as: 'LessonSchedules' } );
Schedule.belongsTo( Lesson, { foreignKey: 'lessonId', as: 'ScheduleLesson' } );

Lesson.hasMany( Quiz, { foreignKey: 'lessonId', as: 'LessonQuizzes' } );
Quiz.belongsTo( Lesson, { foreignKey: 'lessonId', as: 'QuizLesson' } );

Quiz.hasMany( Question, { foreignKey: 'quizId', as: 'QuizQuestions' } );
Question.belongsTo( Quiz, { foreignKey: 'quizId', as: 'QuestionQuiz' } );

Question.hasMany( QuestionOpt, { foreignKey: 'questionId', as: 'QuestionOptions' } );
QuestionOpt.belongsTo( Question, { foreignKey: 'questionId', as: 'OptionQuestion' } );

Lesson.hasMany( Assignment, { foreignKey: 'lessonId', as: 'LessonAssignments' } );
Assignment.belongsTo( Lesson, { foreignKey: 'lessonId', as: 'AssignmentLesson' } );

Enrollment.hasMany( Submission, { foreignKey: 'enrollmentId', as: 'EnrollmentSubmissions' } );
Submission.belongsTo( Enrollment, { foreignKey: 'enrollmentId', as: 'SubmissionEnrollment' } );

Assignment.hasMany( Submission, { foreignKey: 'assignmentId', as: 'AssignmentSubmissions' } );
Submission.belongsTo( Assignment, { foreignKey: 'assignmentId', as: 'SubmissionAssignment' } );

Quiz.hasMany( Submission, { foreignKey: 'quizId', as: 'QuizSubmissions' } );
Submission.belongsTo( Quiz, { foreignKey: 'quizId', as: 'SubmissionQuiz' } );

Announcement.belongsTo( Course, { foreignKey: 'courseId', as: 'AnnouncementCourse' } );
Course.hasMany( Announcement, { foreignKey: 'courseId', as: 'CourseAnnouncements' } );

Announcement.belongsTo( User, { foreignKey: 'userId', as: 'AnnouncementCreator' } );
User.hasMany( Announcement, { foreignKey: 'userId', as: 'UserAnnouncements' } );

GlobalTracking.belongsTo( User, { foreignKey: 'userId', as: 'TrackingUser' } );
User.hasMany( GlobalTracking, { foreignKey: 'userId', as: 'UserTrackingRecords' } );

GlobalTracking.belongsTo( Course, { foreignKey: 'courseId', as: 'TrackingCourse' } );
Course.hasMany( GlobalTracking, { foreignKey: 'courseId', as: 'CourseTrackingRecords' } );

Group.belongsTo( Course, { foreignKey: 'courseId', as: 'GroupCourse' } );
Course.hasMany( Group, { foreignKey: 'courseId', as: 'CourseGroups' } );

Enrollment.belongsTo( Group, { foreignKey: 'groupId', as: 'EnrollmentGroup' } );
Group.hasMany( Enrollment, { foreignKey: 'groupId', as: 'GroupMembers' } );

Submission.belongsTo( Group, { foreignKey: 'groupId', as: 'SubmissionGroup' } );
Group.hasMany( Submission, { foreignKey: 'groupId', as: 'GroupSubmissions' } );

File.belongsTo( Assignment, { foreignKey: 'resourceId', constraints: false, as: 'assignment', } );
Assignment.hasMany( File, { foreignKey: 'resourceId', constraints: false, as: 'files', scope: { resourceType: 'assignment' } } );

File.belongsTo( Submission, { foreignKey: 'resourceId', constraints: false, as: 'submission', } );
Submission.hasMany( File, { foreignKey: 'resourceId', constraints: false, as: 'files', scope: { resourceType: 'submission' } } );

export {
  sequelize, User, Token, AcademicLevel, Course, Module, Lesson, CourseContent, Enrollment, Attendance, Schedule, Quiz, Question, QuestionOpt, Assignment, Submission, CourseCreationAttributes, AcademicLevelCreationAttributes, EnrollmentCreationAttributes, UserCreationAttributes, Announcement, GlobalTracking,
  GlobalTrackingCreationAttributes, GlobalTrackingAttributes, Group, GroupCreationAttributes, GroupAttributes, EnrollmentAttributes, File
};