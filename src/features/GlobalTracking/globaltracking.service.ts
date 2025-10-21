import { handleServiceError } from '@utils/helpers';
import { GlobalTrackingCreationAttributes, GlobalTrackingAttributes, GlobalTracking, Lesson, Module } from '@interfaces/models';
import { globalTrackingRepository } from './globaltracking.repositories';

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
      const updatedRecord = await globalTrackingRepository.findOne( userId, trackableType, trackableId );
      if ( !updatedRecord ) {
        throw new Error( 'Failed to find the record after upsert.' );
      }
      return updatedRecord;
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