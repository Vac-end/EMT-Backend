import { Quiz } from '@interfaces/models';
import { QuizCreationAttributes } from './model/quiz.model';

export const quizRepository = {
  findAll: () =>
    Quiz.findAll(),

  findById: ( id: string ) =>
    Quiz.findByPk( id ),

  findByLessonId: ( lessonId: string ) =>
    Quiz.findAll( { where: { lessonId } } ),

  create: ( data: QuizCreationAttributes ) =>
    Quiz.create( data ),

  update: ( id: string, data: Partial<QuizCreationAttributes> ) =>
    Quiz.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Quiz.destroy( { where: { id } } ),
};