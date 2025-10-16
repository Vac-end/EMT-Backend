import { Schedule, ScheduleCreationAttributes } from '@features/Schedule/model/schedule.model';
export const ScheduleRepository = {
  findAll: () =>
    Schedule.findAll(),

  findById: ( id: string ) =>
    Schedule.findByPk( id ),

  findByLessonId: ( lessonId: string ) =>
    Schedule.findOne( { where: { lessonId }, } ),

  findByCourseId: ( courseId: string ) =>
    Schedule.findAll( { where: { courseId } } ),

  findByStartTime: ( startTime: string ) =>
    Schedule.findAll( { where: { startTime } } ),

  create: ( data: ScheduleCreationAttributes ) =>
    Schedule.create( data ),

  update: ( id: string, data: Partial<ScheduleCreationAttributes> ) =>
    Schedule.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Schedule.destroy( { where: { id } } )
};