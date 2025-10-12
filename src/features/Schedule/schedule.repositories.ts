import { Schedule } from '@features/Schedule/model/schedule.model';
export const ScheduleRepository = {
  findAll: () =>
    Schedule.findAll(),

  findById: ( id: string ) =>
    Schedule.findByPk( id ),

  findByLessonId: ( lessonId: string ) =>
    Schedule.findAll( { where: { lessonId }, } ),

  findByCourseId: ( courseId: string ) =>
    Schedule.findAll( { where: { courseId } } ),
  
};