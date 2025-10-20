import { AcademicLevel, Course, Enrollment, User, EnrollmentCreationAttributes } from '@interfaces/models';


export const enrollmentRepository = {
  findAll: ( options = {} ) =>
    Enrollment.findAll( options ),

  findById: ( id: string ) =>
    Enrollment.findByPk( id ),

  findByUserId: ( userId: string ) =>
    Enrollment.findAll( {
      where: { userId },
      include: [
        { model: User, as: 'EnrolledUser', attributes: { exclude: [ 'password' ] } },
        { model: Course, as: 'EnrolledCourse' }
      ]
    } ),

  findStudentDashboardCourses: ( userId: string, limit: number, offset: number ) =>
    Enrollment.findAndCountAll( {
      limit: limit,
      offset: offset,
      distinct: true,
      where: { userId: userId, role: 'estudiante' },
      attributes: [ 'id', 'courseId' ],
      include: [
        {
          model: Course,
          as: 'EnrolledCourse',
          attributes: [ 'id', 'tittle', 'coverImageUrl', 'academicLevelId' ],
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
              attributes: [ 'role' ],
              required: false,
              include: [
                {
                  model: User,
                  as: 'EnrolledUser',
                  attributes: [ 'name' ]
                }
              ]
            }
          ]
        }
      ], order: [ [ { model: Course, as: 'EnrolledCourse' }, 'createdAt', 'DESC' ] ]
    } ),

  findTeacherDashboardCourses: ( userId: string, limit: number, offset: number ) =>
    Enrollment.findAndCountAll( {
      limit: limit,
      offset: offset,
      distinct: true,
      where: { userId: userId, role: 'docente' },
      attributes: [ 'id', 'courseId' ],
      include: [
        {
          model: User,
          as: 'EnrolledUser',
          attributes: [ 'name' ]
        },
        {
          model: Course,
          as: 'EnrolledCourse',
          attributes: [ 'id', 'tittle', 'coverImageUrl', 'academicLevelId' ],
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
              attributes: [ 'role' ],
              required: false,
            }
          ]
        }
      ],
      order: [
        [ { model: Course, as: 'EnrolledCourse' }, 'createdAt', 'DESC' ]
      ]
    } ),

  findByCourseId: ( courseId: string, options: { role?: 'estudiante' | 'docente' | 'soporte'; } = {} ) =>
    Enrollment.findAll( { where: { courseId, ...( options.role && { role: options.role } ) } } ),

  findByRole: ( role: 'estudiante' | 'docente' | 'soporte' ) =>
    Enrollment.findAll( { where: { role } } ),

  create: ( data: EnrollmentCreationAttributes ) =>
    Enrollment.create( data ),

  update: ( id: string, data: Partial<EnrollmentCreationAttributes> ) =>
    Enrollment.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    Enrollment.destroy( { where: { id } } ),
};
