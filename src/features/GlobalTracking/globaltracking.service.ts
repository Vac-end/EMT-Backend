import { handleServiceError } from '@utils/helpers';
import { GlobalTrackingCreationAttributes, GlobalTrackingAttributes, GlobalTracking, Lesson, Module, CourseContent, Quiz, Assignment } from '@interfaces/models';
import { globalTrackingRepository } from './globaltracking.repositories';
import { Op } from 'sequelize';

async function checkAndCompleteLesson(userId: string, courseId: string, lessonId: string): Promise<string> {
  const contents = await CourseContent.findAll({ where: { lessonId }, attributes: ['id'] });
  const totalTrackableItems = contents.length;
  if (totalTrackableItems === 0) {
    const lessonRecord = await globalTrackingRepository.findOne(userId, 'lesson', lessonId);
    if (lessonRecord?.status === 'viewed') { 
        await globalTrackingRepository.upsert({
            userId, courseId, 
            trackableType: 'lesson', 
            trackableId: lessonId, 
            status: 'completed', 
            completedAt: new Date()
        });
        return 'completed';
    }
    return lessonRecord?.status || 'not_started';
  }
  const contentIds = contents.map(c => c.id);
  const completedItems = await GlobalTracking.count({
    where: {
      userId: userId,
      courseId: courseId,
      status: { [Op.in]: ['viewed', 'completed', 'submitted'] }, 
      trackableType: 'course_content',
      trackableId: { [Op.in]: contentIds }
    }
  });
  if (completedItems >= totalTrackableItems) {
    await globalTrackingRepository.upsert({
        userId, courseId, 
        trackableType: 'lesson', 
        trackableId: lessonId, 
        status: 'completed', 
        completedAt: new Date()
    });
    return 'completed';
  }
  const currentLessonRecord = await globalTrackingRepository.findOne(userId, 'lesson', lessonId);
  return currentLessonRecord?.status || 'not_started';
}

export const globalTrackingService = {
  getUserProgressInCourse: async ( userId: string, courseId: string, trackableType?: GlobalTrackingAttributes[ 'trackableType' ] ) => {
    try {
      const progressRecords = await globalTrackingRepository.findByUserAndCourse( userId, courseId, trackableType );
      return progressRecords;
    } catch ( error ) {
      handleServiceError( error, "Get User Progress In Course" );
      throw error;
    }
  },

  updateProgress: async ( userId: string, courseId: string, trackableType: GlobalTrackingAttributes[ 'trackableType' ], trackableId: string, status: GlobalTrackingAttributes[ 'status' ] ) => {
    try {
      const dataToUpsert: GlobalTrackingCreationAttributes = {
        userId, courseId, trackableType, trackableId, status, completedAt: status === 'completed' ? new Date() : null
      };
      await globalTrackingRepository.upsert( dataToUpsert );
      let parentLessonId: string | null = null;
      let finalLessonStatus: string | null = null;
      const itemTypes: string[] = ['course_content', 'quiz', 'assignment']; 
      if (trackableType === 'lesson') {
          parentLessonId = trackableId;
      } else if (itemTypes.includes(trackableType)) {
          if (trackableType === 'course_content') {
              const item = await CourseContent.findByPk(trackableId, { attributes: ['lessonId'] });
              parentLessonId = item?.lessonId || null;
          } else if (trackableType === 'assignment') {
              const item = await Assignment.findByPk(trackableId, { attributes: ['lessonId'] });
              parentLessonId = item?.lessonId || null;
          } else if (trackableType === 'quiz') {
              const item = await Quiz.findByPk(trackableId, { attributes: ['lessonId'] });
              parentLessonId = item?.lessonId || null;
          }
      }
      if (parentLessonId) {
        finalLessonStatus = await checkAndCompleteLesson(userId, courseId, parentLessonId);
      }

      const updatedRecord = await globalTrackingRepository.findOne( userId, trackableType, trackableId );
      if (trackableType === 'lesson') {
         return {
            updatedItem: updatedRecord,
            parentLessonStatus: finalLessonStatus,
            parentLessonId: parentLessonId
         };
      }
      return { 
          updatedItem: updatedRecord, 
          parentLessonStatus: (parentLessonId && itemTypes.includes(trackableType)) ? finalLessonStatus : null,
          parentLessonId: (parentLessonId && itemTypes.includes(trackableType)) ? parentLessonId : null
      };
    } catch ( error ) {
      handleServiceError( error, "Update Progress" );
      throw error;
    }
  },

  calculateLessonCompletionPercentage: async ( userId: string, courseId: string ): Promise<number> => {
    try {
      const completedLessons = await GlobalTracking.count( {
        where: { userId, courseId, trackableType: 'lesson', status: 'completed' }
      } );
      const totalLessons = await Lesson.count( {
        include: [ {
          model: Module, as: 'LessonModule', where: { courseId: courseId }, attributes: [], required: true
        } ]
      } );
      if ( totalLessons === 0 ) {
        return 0;
      }
      const percentage = ( completedLessons / totalLessons ) * 100;
      return Math.round( percentage );
    } catch ( error ) {
      handleServiceError( error, "Calculate Lesson Completion Percentage" );
      throw error;
    }
  }
};