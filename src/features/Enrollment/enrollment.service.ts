import { handleServiceError } from '@utils/helpers';
import { enrollmentRepository } from './enrollment.repositories';
import { Enrollment, EnrollmentCreationAttributes, Course } from '@interfaces/models';

export const EnrollmentService = {
  getAll: async () => {
    try {
      const Enrollments = await enrollmentRepository.findAll();
      return Enrollments;
    } catch ( error ) {
      handleServiceError( error, "Get All Enrollments" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const Enrollment = await enrollmentRepository.findById( id );
      return Enrollment;
    } catch ( error ) {
      handleServiceError( error, "Get By Id Enrollment" );
      return error;
    }
  },

  getByUserId: async ( userId: string ) => {
    try {
      const Enrollment = await enrollmentRepository.findByUserId( userId );
      return Enrollment;
    } catch ( error ) {
      handleServiceError( error, "Get By User Id Enrollment" );
      throw error;
    }
  },

  getStudentDashboard: async ( userId: string, page: number, limit: number ) => {
    try {
      const offset = ( page - 1 ) * limit;
      const { count, rows } = await enrollmentRepository.findStudentDashboardCourses( userId, limit, offset );
      const dashboardCourses = rows.map( enrollment => {
        const course: any = ( enrollment as any ).EnrolledCourse;
        if ( !course ) return null;
        const allCourseEnrollments = course.CourseEnrolledUsers || [];
        const teacherEnrollment = allCourseEnrollments.find( ( e: any ) => e.role === 'docente' );
        const teacherName = teacherEnrollment?.EnrolledUser?.name ?? 'No asignado';
        const studentCount = allCourseEnrollments.filter( ( e: any ) => e.role === 'estudiante' ).length;
        const academicLevelName = course.CourseAcademicLevel?.name ?? 'General';
        return {
          enrollmentId: enrollment.id,
          course: {
            id: course.id,
            tittle: course.tittle,
            coverImageUrl: course.coverImageUrl,
            academicLevelName: academicLevelName,
          },
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
      handleServiceError( error, "Get Student Dashboard Courses" );
      throw error;
    }
  },

  getTeacherDashboard: async ( userId: string, page: number, limit: number ) => {
    try {
      const offset = ( page - 1 ) * limit;
      const { count, rows } = await enrollmentRepository.findTeacherDashboardCourses( userId, limit, offset );
      const dashboardCourses = rows.map( enrollment => {
        const enrollmentData: any = enrollment;
        const course: any = enrollmentData.EnrolledCourse;
        if ( !course ) return null;
        const allCourseEnrollments = course.CourseEnrolledUsers || [];
        const studentCount = allCourseEnrollments.filter( ( e: any ) => e.role === 'estudiante' ).length;
        const academicLevelName = course.CourseAcademicLevel?.name ?? 'General';
        const teacherName = enrollmentData.EnrolledUser?.name ?? 'Profesor';
        return {
          enrollmentId: enrollmentData.id,
          course: {
            id: course.id,
            tittle: course.tittle,
            coverImageUrl: course.coverImageUrl,
            academicLevelName: academicLevelName
          },
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
      handleServiceError( error, "Get Teacher Dashboard Courses" );
      throw error;
    }
  },

  getByCourseId: async ( courseId: string ) => {
    try {
      const Enrollment = await enrollmentRepository.findByCourseId( courseId );
      return Enrollment;
    } catch ( error ) {
      handleServiceError( error, "Get By Course Id Enrollment" );
      throw error;
    }
  },

  getCoursesByUserId: async ( userId: string ) => {
    try {
      const enrollments = await enrollmentRepository.findByUserId( userId );
      if ( !enrollments || enrollments.length === 0 ) {
        return [];
      }
      const courseIds = enrollments
        .filter( enrollment => enrollment.role === 'docente' || enrollment.role === 'estudiante' )
        .map( enrollment => enrollment.courseId );
      const courses = await Course.findAll( { where: { id: courseIds } } );
      return courses;
    } catch ( error ) {
      handleServiceError( error, "Get Courses by User ID" );
      throw error;
    }
  },

  getByRole: async ( role: 'estudiante' | 'docente' | 'soporte' ) => {
    try {
      const Enrollment = await enrollmentRepository.findByRole( role );
      return Enrollment;
    } catch ( error ) {
      handleServiceError( error, "Get By Role Enrollment" );
      throw error;
    }
  },

  create: async ( data: EnrollmentCreationAttributes ) => {
    try {
      const existingEnrollment = await Enrollment.findOne( { where: { userId: data.userId, courseId: data.courseId } } );
      if ( existingEnrollment ) { throw new Error( ' The User is already Enrolled in this course' ); }
      const enrollment = await enrollmentRepository.create( data );
      return enrollment;
    } catch ( error ) {
      handleServiceError( error, "Create Enrollment" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<EnrollmentCreationAttributes> ) => {
    try {
      return enrollmentRepository.update( id, data );
    } catch ( error ) {
      handleServiceError( error, "Update Enrollment" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const deleted = await enrollmentRepository.delete( id );
      if ( deleted == 0 ) { throw new Error( 'Enrollment not found' ); }
      return deleted;
    } catch ( error ) {
      handleServiceError( error, "Delete Enrollment" );
      throw error;
    }
  }

};