import { handleServiceError } from '@utils/helpers';
import { Request, Response } from 'express';
import { groupService } from './group.service';
import { GroupCreationAttributes } from '@interfaces/models';

export const GroupController = {
  getByCourse: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const requestingUserRole = ( req as any ).user?.role;
      let groups;
      if ( requestingUserRole === 'estudiante' ) {
        groups = await groupService.getAvailableGroupsByCourse( courseId );
      } else {
        groups = await groupService.getGroupsByCourse( courseId );
      }
      return res.status( 200 ).json( groups );
    } catch ( error ) {
      handleServiceError( error, 'Get Groups by Course' );
      return res.status( 500 ).json( { message: 'Failed to fetch groups' } );
    }
  },

  getById: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const group = await groupService.getGroupById( groupId );
      return res.status( 200 ).json( group );
    } catch ( error: any ) {
      handleServiceError( error, 'Get Group by ID' );
      return res.status( error.message === 'Group not found' ? 404 : 500 ).json( { message: error.message } );
    }
  },

  create: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const groupData: GroupCreationAttributes = req.body;
      const newGroup = await groupService.createGroup( courseId, groupData );
      return res.status( 201 ).json( newGroup );
    } catch ( error ) {
      handleServiceError( error, 'Create Group' );
      return res.status( 400 ).json( { message: 'Failed to create group' } );
    }
  },

  update: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const groupData: Partial<GroupCreationAttributes> = req.body;
      const updatedGroup = await groupService.updateGroup( groupId, groupData );
      return res.status( 200 ).json( updatedGroup );
    } catch ( error ) {
      handleServiceError( error, 'Update Group' );
      return res.status( 400 ).json( { message: 'Failed to update group' } );
    }
  },

  delete: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const result = await groupService.deleteGroup( groupId );
      return res.status( 200 ).json( result );
    } catch ( error ) {
      handleServiceError( error, 'Delete Group' );
      return res.status( 500 ).json( { message: 'Failed to delete group' } );
    }
  },

  join: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      const userId = ( req as any ).user?.sub;
      const { courseId } = req.body;
      if ( !userId ) return res.status( 401 ).json( { message: 'User not authenticated' } );
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required in body' } );
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const updatedGroup = await groupService.joinGroup( groupId, userId, courseId );
      return res.status( 200 ).json( updatedGroup );
    } catch ( error ) {
      handleServiceError( error, 'Join Group' );
      return res.status( 400 ).json( { message: 'Failed to join group' } );
    }
  },

  leave: async ( req: Request, res: Response ) => {
    try {
      const { courseId } = req.params;
      const userId = ( req as any ).user?.sub;
      if ( !userId ) return res.status( 401 ).json( { message: 'User not authenticated' } );
      if ( !courseId ) return res.status( 400 ).json( { message: 'Course ID is required' } );
      const result = await groupService.leaveGroup( userId, courseId );
      return res.status( 200 ).json( result );
    } catch ( error ) {
      handleServiceError( error, 'Leave Group' );
      return res.status( 400 ).json( { message: 'Failed to leave group' } );
    }
  },

  manageMembers: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      const { userIds } = req.body;
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const updatedGroup = await groupService.manageMembers( groupId, userIds );
      return res.status( 200 ).json( updatedGroup );
    } catch ( error ) {
      handleServiceError( error, 'Manage Group Members' );
      return res.status( 400 ).json( { message: 'Failed to manage members' } );
    }
  },

  toggleJoin: async ( req: Request, res: Response ) => {
    try {
      const { groupId } = req.params;
      if ( !groupId ) return res.status( 400 ).json( { message: 'Group ID is required' } );
      const updatedGroup = await groupService.toggleJoinStatus( groupId );
      return res.status( 200 ).json( updatedGroup );
    } catch ( error ) {
      handleServiceError( error, 'Toggle Group Join Status' );
      return res.status( 500 ).json( { message: 'Failed to toggle join status' } );
    }
  }
};