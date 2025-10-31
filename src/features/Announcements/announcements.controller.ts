import { handleServiceError } from '@utils/helpers'; // Tu helper
import { Request, Response } from 'express';
import { announcementService } from './announcements.service';
import { AnnouncementCreationAttributes } from './model/announcements.model';

export const AnnouncementController = {
  getByCourseIdPaginated: async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      const userId = (req as any).user?.sub;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      if (!courseId) {
        return res.status(400).json({ message: 'Course ID is required.' });
      }
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
      const result = await announcementService.getByCourseId(courseId, userId, page, limit);
      return res.status(200).json(result);
    } catch (error) {
      handleServiceError(error, 'Get Paginated Announcements by Course');
      return res.status(500).json({ message: 'Failed to fetch announcements.' });
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Announcement ID is required' } );
      const announcement = await announcementService.getById( id );
      return res.status( 200 ).json( announcement );
    } catch ( error: any ) {
      handleServiceError( error, 'Get Announcement by ID' );
      return res.status( error.message === 'Announcement not found' ? 404 : 500 ).json( { message: error.message || 'Failed to fetch announcement' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const userId = ( req as any ).user?.sub;
      if ( !userId ) {
        return res.status( 401 ).json( { message: 'User not authenticated' } );
      }
      const announcementData: AnnouncementCreationAttributes = {
        ...req.body,
        userId: userId 
      };
      const newAnnouncement = await announcementService.create( announcementData );
      return res.status( 201 ).json( newAnnouncement );
    } catch ( error: any ) {
      handleServiceError( error, 'Create Announcement' );
      return res.status( 400 ).json( { message: error.message || 'Failed to create announcement' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Announcement ID is required' } );
      const dataToUpdate: Partial<AnnouncementCreationAttributes> = req.body;
      const updatedAnnouncement = await announcementService.update( id, dataToUpdate );
      return res.status( 200 ).json( updatedAnnouncement );
    } catch ( error: any ) {
      handleServiceError( error, 'Update Announcement' );
      return res.status( 400 ).json( { message: error.message || 'Failed to update announcement' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Announcement ID is required' } );

      await announcementService.delete( id );
      return res.status( 200 ).json( { message: 'Announcement deleted successfully' } );
    } catch ( error: any ) {
      handleServiceError( error, 'Delete Announcement' );
      return res.status( 500 ).json( { message: error.message || 'Failed to delete announcement' } );
    }
  },
};