import { GlobalTracking, GlobalTrackingCreationAttributes, GlobalTrackingAttributes } from '@interfaces/models'; 
import { FindOptions, WhereOptions } from 'sequelize';

export const globalTrackingRepository = {

  findAll: (options?: FindOptions<GlobalTrackingAttributes>) =>
    GlobalTracking.findAll(options),

  findByUserAndCourse: (userId: string, courseId: string, trackableType?: GlobalTrackingAttributes['trackableType']) => {
    const where: WhereOptions<GlobalTrackingAttributes> = { userId, courseId };
    if (trackableType) {
      where.trackableType = trackableType;
    }

    return GlobalTracking.findAll({ 
      where,
    });
  },

  findOne: (userId: string, trackableType: GlobalTrackingAttributes['trackableType'], trackableId: string) =>
    GlobalTracking.findOne({
      where: { userId, trackableType, trackableId }
    }),

  upsert: (data: GlobalTrackingCreationAttributes) =>
    GlobalTracking.upsert(data),

   delete: (where: WhereOptions<GlobalTrackingAttributes>) =>
    GlobalTracking.destroy({ where }),

};