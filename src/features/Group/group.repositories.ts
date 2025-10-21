import { Group, GroupCreationAttributes, GroupAttributes, Enrollment, User } from '@interfaces/models'; // Importa centralmente
import { FindOptions, Includeable } from 'sequelize';

const includeMembers: Includeable = {
  model: Enrollment,
  as: 'GroupMembers',
  attributes: [ 'id', 'userId', 'role' ],
  include: [ {
    model: User,
    as: 'EnrolledUser',
    attributes: [ 'id', 'name', 'email' ]
  } ]
};

export const groupRepository = {
  findAllByCourseId: ( courseId: string, options?: FindOptions<GroupAttributes> ) =>
    Group.findAll( {
      where: { courseId },
      include: [ includeMembers ],
      order: [ [ 'name', 'ASC' ] ],
      ...options
    } ),

  findAvailableByCourseId: ( courseId: string ) =>
    Group.findAll( {
      where: { courseId, isOpenForJoin: true },
      include: [ includeMembers ],
      order: [ [ 'name', 'ASC' ] ],
    } ),

  findById: ( id: string, include?: Includeable[] ) =>
    Group.findByPk( id, {
      include: include ? [ includeMembers, ...include ] : [ includeMembers ]
    } ),

  create: ( data: GroupCreationAttributes ) =>
    Group.create( data ),

  update: ( id: string, data: Partial<GroupCreationAttributes> ) =>
    Group.update( data, { where: { id } } ),

  delete: ( id: string ) =>
    Group.destroy( { where: { id } } ),

  countMembers: ( groupId: string ): Promise<number> =>
    Enrollment.count( { where: { groupId: groupId } } ),
};