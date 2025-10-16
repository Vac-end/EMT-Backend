import { handleServiceError } from '@utils/helpers';
import { enrollmentRepository } from './enrollment.repositories';
import { Enrollment, EnrollmentCreationAttributes } from './model/enrollment.model';
import { Course } from '@interfaces/models';

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

  getByCourseId: async ( courseId: string ) => {
    try {
      const Enrollment = await enrollmentRepository.findByCourseId( courseId );
      return Enrollment;
    } catch ( error ) {
      handleServiceError( error, "Get By Course Id Enrollment" );
      throw error;
    }
  },

  getCoursesByUserId: async (userId: string) => {
    try {
      const enrollments = await enrollmentRepository.findByUserId(userId);
      if (!enrollments || enrollments.length === 0) {
        return [];
      }
      const courseIds = enrollments
        .filter(enrollment => enrollment.role === 'docente' || enrollment.role === 'estudiante')
        .map(enrollment => enrollment.courseId);
      const courses = await Course.findAll({ where: { id: courseIds } });
      return courses;
    } catch (error) {
      handleServiceError(error, "Get Courses by User ID");
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