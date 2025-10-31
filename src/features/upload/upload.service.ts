import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { envConfig } from '@config/env.config';
import { mapMimeTypeToSimpleType } from '@utils/helpers';
import { logger } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
const r2Config = {
  region: 'auto',
  endpoint: envConfig.ENDPOINT_URL,
  credentials: {
    accessKeyId: envConfig.ACCESS_KEY,
    secretAccessKey: envConfig.SECRET_KEY,
  },
  forcePathStyle: true,
};

const s3Client = new S3Client(r2Config);
export interface UploadedFileResponse {
  fileUrl: string;
  fileName: string;
  fileKey: string;
  fileType: ReturnType<typeof mapMimeTypeToSimpleType>;
  fileSize: number;
}

export const uploadService = {
  uploadPublic: async (files: Express.Multer.File[], destination: string): Promise<UploadedFileResponse[]> => {
    try {
      const sanitizedDestination = destination.replace( /[^a-zA-Z0-9-_/]/g, '' );
      const responses = await Promise.all( files.map( async ( file ) => {
        if ( !file.buffer ) throw new Error( 'File buffer is missing' );
        const finalFileName = `${ uuidv4() }-${ file.originalname }`;
        const key = `${ sanitizedDestination }/${ finalFileName }`;
        const uploadParams = {
          Bucket: envConfig.PUBLIC_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: 'inline'
        };
        const command = new PutObjectCommand( uploadParams );
        await s3Client.send( command );
        const url = `https://${ envConfig.DOMAIN }/${ key }`;
        return {
          fileUrl: url,
          fileName: file.originalname,
          fileKey: key,
          fileType: mapMimeTypeToSimpleType( file.mimetype ),
          fileSize: file.size
        };
      } ) );
      return responses;
    } catch (error) {
      console.error('Service error:', error);
      logger.error('Error uploading to public bucket:', error);
      throw new Error('Failed to upload to public bucket');
    }
  },

  deletePublicByKey: async (key: string): Promise<void> => {
    try {
      const deleteParams = {
        Bucket: envConfig.PUBLIC_BUCKET_NAME,
        Key: key,
      };
      const command = new DeleteObjectCommand(deleteParams);
      await s3Client.send(command);
      logger.info(`File deleted from public bucket: ${key}`);
    } catch (error) {
      logger.error('Error deleting from public bucket:', error);
      throw new Error('Failed to delete from public bucket');
    }
  },
  
  deletePublic: async (destination: string, fileName: string): Promise<void> => {
    try {
      const sanitizedDestination = destination.replace(/[^a-zA-Z0-9-_/]/g, '');
      const key = `${sanitizedDestination}/${fileName}`;
      const deleteParams = {
        Bucket: envConfig.PUBLIC_BUCKET_NAME,
        Key: key,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await s3Client.send(command);
      logger.info(`File deleted from public bucket: ${key}`);
    } catch (error) {
      logger.error('Error deleting from public bucket:', error);
      throw new Error('Failed to delete from public bucket');
    }
  },

  uploadPrivate: async (files: Express.Multer.File[], userId: string, destination: string): Promise<string[]> => {
    try {
      const sanitizedDestination = destination.replace(/[^a-zA-Z0-9-_/]/g, '');
      const keys = await Promise.all(files.map(async (file) => {
        const fileName = `${uuidv4()}-${file.originalname}`;
        const key = `${sanitizedDestination}/${fileName}`;
        const uploadParams = {
          Bucket: envConfig.PRIVATE_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        logger.info(`File uploaded to private bucket for user ${userId}: ${key}`);
        return key;
      }));
      return keys;
    } catch (error) {
      logger.error('Error uploading to private bucket:', error);
      throw new Error('Failed to upload to private bucket');
    }
  },
  deletePrivate: async (userId: string, destination: string, fileName: string): Promise<void> => {
    try {
      const sanitizedDestination = destination.replace(/[^a-zA-Z0-9-_/]/g, '');
      const key = `${sanitizedDestination}/${fileName}`;
      const deleteParams = {
        Bucket: envConfig.PRIVATE_BUCKET_NAME,
        Key: key,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await s3Client.send(command);
      logger.info(`File deleted from private bucket for user ${userId}: ${key}`);
    } catch (error) {
      logger.error('Error deleting from private bucket:', error);
      throw new Error('Failed to delete from private bucket');
    }
  },

  getSignedUrlForSession: async (userId: string, key: string): Promise<string> => {
    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: envConfig.PRIVATE_BUCKET_NAME,
        Key: key.startsWith('/') ? key.slice(1) : key,
      });
      const signedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 }); // 1 hora
      logger.info(`Signed URL generated for user ${userId}: ${signedUrl}`);
      return signedUrl;
    } catch (error) {
      logger.error('Error generating signed URL:', error);
      throw new Error('Failed to generate signed URL');
    }
  },
};