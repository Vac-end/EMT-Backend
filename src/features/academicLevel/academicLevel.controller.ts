import { handleServiceError } from '@utils/helpers';
import { academicLevelService } from './academicLevel.service';
import { Request, Response } from 'express';

export const AcademicLevelController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const AcadedemicLevel = await academicLevelService.getAll();
      return res.status( 200 ).json( AcadedemicLevel );
    } catch ( error ) {
      handleServiceError( error, "Get All AcademicLevel" );
      return res.status( 500 ).json( { message: 'Failed to fecth AcademicLevel' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'AcademicLevel ID is required' } );
      const user = await academicLevelService.getById( id );
      if ( !user ) return res.status( 404 ).json( { message: 'AcademicLevel not found' } );
      return res.status( 200 ).json( user );

    } catch ( error ) {
      handleServiceError( error, "Get By Id AcademicLevel" );
      throw error;
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const user = await academicLevelService.create( req.body );
      return res.status( 201 ).json( user );
    } catch ( error ) {
      handleServiceError( error, "Create AcademicLevel" );
      throw error;
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'AcademicLevel ID is required' } );
      const user = await academicLevelService.update( id, req.body );
      if ( !user ) return res.status( 404 ).json( { message: 'AcademicLevel not found' } );
      return res.status( 200 ).json( user );
    } catch ( error ) {
      handleServiceError( error, 'Update AcademicLevel' );
      return res.status( 400 ).json( { message: 'Failed to update AcademicLevel' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'AcademicLevel ID is required' } );
      await academicLevelService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete AcademicLevel' );
      return res.status( 500 ).json( { message: 'Failed to delete AcademicLevel' } );
    }
  },
};
