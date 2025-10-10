import { Request, Response } from 'express';
import { uploadService } from './upload.service';
import { handleServiceError } from '@utils/helpers';


export const privateController = {
  uploadPrivateFile: async (req: Request, res: Response) => {
    try {
      if (!req.files || !Array.isArray(req.files)) return res.status(400).json({ message: 'Files are required' });

      const files = req.files as Express.Multer.File[];
      const { id: userId } = req.user || {};
      const { destination } = req.body;
      if (!userId) return res.status(400).json({ message: 'UserId is required' });
      if (!destination) return res.status(400).json({ message: 'Destination is required' });

      const keys = await uploadService.uploadPrivate(files, userId, destination);
      return res.status(200).json({ message: 'Files uploaded successfully', keys });
    } catch (error) {
      handleServiceError(error, 'Upload Private File');
      return res.status(400).json({ message: 'Failed to upload private files' });
    }
  },

  deletePrivateFile: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user || {};
      const { destination, fileName } = req.body;
      if (!userId) return res.status(400).json({ message: 'UserId is required' });
      if (!destination || !fileName) return res.status(400).json({ message: 'Destination and fileName are required' });

      await uploadService.deletePrivate(userId, destination, fileName);
      return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      handleServiceError(error, 'Delete Private File');
      return res.status(400).json({ message: 'Failed to delete private file' });
    }
  },

  getSignedUrlForSession: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user || {};
      const { key } = req.body;
      if (!key) return res.status(400).json({ message: 'Key is required' });

      const signedUrl = await uploadService.getSignedUrlForSession(userId, key);
      return res.status(200).json({ message: 'Signed URL generated', signedUrl });
    } catch (error) {
      handleServiceError(error, 'Get Signed URL');
      return res.status(400).json({ message: 'Failed to generate signed URL' });
    }
  },
};