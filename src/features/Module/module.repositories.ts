import { Module, ModuleCreationAttributes } from '@features/Module/model/module.model';
export const moduleRepository = {
  findAll: () =>
    Module.findAll(),

  findById: ( id: string ) =>
    Module.findByPk( id ),

  findByCourseId: ( courseId: string ) =>
    Module.findAll( { where: { courseId } } ),

  create: ( data: ModuleCreationAttributes ) =>
    Module.create( data ),

  update: ( id: string, data: Partial<ModuleCreationAttributes> ) =>
    Module.update( data, { where: { id }, returning: true, } ),

  delete: ( id: string ) =>
    Module.destroy( { where: { id } } ),
};