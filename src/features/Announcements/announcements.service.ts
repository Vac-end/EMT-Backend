import { handleServiceError } from '@utils/helpers';
import { announcementRepository } from './announcements.repositories';
import { AnnouncementCreationAttributes, Announcement } from './model/announcements.model';
import { FindOptions, Op } from 'sequelize';
import { GlobalTracking, User } from '@interfaces/models';

export const announcementService = {
  getAll: async () => {
    try {
      const announcements = await announcementRepository.findAll();
      return announcements;
    } catch ( error ) {
      handleServiceError( error, "Get All Announcements" );
      throw error;
    }
  },

  getByCourseId: async ( courseId: string, userId: string, page: number = 1, limit: number = 10 ) => {
    try {
      const offset = ( page - 1 ) * limit;
      const options: FindOptions = {
          limit,
          offset,
          include: [{ model: User, as: 'AnnouncementCreator', attributes: ['id', 'name'] }],
          order: [['createdAt', 'DESC']]
      };
      const { count, rows: announcements } = await Announcement.findAndCountAll({
        where: { courseId },
        ...options
      });


      if (announcements.length === 0) {
          return {
              announcements: [],
              totalItems: 0,
              totalPages: 0,
              currentPage: page,
          };
      }
      const announcementIds = announcements.map(ann => ann.id);
      const readRecords = await GlobalTracking.findAll({
        where: {
          userId: userId,
          trackableType: 'announcement',
          trackableId: { [Op.in]: announcementIds },
        },
        attributes: ['trackableId']
      });
      const readAnnouncementIds = new Set(readRecords.map(r => r.trackableId));
      const announcementsWithStatus = announcements.map(ann => {
        const annJson = ann.toJSON();
        return {
          ...annJson,
          creatorName: (annJson as any).AnnouncementCreator?.name || 'Sistema',
          isRead: readAnnouncementIds.has(ann.id)
        };
      });
      return {
        announcements: announcementsWithStatus,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch ( error ) {
      handleServiceError( error, "Get Announcements By Course ID" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const announcement = await announcementRepository.findById( id );
      if ( !announcement ) throw new Error( 'Announcement not found' );
      const annJson = announcement.toJSON();
       return {
          ...annJson,
          creatorName: (annJson as any).AnnouncementCreator?.name || 'Sistema',
      };
    } catch ( error ) {
      handleServiceError( error, "Get Announcement By ID" );
      throw error;
    }
  },

  create: async ( data: AnnouncementCreationAttributes ) => {
    try {
      const newAnnouncement = await announcementRepository.create( data );
      return announcementRepository.findById(newAnnouncement.id);
    } catch ( error ) {
      handleServiceError( error, "Create Announcement" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<AnnouncementCreationAttributes> ) => {
    try {
      const [ affectedCount ] = await announcementRepository.update( id, data );
      if ( affectedCount === 0 ) throw new Error( 'Announcement not found or no changes made' );
      return await announcementRepository.findById( id );
    } catch ( error ) {
      handleServiceError( error, "Update Announcement" );
      throw error;
    }
  },

  delete: async ( id: string ) => {
    try {
      const announcement = await announcementRepository.findById( id );
      if ( !announcement ) throw new Error( 'Announcement not found' );
      const deletedCount = await announcementRepository.delete( id );
      if ( deletedCount === 0 ) { throw new Error( 'Announcement not found' ); }
      return { message: 'Announcement deleted successfully' };
    } catch ( error ) {
      handleServiceError( error, "Delete Announcement" );
      throw error;
    }
  }
};