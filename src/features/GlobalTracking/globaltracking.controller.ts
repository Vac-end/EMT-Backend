import { handleServiceError } from '@utils/helpers';
import { Request, Response } from 'express';
import { GlobalTrackingAttributes } from '@interfaces/models';
import { globalTrackingService } from './globaltracking.service';

export const GlobalTrackingController = {
  getUserProgressInCourse: async ( req: Request, res: Response ) => {
    try {
      const { courseId, userId } = req.params;
      const trackableType = req.query.type as GlobalTrackingAttributes[ 'trackableType' ] | undefined;
      if ( !courseId || !userId ) {
        return res.status( 400 ).json( { message: 'Course ID and User ID are required parameters.' } );
      }
      const requestingUserId = ( req as any ).user?.sub;
      if ( userId !== requestingUserId ) {
        return res.status( 403 ).json( { message: 'Forbidden: You can only view your own progress.' } );
      }
      const progress = await globalTrackingService.getUserProgressInCourse( userId, courseId, trackableType );
      return res.status( 200 ).json( progress );
    } catch ( error ) {
      handleServiceError( error, 'Get User Progress In Course' );
      return res.status( 500 ).json( { message: 'Failed to fetch progress' } );
    }
  },

  updateProgress: async ( req: Request, res: Response ) => {
    try {
      const userId = ( req as any ).user?.sub;
      if ( !userId ) {
        return res.status( 401 ).json( { message: 'User not authenticated' } );
      }
      const { courseId, trackableType, trackableId, status } = req.body as {
        courseId: string, trackableType: GlobalTrackingAttributes[ 'trackableType' ], trackableId: string, status: GlobalTrackingAttributes[ 'status' ];
      };
      const updatedRecord = await globalTrackingService.updateProgress( userId, courseId, trackableType, trackableId, status );
      return res.status( 200 ).json( updatedRecord );
    } catch ( error ) {
      handleServiceError( error, 'Update Progress' );
      return res.status( 400 ).json( { message: 'Failed to update progress' } );
    }
  },

  getLessonCompletionPercentage: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      const userId = ( req as any ).user?.sub;
      if ( !userId ) return res.status( 401 ).json( { message: 'User not authenticated' } );
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const percentage = await globalTrackingService.calculateLessonCompletionPercentage( userId, courseId );
      return res.status( 200 ).json( { percentage } );
    } catch ( error ) {
      handleServiceError( error, 'Get Lesson Completion Percentage' );
      return res.status( 500 ).json( { message: 'Failed to calculate completion percentage' } );
    }
  }
};