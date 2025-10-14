import z from 'zod';

export const ScheduleSchema = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  mode: z.enum(['live', 'recorder']),
  meetingLink: z.string(),
})