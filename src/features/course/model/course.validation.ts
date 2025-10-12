import z from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coverImageUrl: z.string().min(1),
  createdBy: z.string(),
  academicLevelId: z.string()
});