import z from 'zod';

export const academicLevelSchema = z.object( {
  name: z.string(),
  orderIndex: z.number().default(0)
} );