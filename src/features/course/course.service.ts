import { handleServiceError } from '@utils/helpers';
import { courseRepository } from './course.repositories';
import { Announcement, Assignment, CourseCreationAttributes, Enrollment, GlobalTracking, Lesson, Module, Quiz, Submission } from '@interfaces/models';
import { StudentDashboardCourse } from './model/student-dashboard-course';
import { Op } from 'sequelize';

interface GradebookItemBase {
    id: string;
    tittle: string;
    dueDate: Date | null;
    maxScore: number;
    type: 'assignment' | 'quiz';
}

function getDisplayStatus(
  submissionStatus: 'draft' | 'submitted' | 'graded' | null,
  submittedAt: Date | null,
  dueDate: Date | null
): string {
  const now = new Date();
  const dueDateObj = dueDate ? new Date(dueDate) : null;
  if (submissionStatus === 'graded') {
    return 'Calificado';
  }
  if (submissionStatus === 'submitted') {
    const submittedDate = submittedAt ? new Date(submittedAt) : null;
    if (dueDateObj && submittedDate && submittedDate > dueDateObj) {
      return 'Entregado (Atrasado)';
    }
    return 'Entregado';
  }
  if (submissionStatus === 'draft') {
    if (dueDateObj && dueDateObj < now) {
      return 'Vencido (Borrador)';
    }
    return 'Borrador Guardado';
  }
  if (!submissionStatus) {
    if (dueDateObj && dueDateObj < now) {
      return 'Vencido';
    }
    return 'Pendiente';
  }
  return 'Pendiente';
}

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

  // getCourseDetails: async ( courseId: string, userId: string ) => {
  //   try {
  //     const enrollment = await Enrollment.findOne( { where: { courseId, userId } } );
  //     if ( !enrollment ) {
  //       throw new Error( 'Forbidden: User is not enrolled in this course.' );
  //     }
  //     const currentUserEnrollmentRecord = await Enrollment.findOne( {
  //       where: { courseId, userId },
  //       attributes: [ 'id', 'userId', 'role', 'groupId' ]
  //     } );
  //     if ( !currentUserEnrollmentRecord ) {
  //       throw new Error( 'Forbidden: User is not enrolled in this course.' );
  //     }
  //     const courseWithDetails = await courseRepository.findByPkIncludingDetails( courseId );
  //     if ( !courseWithDetails ) {
  //       throw new Error( 'Course not found.' );
  //     }
  //     const courseData = courseWithDetails.get( { plain: true } ) as any;
  //     const currentUserEnrollmentArray = currentUserEnrollmentRecord.get({ plain: true });
  //     const allProgressRecords = await GlobalTracking.findAll( {
  //       where: {
  //         userId: userId,
  //         courseId: courseId,
  //         trackableType: { [ Op.in ]: [ 'lesson', 'course_content' ] }
  //       },
  //       attributes: [ 'trackableId', 'status', 'trackableType' ]
  //     } );
  //     const lessonProgressMap = new Map<string, string>();
  //     const contentProgressMap = new Map<string, string>();

  //     allProgressRecords.forEach( p => {
  //       if ( p.trackableType === 'lesson' ) {
  //         lessonProgressMap.set( p.trackableId, p.status );
  //       } else if ( p.trackableType === 'course_content' ) {
  //         contentProgressMap.set( p.trackableId, p.status );
  //       }
  //     } );
  //     let totalCourseLessons = 0;
  //     let completedCourseLessons = 0;
  //     const assignmentsList: { id: string, tittle: string, lessonId: string; }[] = [];
  //     const quizzesList: { id: string, tittle: string, lessonId: string; }[] = [];
  //     const processedModules = courseData.CourseModulesList?.map( ( module: any ) => {
  //       let completedModuleLessons = 0;
  //       const processedLessons = module.ModuleLessonsList?.map( ( lesson: any ) => {
  //         totalCourseLessons++;
  //         const userProgressStatus = lessonProgressMap.get( lesson.id ) || 'not_started';
  //         if ( userProgressStatus === 'completed' ) {
  //           completedModuleLessons++;
  //           completedCourseLessons++;
  //         }
  //         if ( lesson.LessonAssignments ) {
  //           assignmentsList.push( ...lesson.LessonAssignments.map( ( a: any ) => ( {
  //             id: a.id,
  //             tittle: a.tittle,
  //             lessonId: lesson.id
  //           } ) ) );
  //         }
  //         if ( lesson.LessonQuizzes ) {
  //           quizzesList.push( ...lesson.LessonQuizzes.map( ( q: any ) => ( {
  //             id: q.id,
  //             tittle: q.tittle,
  //             lessonId: lesson.id
  //           } ) ) );
  //         }
  //         const processedCourseContents = ( lesson.LessonCourseContentList || [] ).map( ( contentItem: any ) => {
  //           const contentStatus = contentProgressMap.get( contentItem.id ) || 'not_started';
  //           return {
  //             ...contentItem,
  //             userProgressStatus: contentStatus
  //           };
  //         } );
  //         return {
  //           id: lesson.id,
  //           tittle: lesson.tittle,
  //           description: lesson.description,
  //           orderIndex: lesson.orderIndex,
  //           duration: lesson.duration,
  //           schedule: lesson.LessonSchedules?.[ 0 ] || null,
  //           courseContents: processedCourseContents,
  //           userProgressStatus: userProgressStatus,
  //         };
  //       } ) || [];
  //       return {
  //         id: module.id,
  //         tittle: module.tittle,
  //         description: module.description,
  //         orderIndex: module.orderIndex,
  //         lessons: processedLessons,
  //         totalLessons: processedLessons.length,
  //         completedLessons: completedModuleLessons,
  //       };
  //     } ) || [];

  //     const overallCompletionPercentage = totalCourseLessons > 0
  //       ? Math.round( ( completedCourseLessons / totalCourseLessons ) * 100 )
  //       : 0;
  //     const announcementIds = courseData.CourseAnnouncements?.map( ( ann: any ) => ann.id ) || [];
  //     let readAnnouncementIds = new Set<string>();
  //     if ( announcementIds.length > 0 ) {
  //       const readRecords = await GlobalTracking.findAll( {
  //         where: { userId: userId, trackableType: 'announcement', trackableId: { [ Op.in ]: announcementIds } },
  //         attributes: [ 'trackableId' ]
  //       } );
  //       readAnnouncementIds = new Set( readRecords.map( r => r.trackableId ) );
  //     }
  //     const uniqueAssignments = Array.from( new Map( assignmentsList.map( item => [ item.id, item ] ) ).values() );
  //     const uniqueQuizzes = Array.from( new Map( quizzesList.map( item => [ item.id, item ] ) ).values() );
  //     const response = {
  //       course: {
  //         id: courseData.id,
  //         tittle: courseData.tittle,
  //         description: courseData.description,
  //         groupsEnabled: courseData.groupsEnabled,
  //         academicLevelName: courseData.CourseAcademicLevel?.name ?? null
  //       },
  //       modules: processedModules,
  //       professors: courseData.CourseEnrolledUsers?.map( ( e: any ) => e.EnrolledUser ).filter( Boolean ) || [],
  //       announcements: {
  //         latest: courseData.CourseAnnouncements?.map( ( a: any ) => ( {
  //           id: a.id, title: a.title, content: a.content, imageUrl: a.imageUrl, createdAt: a.createdAt,
  //           creatorName: a.AnnouncementCreator?.name || 'Sistema', isRead: readAnnouncementIds.has( a.id )
  //         } ) ) || [],
  //         newCount: announcementIds.length - readAnnouncementIds.size
  //       },
  //       gradebookItems: {
  //         assignments: uniqueAssignments,
  //         quizzes: uniqueQuizzes
  //       },
  //       overallCompletionPercentage: overallCompletionPercentage,
  //       currentUserEnrollment: currentUserEnrollmentArray ?? null,
  //     };
  //     return response;
  //   } catch ( error ) {
  //     handleServiceError( error, "Get Course Details" );
  //     throw error;
  //   }
  // },

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
      const courseWithDetails = await courseRepository.findDetailsById( courseId );
      if ( !courseWithDetails ) {
        throw new Error( 'Course not found.' );
      }
      const courseData = courseWithDetails.get( { plain: true } ) as any;
      const currentUserEnrollmentArray = currentUserEnrollmentRecord.get( { plain: true } );
      const announcementIds = courseData.CourseAnnouncements?.map( ( ann: any ) => ann.id ) || [];
      let readAnnouncementIds = new Set<string>();
      if ( announcementIds.length > 0 ) {
        const readRecords = await GlobalTracking.findAll( {
          where: { userId: userId, trackableType: 'announcement', trackableId: { [ Op.in ]: announcementIds } },
          attributes: [ 'trackableId' ]
        } );
        readAnnouncementIds = new Set( readRecords.map( r => r.trackableId ) );
      }
      const response = {
        course: {
          id: courseData.id,
          tittle: courseData.tittle,
          description: courseData.description,
          groupsEnabled: courseData.groupsEnabled,
          academicLevelName: courseData.CourseAcademicLevel?.name ?? null
        },
        professors: courseData.CourseEnrolledUsers?.map( ( e: any ) => e.EnrolledUser ).filter( Boolean ) || [],
        announcements: {
          newCount: announcementIds.length - readAnnouncementIds.size
        },
        currentUserEnrollment: currentUserEnrollmentArray ?? null,
      };
      return response;
    } catch ( error ) {
      handleServiceError( error, "Get Course Details" );
      throw error;
    }
  },

  getCourseContent: async ( courseId: string, userId: string ) => {
    try {
      const enrollment = await Enrollment.findOne( { where: { courseId, userId } } );
      if ( !enrollment ) {
        throw new Error( 'Forbidden: User is not enrolled in this course.' );
      }
      const courseWithContent = await courseRepository.findContentStructureById( courseId );
      if ( !courseWithContent ) {
        throw new Error( 'Course content not found.' );
      }
      const courseData = courseWithContent.get( { plain: true } ) as any;
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
      const uniqueAssignments = Array.from( new Map( assignmentsList.map( item => [ item.id, item ] ) ).values() );
      const uniqueQuizzes = Array.from( new Map( quizzesList.map( item => [ item.id, item ] ) ).values() );
      const response = {
        modules: processedModules,
        gradebookItems: {
          assignments: uniqueAssignments,
          quizzes: uniqueQuizzes
        },
        overallCompletionPercentage: overallCompletionPercentage,
      };
      return response;

    } catch ( error ) {
      handleServiceError( error, "Get Course Content" );
      throw error;
    }
  },

  getGradebookForStudent: async ( courseId: string, userId: string, page: number = 1, limit: number = 15 ) => {
    try {
      const enrollment = await Enrollment.findOne({
        where: { courseId, userId },
        attributes: ['id', 'groupId']
      });
      if (!enrollment) {
        throw new Error('Forbidden: User is not enrolled in this course.');
      }
      const enrollmentId = enrollment.id;
      const userGroupId = enrollment.groupId;
      const allAssignments = await Assignment.findAll({
        attributes: ['id', 'tittle', 'dueDate', 'maxScore'],
        include: [{
          model: Lesson,
          as: 'AssignmentLesson',
          attributes: [],
          required: true,
          include: [{
            model: Module,
            as: 'LessonModule',
            attributes: [],
            required: true,
            where: { courseId }
          }]
        }]
      });
      const allQuizzes = await Quiz.findAll({
        attributes: ['id', 'tittle', ['totalPoints', 'maxScore'], 'dueDate'],
         where: {
             '$QuizLesson.LessonModule.courseId$': courseId
         },
         include: [{
             model: Lesson,
             as: 'QuizLesson',
             attributes: [],
             required: true,
             include: [{
                 model: Module,
                 as: 'LessonModule',
                 attributes: [],
                 required: true
             }]
         }]
      });
      const gradebookItemsRaw: GradebookItemBase[] = [
        ...allAssignments.map(a => {
            const assignmentJson = a.toJSON();
            return {
                id: assignmentJson.id,
                tittle: assignmentJson.tittle,
                dueDate: assignmentJson.dueDate ? new Date(assignmentJson.dueDate) : null,
                maxScore: assignmentJson.maxScore,
                type: 'assignment' as const
            };
        }),
        ...allQuizzes.map(q => {
            const quizJson = q.toJSON() as any;
            const dueDateQuiz = (quizJson as any).dueDate ? new Date((quizJson as any).dueDate) : null;
            return {
                id: quizJson.id,
                tittle: quizJson.tittle,
                dueDate: dueDateQuiz,
                maxScore: quizJson.maxScore ?? quizJson.totalPoints ?? 0,
                type: 'quiz' as const
            };
        })
      ];
      gradebookItemsRaw.sort((a, b) => {
          const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          return dateB - dateA;
      });
      const totalItems = gradebookItemsRaw.length;
      const totalPages = Math.ceil(totalItems / limit);
      const offset = (page - 1) * limit;
      const paginatedItems = gradebookItemsRaw.slice(offset, offset + limit);
      if (paginatedItems.length === 0) {
           return {
               items: [],
               totalItems: 0,
               totalPages: 0,
               currentPage: page,
           };
      }
      const assignmentIdsOnPage = paginatedItems.filter(item => item.type === 'assignment').map(item => item.id);
      const quizIdsOnPage = paginatedItems.filter(item => item.type === 'quiz').map(item => item.id);
      const userMatchClause: any = [
        { enrollmentId: enrollmentId }
      ];
      if (userGroupId) {
        userMatchClause.push({ groupId: userGroupId });
      }
      const submissions = await Submission.findAll({
        where: {
          [Op.and]: [
            { [Op.or]: userMatchClause },
            {
              [Op.or]: [
                { assignmentId: { [Op.in]: assignmentIdsOnPage } },
                { quizId: { [Op.in]: quizIdsOnPage } }
              ]
            }
          ]
        },
        attributes: ['id', 'assignmentId', 'quizId', 'grade', 'submittedAt', 'status']
      });
      const submissionMap = new Map<string, Submission>();
      submissions.forEach(sub => {
        const key = sub.assignmentId || sub.quizId;
        if (!key) return;
        const existing = submissionMap.get(key);
        if (!existing) {
          submissionMap.set(key, sub);
          return;
        }
        if (sub.status === 'draft' && existing.status !== 'draft') {
          submissionMap.set(key, sub);
          return;
        }
        if (sub.status === 'submitted' && existing.status === 'graded') {
          submissionMap.set(key, sub);
          return;
        }
        if (sub.status === existing.status && sub.submittedAt && (!existing.submittedAt || new Date(sub.submittedAt) > new Date(existing.submittedAt))) {
           submissionMap.set(key, sub);
        }
      });
      const gradebookItemsWithStatus = paginatedItems.map(item => {
        const submission = submissionMap.get(item.id);
        const dueDate = item.dueDate ? new Date(item.dueDate) : null;
        const status = getDisplayStatus(
          submission?.status as any || null,
          submission?.submittedAt || null,
          dueDate
        );
        const grade: number | null = (submission && submission.grade !== null) ? parseFloat(submission.grade.toString()) : null;
        const submissionId = submission?.id || null;
        return {
          id: item.id,
          type: item.type,
          tittle: item.tittle,
          dueDate: item.dueDate,
          maxScore: item.maxScore,
          grade: grade,
          status: status,
          submissionId: submissionId,
          submissionStatus: submission?.status || null,
          submittedAt: submission?.submittedAt || null
        };
      });
      return {
        items: gradebookItemsWithStatus,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch (error) {
      handleServiceError(error, "Get Gradebook For Student");
      throw error;
    }
  },

};