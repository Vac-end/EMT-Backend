import { AcademicLevel } from '@interfaces/models';
import { AcademicLevelCreationAttributes } from './model/academicLevel.model';

export const academicLevelRepository = {
  findAll: () =>
    AcademicLevel.findAll(),

  findById: ( id: string ) =>
    AcademicLevel.findByPk( id ),

  create: ( data: AcademicLevelCreationAttributes ) =>
    AcademicLevel.create( data ),

  update: ( id: string, data: Partial<AcademicLevelCreationAttributes> ) =>
    AcademicLevel.update( data, { where: { id }, returning: true } ),

  delete: ( id: string ) =>
    AcademicLevel.destroy( { where: { id } } )
};