import { User } from '@interfaces/models';
import { Token, TokenCreationAttributes } from './model/Token.model';

export const authRepository = {
  findAll: () =>
    Token.findAll( {
      include: [ { model: User, as: 'RefreshTokenUser', attributes: { exclude: [ 'password' ] } } ],
    } ),
  findById: ( id: number ) =>
    Token.findByPk( id, {
      include: [ { model: User, as: 'RefreshTokenUser', attributes: { exclude: [ 'password' ] } } ],
    } ),
  findByToken: ( token: string ) =>
    Token.findOne( {
      where: { token },
      include: [ { model: User, as: 'RefreshTokenUser', attributes: { exclude: [ 'password' ] } } ],
    } ),
  create: ( data: TokenCreationAttributes ) => Token.create( data ),
  delete: ( id: number ) => Token.destroy( { where: { id } } ),
  deleteByToken: ( token: string ) => Token.destroy( { where: { token } } ),
  findByUser: ( userId: string ) =>
    Token.findAll( {
      where: { userId },
      include: [ { model: User, as: 'RefreshTokenUser', attributes: { exclude: [ 'password' ] } } ],
    } ),
};