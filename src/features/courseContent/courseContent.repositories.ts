
import { CourseContent, CourseContentCreationAttributes } from './model/courseContent.model';
export const CourseContentRepository = {
  findAll: () =>
    CourseContent.findAll(),

  findById: ( id: string ) =>
    CourseContent.findByPk( id ),

  findByLessonId: ( lessonId: string ) =>
    CourseContent.findAll( { where: { lessonId } } ),

  findByType: ( type: 'video' | 'pdf' | 'quiz' | 'assignment' | 'other' ) =>
    CourseContent.findAll( {
      where: { type },
    } ),

  create: ( data: CourseContentCreationAttributes ) =>
    CourseContent.create( data ),

  update: ( id: string, data: Partial<CourseContentCreationAttributes> ) =>
    CourseContent.update( data, {
      where: { id },
      returning: true,
    } ),

  delete: ( id: string ) =>
    CourseContent.destroy( { where: { id } } ),

};