import z from 'zod';

const trackableTypes = z.enum(['module', 'lesson', 'quiz', 'assignment', 'announcement']);
const trackingStatuses = z.enum(['viewed', 'completed', 'started', 'submitted']);

export const globalTrackingSchema = z.object({
  courseId: z.string().uuid(),
  trackableType: trackableTypes,
  trackableId: z.string().uuid(),
  status: trackingStatuses,
});