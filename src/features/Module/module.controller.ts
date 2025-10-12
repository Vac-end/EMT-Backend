import { Request , Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { ModuleService } from './module.service';

export const ModuleController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const Modules = await ModuleService.getAll();
      return res.status( 200 ).json( Modules );
    } catch ( error ) {
      handleServiceError( error, 'Get All Module' );
      return res.status( 500 ).json( { message: 'Failed to fetch Module' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Module ID is required' } );
      const Module = await ModuleService.getById( id );
      if ( !Module ) return res.status( 404 ).json( { message: 'Module not found' } );
      return res.status( 200 ).json( Module );
    } catch ( error ) {
      handleServiceError( error, 'Get Module by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Module' } );
    }
  },

  getByCourseId: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const Module = await ModuleService.getByCourseId( courseId );
      if ( !Module ) return res.status( 404 ).json( { message: 'Module not found' } );
      return res.status( 200 ).json( Module );
    } catch ( error ) {
      handleServiceError( error, 'Get Module by Course ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch Module' } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const Module = await ModuleService.create( req.body );
      return res.status( 201 ).json( Module );
    } catch ( error ) {
      handleServiceError( error, 'Create Module' );
      return res.status( 400 ).json( { message: 'Failed to create Module' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Module ID is required' } );
      const Module = await ModuleService.update( id, req.body );
      if ( !Module ) return res.status( 404 ).json( { message: 'Module not found' } );
      return res.status( 200 ).json( Module );
    } catch ( error ) {
      handleServiceError( error, 'Update Module' );
      return res.status( 400 ).json( { message: 'Failed to update Module' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Module ID is required' } );
      await ModuleService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete Module' );
      return res.status( 500 ).json( { message: 'Failed to delete Module' } );
    }
  },
};