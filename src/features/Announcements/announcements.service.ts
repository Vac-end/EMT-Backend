import { handleServiceError } from '@utils/helpers';
import { announcementRepository } from './announcements.repositories';
import { AnnouncementCreationAttributes } from './model/announcements.model';

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

  getByCourseId: async ( courseId: string, page: number = 1, limit: number = 10 ) => {
    try {
      const offset = ( page - 1 ) * limit;
      const announcements = await announcementRepository.findByCourseId( courseId, { limit, offset } );
      return announcements;
    } catch ( error ) {
      handleServiceError( error, "Get Announcements By Course ID" );
      throw error;
    }
  },

  getById: async ( id: string ) => {
    try {
      const announcement = await announcementRepository.findById( id );
      if ( !announcement ) throw new Error( 'Announcement not found' );
      return announcement;
    } catch ( error ) {
      handleServiceError( error, "Get Announcement By ID" );
      throw error;
    }
  },

  create: async ( data: AnnouncementCreationAttributes ) => {
    try {
      const newAnnouncement = await announcementRepository.create( data );
      return newAnnouncement;
    } catch ( error ) {
      handleServiceError( error, "Create Announcement" );
      throw error;
    }
  },

  update: async ( id: string, data: Partial<AnnouncementCreationAttributes> ) => {
    try {
      const announcement = await announcementRepository.findById( id );
      if ( !announcement ) throw new Error( 'Announcement not found' );
      const [ affectedCount, updatedAnnouncements ] = await announcementRepository.update( id, data );
      if ( affectedCount === 0 ) throw new Error( 'Announcement not found or no changes made' );
      return updatedAnnouncements ? updatedAnnouncements[ 0 ] : await announcementRepository.findById( id );
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