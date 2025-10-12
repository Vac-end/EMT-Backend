import { Lesson } from '@interfaces/models';
import { LessonCreationAttributes } from './model/lesson.model';

export const lessonRepository = {
  findAll: () =>
    Lesson.findAll(),

  findById: ( id: string ) =>
    Lesson.findByPk( id ),

  findByModuleId: ( moduleId: string ) =>
    Lesson.findAll( { where: { moduleId } } ),

  create: ( data: LessonCreationAttributes ) =>
    Lesson.create( data ),

  update: ( id: string, data: Partial<LessonCreationAttributes> ) =>
    Lesson.update( data, {
      where: { id },
      returning: true,
    } ),

  delete: ( id: string ) =>
    Lesson.destroy( { where: { id } } ),
};