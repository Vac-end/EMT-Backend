import z from 'zod';

export const userSchema = z.object( {
  email: z.string().email(),
  password: z.string().min( 6 ),
  role: z.enum( [ 'estudiante', 'docente', 'administrador' ] ),
  name: z.string(),
  academicLevelId: z.string(),
  imagePerfilUrl: z.string().optional(),
  otpRequired: z.boolean().default(false)
} );