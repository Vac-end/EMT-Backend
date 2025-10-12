import z from 'zod';

export const courseContentSchema = z.object( {
  lessonId: z.string(),
  type: z.enum( [ 'video', 'pdf', 'quiz', 'assignment', 'other' ] ).default( 'other' ),
  orderIndex: z.number().default( 0 ),
  contentUrl: z.string(),
  description: z.string(),
} );