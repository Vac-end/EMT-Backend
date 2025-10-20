import { handleServiceError } from '@utils/helpers';
import { courseRepository } from './course.repositories';
import { CourseCreationAttributes } from '@interfaces/models';

export const courseService = {
  getAll: async () => {
    try {
      const Courses = await courseRepository.findAll();
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get All Courses" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Courses = await courseRepository.findById( id );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Courses" );
      throw error;
    }
  },

  getAdminDashboard: async ( page: number, limit: number ) => {
    try {
      const offset = ( page - 1 ) * limit;
      const { count, rows } = await courseRepository.findAdminDashboardCourses( limit, offset );
      const dashboardCourses = rows.map( course => {
        const courseData: any = course.get( { plain: true } );
        const allEnrollments = courseData.CourseEnrolledUsers || [];
        const teacherEnrollment = allEnrollments.find( ( e: any ) => e.role === 'docente' );
        const teacherName = teacherEnrollment?.EnrolledUser?.name ?? 'No asignado';
        const studentCount = allEnrollments.filter( ( e: any ) => e.role === 'estudiante' ).length;
        const academicLevelName = courseData.CourseAcademicLevel?.name ?? 'General';
        return {
          enrollmentId: null,
          course: {
            id: courseData.id,
            tittle: courseData.tittle,
            coverImageUrl: courseData.coverImageUrl,
            academicLevelName: academicLevelName
          },
          resolvedAcademicLevel: academicLevelName,
          resolvedTeacher: teacherName,
          resolvedEnrollmentCount: studentCount,
        };
      } );
      return {
        totalItems: count,
        courses: dashboardCourses,
        totalPages: Math.ceil( count / limit ),
        currentPage: page,
      };
    } catch ( error ) {
      handleServiceError( error, "Get Admin Dashboard Courses" );
      throw error;
    }
  },

  getByCreatedId: async ( createdBy: string ) => {
    try {
      const Courses = await courseRepository.findByCreatedId( createdBy );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By CreatedId Courses" );
      throw error;
    }
  },

  getByAcademicLevelId: async ( academicLevelId: string ) => {
    try {
      const Courses = await courseRepository.findByAcademicLevelId( academicLevelId );
      return Courses;
    } catch ( error ) {
      handleServiceError( error, "Get By AcademicLevelId Courses" );
      throw error;
    }
  },

  create: async ( data: CourseCreationAttributes ) => {
    try {
      return courseRepository.create( { ...data } );
    } catch ( error ) {
      handleServiceError( error, "Create Courses" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<CourseCreationAttributes> ) => {
    try {
      return courseRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update Courses" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await courseRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( ' Courses not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Courses" );
      throw error;
    }
  },
};