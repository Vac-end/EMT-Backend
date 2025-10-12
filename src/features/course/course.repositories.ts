import { Course, CourseCreationAttributes } from './model/course.model';

export const courseRepository = {
  findAll: () =>
    Course.findAll(),

  findById: ( id: string ) =>
    Course.findByPk( id ),

  findByCreatedId: ( createdBy: string ) =>
    Course.findAll( { where: { createdBy } } ),

  findByAcademicLevelId: ( academicLevelId: string ) =>
    Course.findAll( {where: { academicLevelId }} ),

  create: ( data: CourseCreationAttributes ) =>
    Course.create( data ),

  update: ( id: string, data: Partial<CourseCreationAttributes> ) =>
    Course.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Course.destroy( { where: { id } } ),
};