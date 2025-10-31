import z from 'zod';

export const AssignmentSchema = z.object( {
  lessonId: z.string().uuid(),
  tittle: z.string().min( 1 ),
  description: z.string().min( 1 ),
  dueDate: z.coerce.date(),
  maxScore: z.coerce.number().min( 1 ).default( 100 ),
  isGroupAssignment: z.coerce.boolean().optional(),
  maxAttempts: z.coerce.number().int().min( 1 ).optional()
} );