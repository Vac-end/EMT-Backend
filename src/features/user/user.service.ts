import { userRepository } from './user.repositories';
import bcrypt from 'bcrypt';


export const userService = {
  getAll: () => userRepository.findAll(),
  getById: ( id: string ) => userRepository.findById( id ),
  create: async ( data: { email: string; password: string; role: 'estudiante' | 'docente' | 'administrador'; name?: string; gradeId?: number; } ) => {
    const hashedPassword = await bcrypt.hash( data.password, 10 );
    return userRepository.create( { ...data, password: hashedPassword } );
  },
  update: ( id: string, data: Partial<{ email: string; name?: string; gradeId?: number; password?: string; }> ) => {
    if ( data.password ) throw new Error( 'Password update not allowed via this method' );
    return userRepository.update( id, data );
  },
  delete: ( id: string ) => userRepository.delete( id ),
  getByRole: ( role: 'estudiante' | 'docente' | 'administrador' ) => userRepository.findByRole( role ),
};