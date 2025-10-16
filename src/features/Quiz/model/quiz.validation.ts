import z from 'zod';

export const QuizSchema = z.object( {
  lessonId: z.string(),
  tittle: z.string().min( 1 ),
  description: z.string(),
  duration: z.number().default( 300 ),
  totalPoints: z.number().default( 20 ),
} );