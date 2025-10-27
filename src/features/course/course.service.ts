import { handleServiceError } from '@utils/helpers';
import { courseRepository } from './course.repositories';
import { Announcement, CourseCreationAttributes, Enrollment, GlobalTracking } from '@interfaces/models';
import { StudentDashboardCourse } from './model/student-dashboard-course';
import { Op } from 'sequelize';

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
      const dashboardCoursesPromises = rows.map( async ( course ) => {
        const courseData: any = course.get( { plain: true } );
        const allEnrollments = courseData.CourseEnrolledUsers || [];
        const teacherEnrollment = allEnrollments.find( ( e: any ) => e.role === 'docente' );
        const teacherName = teacherEnrollment?.EnrolledUser?.name ?? 'No asignado';
        const studentCount = allEnrollments.filter( ( e: any ) => e.role === 'estudiante' ).length;
        const academicLevelName = courseData.CourseAcademicLevel?.name ?? 'General';
        const completionPercentage = 0;
        const totalAnnouncements = await Announcement.count( { where: { courseId: courseData.id } } );
        return {
          enrollmentId: null,
          course: {
            id: courseData.id,
            tittle: courseData.tittle,
            coverImageUrl: courseData.coverImageUrl,
            academicLevelName: academicLevelName
          },
          resolvedTeacher: teacherName,
          resolvedEnrollmentCount: studentCount,
          completionPercentage: completionPercentage,
          newAnnouncementsCount: totalAnnouncements
        };
      } );
      const dashboardCourses = await Promise.all( dashboardCoursesPromises );
      return {
        totalItems: count,
        courses: dashboardCourses as StudentDashboardCourse[],
        totalPages: Math.ceil( count / limit ),
        currentPage: page,
      };
    } catch ( error ) {
      handleServiceError( error, "Get Admin Dashboard Courses" );
      throw error;
    }
  },

  getCourseDetails: async ( courseId: string, userId: string ) => {
    try {
      const enrollment = await Enrollment.findOne( { where: { courseId, userId } } );
      if ( !enrollment ) {
        throw new Error( 'Forbidden: User is not enrolled in this course.' );
      }
      const currentUserEnrollmentRecord = await Enrollment.findOne( {
        where: { courseId, userId },
        attributes: [ 'id', 'userId', 'role', 'groupId' ]
      } );
      if ( !currentUserEnrollmentRecord ) {
        throw new Error( 'Forbidden: User is not enrolled in this course.' );
      }
      const courseWithDetails = await courseRepository.findByPkIncludingDetails( courseId );
      if ( !courseWithDetails ) {
        throw new Error( 'Course not found.' );
      }
      const courseData = courseWithDetails.get( { plain: true } ) as any;
      const currentUserEnrollmentArray = currentUserEnrollmentRecord.get({ plain: true });
      const allProgressRecords = await GlobalTracking.findAll( {
        where: {
          userId: userId,
          courseId: courseId,
          trackableType: { [ Op.in ]: [ 'lesson', 'course_content' ] }
        },
        attributes: [ 'trackableId', 'status', 'trackableType' ]
      } );
      const lessonProgressMap = new Map<string, string>();
      const contentProgressMap = new Map<string, string>();

      allProgressRecords.forEach( p => {
        if ( p.trackableType === 'lesson' ) {
          lessonProgressMap.set( p.trackableId, p.status );
        } else if ( p.trackableType === 'course_content' ) {
          contentProgressMap.set( p.trackableId, p.status );
        }
      } );
      let totalCourseLessons = 0;
      let completedCourseLessons = 0;
      const assignmentsList: { id: string, tittle: string, lessonId: string; }[] = [];
      const quizzesList: { id: string, tittle: string, lessonId: string; }[] = [];
      const processedModules = courseData.CourseModulesList?.map( ( module: any ) => {
        let completedModuleLessons = 0;
        const processedLessons = module.ModuleLessonsList?.map( ( lesson: any ) => {
          totalCourseLessons++;
          const userProgressStatus = lessonProgressMap.get( lesson.id ) || 'not_started';
          if ( userProgressStatus === 'completed' ) {
            completedModuleLessons++;
            completedCourseLessons++;
          }
          if ( lesson.LessonAssignments ) {
            assignmentsList.push( ...lesson.LessonAssignments.map( ( a: any ) => ( {
              id: a.id,
              tittle: a.tittle,
              lessonId: lesson.id
            } ) ) );
          }
          if ( lesson.LessonQuizzes ) {
            quizzesList.push( ...lesson.LessonQuizzes.map( ( q: any ) => ( {
              id: q.id,
              tittle: q.tittle,
              lessonId: lesson.id
            } ) ) );
          }
          const processedCourseContents = ( lesson.LessonCourseContentList || [] ).map( ( contentItem: any ) => {
            const contentStatus = contentProgressMap.get( contentItem.id ) || 'not_started';
            return {
              ...contentItem,
              userProgressStatus: contentStatus
            };
          } );
          return {
            id: lesson.id,
            tittle: lesson.tittle,
            description: lesson.description,
            orderIndex: lesson.orderIndex,
            duration: lesson.duration,
            schedule: lesson.LessonSchedules?.[ 0 ] || null,
            courseContents: processedCourseContents,
            userProgressStatus: userProgressStatus,
          };
        } ) || [];
        return {
          id: module.id,
          tittle: module.tittle,
          description: module.description,
          orderIndex: module.orderIndex,
          lessons: processedLessons,
          totalLessons: processedLessons.length,
          completedLessons: completedModuleLessons,
        };
      } ) || [];

      const overallCompletionPercentage = totalCourseLessons > 0
        ? Math.round( ( completedCourseLessons / totalCourseLessons ) * 100 )
        : 0;
      const announcementIds = courseData.CourseAnnouncements?.map( ( ann: any ) => ann.id ) || [];
      let readAnnouncementIds = new Set<string>();
      if ( announcementIds.length > 0 ) {
        const readRecords = await GlobalTracking.findAll( {
          where: { userId: userId, trackableType: 'announcement', trackableId: { [ Op.in ]: announcementIds } },
          attributes: [ 'trackableId' ]
        } );
        readAnnouncementIds = new Set( readRecords.map( r => r.trackableId ) );
      }
      const uniqueAssignments = Array.from( new Map( assignmentsList.map( item => [ item.id, item ] ) ).values() );
      const uniqueQuizzes = Array.from( new Map( quizzesList.map( item => [ item.id, item ] ) ).values() );
      const response = {
        course: {
          id: courseData.id,
          tittle: courseData.tittle,
          description: courseData.description,
          groupsEnabled: courseData.groupsEnabled,
          academicLevelName: courseData.CourseAcademicLevel?.name ?? null
        },
        modules: processedModules,
        professors: courseData.CourseEnrolledUsers?.map( ( e: any ) => e.EnrolledUser ).filter( Boolean ) || [],
        announcements: {
          latest: courseData.CourseAnnouncements?.map( ( a: any ) => ( {
            id: a.id, title: a.title, content: a.content, imageUrl: a.imageUrl, createdAt: a.createdAt,
            creatorName: a.AnnouncementCreator?.name || 'Sistema', isRead: readAnnouncementIds.has( a.id )
          } ) ) || [],
          newCount: announcementIds.length - readAnnouncementIds.size
        },
        gradebookItems: {
          assignments: uniqueAssignments,
          quizzes: uniqueQuizzes
        },
        overallCompletionPercentage: overallCompletionPercentage,
        currentUserEnrollment: currentUserEnrollmentArray ?? null,
      };
      return response;
    } catch ( error ) {
      handleServiceError( error, "Get Course Details" );
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