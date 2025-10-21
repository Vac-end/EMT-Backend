import z from 'zod';

export const announcementSchema = z.object({
  courseId: z.string().uuid({}),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  imageUrl: z.string().optional().nullable()
});