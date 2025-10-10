import { Request, Response } from 'express';
import { uploadService } from './upload.service';
import { handleServiceError } from '@utils/helpers';

export const publicController = {
  uploadPublicFile: async (req: Request, res: Response) => {
    try {
      console.log('Request files:', req.files); // Depuración
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: 'Files are required' });
      }

      const files = req.files as Express.Multer.File[];
      console.log('Files array:', files); // Depuración
      const { destination } = req.body;
      if (!destination) return res.status(400).json({ message: 'Destination is required' });

      console.log('Destination:', destination); // Depuración
      const urls = await uploadService.uploadPublic(files, destination);
      return res.status(200).json({ message: 'Files uploaded successfully', urls });
    } catch (error) {
      console.error('Controller error:', error); // Depuración
      handleServiceError(error, 'Upload Public File');
      return res.status(400).json({ message: 'Failed to upload public files' });
    }
  },

  deletePublicFile: async (req: Request, res: Response) => {
    try {
      const { destination, fileName } = req.body;
      if (!destination || !fileName) return res.status(400).json({ message: 'Destination and fileName are required' });

      await uploadService.deletePublic(destination, fileName);
      return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      handleServiceError(error, 'Delete Public File');
      return res.status(400).json({ message: 'Failed to delete public file' });
    }
  },
};