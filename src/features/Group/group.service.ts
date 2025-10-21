import { handleServiceError } from '@utils/helpers';
import { GroupCreationAttributes, Enrollment, Group, Course } from '@interfaces/models'; // Importa Enrollment también
import { Op } from 'sequelize'; // Para consultas
import { groupRepository } from './group.repositories';

export const groupService = {
  getGroupsByCourse: async ( courseId: string ) => {
    try {
      const groups = await groupRepository.findAllByCourseId( courseId );
      return groups;
    } catch ( error ) {
      handleServiceError( error, "Get Groups By Course" );
      throw error;
    }
  },

  getAvailableGroupsByCourse: async ( courseId: string ) => {
    try {
      const availableGroups = await groupRepository.findAvailableByCourseId( courseId );
      const groupsWithSpace = [];
      for ( const group of availableGroups ) {
        if ( group.maxMembers === null ) {
          groupsWithSpace.push( group );
        } else {
          const memberCount = await groupRepository.countMembers( group.id );
          if ( memberCount < group.maxMembers ) {
            groupsWithSpace.push( group );
          }
        }
      }
      return groupsWithSpace;
    } catch ( error ) {
      handleServiceError( error, "Get Available Groups By Course" );
      throw error;
    }
  },

  getGroupById: async ( groupId: string ) => {
    try {
      const group = await groupRepository.findById( groupId );
      if ( !group ) throw new Error( 'Group not found' );
      return group;
    } catch ( error ) {
      handleServiceError( error, "Get Group By ID" );
      throw error;
    }
  },

  createGroup: async ( courseId: string, data: GroupCreationAttributes ) => {
    try {
      const course = await Course.findByPk( courseId, { attributes: [ 'id', 'groupsEnabled' ] } );
      if ( !course ) {
        throw new Error( 'Course not found' );
      }
      if ( !course.groupsEnabled ) {
        throw new Error( 'Groups are not enabled for this course' );
      }
      const newGroup = await groupRepository.create( { ...data, courseId } );
      return groupRepository.findById( newGroup.id );
    } catch ( error ) {
      handleServiceError( error, "Create Group" );
      throw error;
    }
  },

  updateGroup: async ( groupId: string, data: Partial<GroupCreationAttributes> ) => {
    try {
      const group = await groupRepository.findById( groupId );
      if ( !group ) throw new Error( 'Group not found' );
      const course = await Course.findByPk( group.courseId );
      if ( !course ) throw new Error( 'Associated course not found' );
      const [ affectedCount ] = await groupRepository.update( groupId, data );
      if ( affectedCount === 0 ) throw new Error( 'Group not found or no changes made' );
      return groupRepository.findById( groupId );
    } catch ( error ) {
      handleServiceError( error, "Update Group" );
      throw error;
    }
  },

  deleteGroup: async ( groupId: string ) => {
    try {
      const deletedCount = await groupRepository.delete( groupId );
      if ( deletedCount === 0 ) throw new Error( 'Group not found' );
      return { message: 'Group deleted successfully' };
    } catch ( error ) {
      handleServiceError( error, "Delete Group" );
      throw error;
    }
  },

  joinGroup: async ( groupId: string, userId: string, courseId: string ) => {
    try {
      const group = await groupRepository.findById( groupId );
      if ( !group ) throw new Error( 'Group not found' );
      if ( group.courseId !== courseId ) throw new Error( 'Group does not belong to this course' );
      if ( !group.isOpenForJoin ) throw new Error( 'Joining this group is currently closed' );
      const currentEnrollment = await Enrollment.findOne( { where: { userId, courseId } } );
      if ( !currentEnrollment ) throw new Error( 'User is not enrolled in this course' );
      if ( currentEnrollment.groupId ) throw new Error( 'User is already in a group for this course' );
      if ( group.maxMembers !== null ) {
        const memberCount = await groupRepository.countMembers( groupId );
        if ( memberCount >= group.maxMembers ) {
          throw new Error( 'Group has reached its maximum member limit' );
        }
      }
      await currentEnrollment.update( { groupId: groupId } );
      return groupRepository.findById( groupId );
    } catch ( error ) {
      handleServiceError( error, "Join Group" );
      throw error;
    }
  },

  leaveGroup: async ( userId: string, courseId: string ) => {
    try {
      const enrollment = await Enrollment.findOne( { where: { userId, courseId } } );
      if ( !enrollment ) throw new Error( 'User is not enrolled in this course' );
      if ( !enrollment.groupId ) throw new Error( 'User is not currently in a group for this course' );

      const groupId = enrollment.groupId;
      await enrollment.update( { groupId: null } );
      return groupRepository.findById( groupId );
    } catch ( error ) {
      handleServiceError( error, "Leave Group" );
      throw error;
    }
  },

  manageMembers: async ( groupId: string, userIds: string[] ) => {
    try {
      const group = await groupRepository.findById( groupId );
      if ( !group ) throw new Error( 'Group not found' );
      const courseId = group.courseId;
      const currentMemberCountResult = await Enrollment.findAndCountAll( {
        where: { groupId: groupId, userId: { [ Op.notIn ]: userIds } }
      } );
      const currentMemberCount = currentMemberCountResult.count;
      if ( group.maxMembers !== null && ( currentMemberCount + userIds.length ) > group.maxMembers ) {
        throw new Error( `Assigning ${ userIds.length } members would exceed the group limit of ${ group.maxMembers } (current: ${ currentMemberCount })` );
      }
      await Enrollment.update(
        { groupId: null }, { where: { userId: { [ Op.in ]: userIds }, courseId: courseId } }
      );
      await Enrollment.update(
        { groupId: groupId },
        { where: { userId: { [ Op.in ]: userIds }, courseId: courseId } }
      );
      return groupRepository.findById( groupId );
    } catch ( error ) {
      handleServiceError( error, "Manage Group Members" );
      throw error;
    }
  },

  toggleJoinStatus: async ( groupId: string ): Promise<Group | null> => {
    try {
      const group = await groupRepository.findById( groupId );
      if ( !group ) throw new Error( 'Group not found' );
      const newStatus = !group.isOpenForJoin;
      await group.update( { isOpenForJoin: newStatus } );
      group.isOpenForJoin = newStatus;
      return group;
    } catch ( error ) {
      handleServiceError( error, "Toggle Group Join Status" );
      throw error;
    }
  }
};