import { Token } from '@features/auth/model/Token.model';
import { sequelize } from '../config/db.config'
import { User } from '@features/user/model/user.model';
import { AcademicLevel } from '@features/academicLevel/model/academicLevel.model';
import { Course } from '@features/course/model/course.model';
import { Module } from '@features/Module/model/module.model';
import { Lesson } from '@features/Lesson/model/lesson.model';

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

export { sequelize, User, Token, AcademicLevel, Course, Module, Lesson}