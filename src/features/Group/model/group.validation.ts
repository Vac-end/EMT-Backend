import z from 'zod';

export const createGroupSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  maxMembers: z.number().int().positive().optional().nullable(),
  isOpenForJoin: z.boolean().optional().default(true),
});
export const updateGroupSchema = createGroupSchema.partial();
export const manageMembersSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1)
});