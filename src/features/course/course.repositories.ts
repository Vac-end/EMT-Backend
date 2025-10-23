import { AcademicLevel, Course, Enrollment, User, CourseCreationAttributes, Announcement, Schedule, Lesson, Module, Assignment, Quiz, CourseContent } from '@interfaces/models';


export const courseRepository = {
  findAll: () =>
    Course.findAll(),

  findById: ( id: string ) =>
    Course.findByPk( id ),

  findAdminDashboardCourses: ( limit: number, offset: number ) =>
    Course.findAndCountAll( {
      limit: limit,
      offset: offset,
      distinct: true,
      attributes: [ 'id', 'tittle', 'coverImageUrl', 'academicLevelId', 'createdAt', 'groupsEnabled' ],
      include: [
        {
          model: AcademicLevel,
          as: 'CourseAcademicLevel',
          attributes: [ 'name', 'orderIndex' ],
          required: false
        },
        {
          model: Enrollment,
          as: 'CourseEnrolledUsers',
          attributes: [ 'role', 'userId' ],
          required: false,
          include: [
            {
              model: User,
              as: 'EnrolledUser',
              attributes: [ 'name' ]
            }
          ]
        }
      ],
      order: [
        [ { model: AcademicLevel, as: 'CourseAcademicLevel' }, 'orderIndex', 'ASC' ],
        [ 'tittle', 'ASC' ]
      ]
    } ),

  findByPkIncludingDetails: ( courseId: string ) =>
    Course.findByPk( courseId, {
      attributes: [ 'id', 'tittle', 'description', 'groupsEnabled', 'academicLevelId' ],
      include: [
        {
          model: AcademicLevel,
          as: 'CourseAcademicLevel',
          attributes: ['name'],
          required: false
        },
        {
          model: Module,
          as: 'CourseModulesList',
          attributes: [ 'id', 'tittle', 'description', 'orderIndex' ],
          separate: true,
          order: [ [ 'orderIndex', 'ASC' ] ],
          include: [
            {
              model: Lesson,
              as: 'ModuleLessonsList',
              attributes: [ 'id', 'tittle', 'description', 'duration', 'orderIndex' ],
              separate: true,
              order: [ [ 'orderIndex', 'ASC' ] ],
              include: [
                {
                  model: Schedule,
                  as: 'LessonSchedules',
                  attributes: [ 'startTime', 'endTime', 'meetingLink', 'mode' ],
                  required: false,
                  limit: 1
                },
                {
                  model: Assignment,
                  as: 'LessonAssignments',
                  attributes: [ 'id', 'tittle' ],
                  required: false
                },
                {
                  model: Quiz,
                  as: 'LessonQuizzes',
                  attributes: [ 'id', 'tittle' ],
                  required: false
                },
                {
                  model: CourseContent,
                  as: 'LessonCourseContentList',
                  attributes: ['id', 'type', 'contentUrl', 'contentBody', 'description', 'orderIndex'],
                  required: false,
                  separate: true,
                  order: [['orderIndex', 'ASC']]
                }
              ]
            }
          ]
        },
        {
          model: Enrollment,
          as: 'CourseEnrolledUsers',
          where: { role: 'docente' },
          attributes: [ 'userId' ],
          required: false,
          include: [
            {
              model: User,
              as: 'EnrolledUser',
              attributes: [ 'id', 'name', 'email', 'imagePerfilUrl' ]
            }
          ]
        },
        {
          model: Announcement,
          as: 'CourseAnnouncements',
          attributes: [ 'id', 'title', 'content', 'imageUrl', 'createdAt' ],
          limit: 5,
          order: [ [ 'createdAt', 'DESC' ] ],
          required: false,
          separate: true,
          include: [
            {
              model: User,
              as: 'AnnouncementCreator',
              attributes: [ 'id', 'name' ]
            }
          ]
        },
      ],
    } ),

  findByCreatedId: ( createdBy: string ) =>
    Course.findAll( { where: { createdBy } } ),

  findByAcademicLevelId: ( academicLevelId: string ) =>
    Course.findAll( { where: { academicLevelId } } ),

  create: ( data: CourseCreationAttributes ) =>
    Course.create( data ),

  update: ( id: string, data: Partial<CourseCreationAttributes> ) =>
    Course.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Course.destroy( { where: { id } } ),
};