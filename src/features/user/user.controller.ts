import { handleServiceError } from '@utils/helpers';
import { Request, Response } from 'express';
import { userService } from './user.service';


export const userController = {
  getAll: async ( _req: Request, res: Response ) => {
    try {
      const users = await userService.getAll();
      return res.status( 200 ).json( users );
    } catch ( error ) {
      handleServiceError( error, 'Get All Users' );
      return res.status( 500 ).json( { message: 'Failed to fetch users' } );
    }
  },
  getById: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'User ID is required' } );
      const user = await userService.getById( id );
      if ( !user ) return res.status( 404 ).json( { message: 'User not found' } );
      return res.status( 200 ).json( user );
    } catch ( error ) {
      handleServiceError( error, 'Get User by ID' );
      return res.status( 500 ).json( { message: 'Failed to fetch user' } );
    }
  },
  create: async ( req: Request, res: Response ) => {
    try {
      const user = await userService.create( req.body );
      return res.status( 201 ).json( user );
    } catch ( error ) {
      handleServiceError( error, 'Create User' );
      return res.status( 400 ).json( { message: 'Failed to create user' } );
    }
  },
  update: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'User ID is required' } );
      const user = await userService.update( id, req.body );
      if ( !user ) return res.status( 404 ).json( { message: 'User not found' } );
      return res.status( 200 ).json( user );
    } catch ( error ) {
      handleServiceError( error, 'Update User' );
      return res.status( 400 ).json( { message: 'Failed to update user' } );
    }
  },
  delete: async ( req: Request, res: Response ) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'User ID is required' } );
      await userService.delete( id );
      return res.status( 204 ).send();
    } catch ( error ) {
      handleServiceError( error, 'Delete User' );
      return res.status( 500 ).json( { message: 'Failed to delete user' } );
    }
  },
  getByRole: async ( req: Request, res: Response ) => {
    try {
      const users = await userService.getByRole( req.params.role as 'estudiante' | 'docente' | 'administrador' );
      return res.status( 200 ).json( users );
    } catch ( error ) {
      handleServiceError( error, 'Get Users by Role' );
      return res.status( 500 ).json( { message: 'Failed to fetch users by role' } );
    }
  },
};