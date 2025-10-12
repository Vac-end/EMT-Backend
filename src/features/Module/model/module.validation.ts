import z from 'zod';

export const ModuleSchema = z.object({
  courseId: z.string(),
  tittle: z.string().min(1),
  orderIndex: z.number().default(0),
  description: z.string(),
});