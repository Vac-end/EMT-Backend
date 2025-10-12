import z from 'zod';

export const EnrollmentSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  role: z.enum(['estudiante', 'docente', 'soporte']),
})