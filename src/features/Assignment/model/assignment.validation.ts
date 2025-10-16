import z from 'zod';

export const AssignmentSchema = z.object({
  lessonId: z.string(),
  tittle: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.coerce.date(),
  maxScore: z.number().min(1).default(100),
  fileUrl: z.string().optional(),
});
