import { GlobalTracking, GlobalTrackingCreationAttributes, GlobalTrackingAttributes } from '@interfaces/models'; 
import { FindOptions, WhereOptions } from 'sequelize';

export const globalTrackingRepository = {

  /**
   * Finds all tracking records matching the criteria.
   */
  findAll: (options?: FindOptions<GlobalTrackingAttributes>) =>
    GlobalTracking.findAll(options),

  /**
   * Finds tracking records for a specific user and course, optionally filtered by type.
   */
  findByUserAndCourse: (userId: string, courseId: string, trackableType?: GlobalTrackingAttributes['trackableType']) => {
    const where: WhereOptions<GlobalTrackingAttributes> = { userId, courseId };
    if (trackableType) {
      where.trackableType = trackableType;
    }

    return GlobalTracking.findAll({ 
      where,
      // Example: include: [{ model: User, as: 'TrackingUser' }] 
    });
  },

  /**
   * Finds a single specific tracking record.
   */
  findOne: (userId: string, trackableType: GlobalTrackingAttributes['trackableType'], trackableId: string) =>
    GlobalTracking.findOne({
      where: { userId, trackableType, trackableId }
    }),

  /**
   * Creates or updates a tracking record based on the unique key.
   */
  upsert: (data: GlobalTrackingCreationAttributes) =>
    GlobalTracking.upsert(data),

   /**
    * Deletes tracking records matching the criteria.
    */
   delete: (where: WhereOptions<GlobalTrackingAttributes>) =>
    GlobalTracking.destroy({ where }),

};