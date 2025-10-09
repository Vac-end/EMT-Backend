import z from 'zod';

export const userSchema = z.object( {
  email: z.string().email(),
  password: z.string().min( 6 ),
  role: z.enum( [ 'niño', 'docente', 'administrador' ] ),
  name: z.string().optional(),
} );