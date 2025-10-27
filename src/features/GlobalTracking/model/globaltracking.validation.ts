import z from 'zod';

const trackableTypes = z.enum(['module', 'lesson', 'quiz', 'assignment', 'announcement', 'course_content']);
const trackingStatuses = z.enum(['viewed', 'completed', 'started', 'submitted']);

export const globalTrackingSchema = z.object({
  courseId: z.string().uuid(),
  trackableType: trackableTypes,
  trackableId: z.string().uuid(),
  status: trackingStatuses,
});