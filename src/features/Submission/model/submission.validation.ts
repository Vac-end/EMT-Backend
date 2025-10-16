import z from 'zod';

export const SubmissionSchema = z.object({
  enrollmentId: z.string(),
  lessonId: z.string(),
  type: z.enum(['quiz', 'assignment']),
  grade: z.coerce.number().min(0).max(100).default(0),
  feedback: z.string().min(1),
  fileUrl: z.string().optional(),
  submittedAt: z.coerce.date().optional(),
});
