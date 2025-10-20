import { AcademicLevel, Course, Enrollment, User, CourseCreationAttributes } from '@interfaces/models';


export const courseRepository = {
  findAll: () =>
    Course.findAll(),

  findById: ( id: string ) =>
    Course.findByPk( id ),

  findAdminDashboardCourses: (limit: number, offset: number) =>
    Course.findAndCountAll( {
      limit: limit,
      offset: offset,
      distinct: true,
      attributes: [ 'id', 'tittle', 'coverImageUrl', 'academicLevelId', 'createdAt' ],
      include: [
        {
          model: AcademicLevel,
          as: 'CourseAcademicLevel',
          attributes: [ 'name' ],
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
      order: [['createdAt', 'DESC']]
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