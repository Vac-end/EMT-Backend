import z from 'zod';

export const LessonSchema = z.object( {
  moduleId: z.string(),
  tittle: z.string().min( 1 ),
  orderIndex: z.number().default( 1 ),
  description: z.string(),
  duration: z.number().default( 1 ),
} );