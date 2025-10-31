import { Assignment, Enrollment, Lesson, Module } from '@interfaces/models';
import { Request } from 'express';
import z from 'zod';

export const SubmitDraftSchema = z.object({
  assignmentId: z.string().uuid(),
  textSubmission: z.string().optional().nullable(),
});
export const UploadFileSchema = z.object({
  assignmentId: z.string().uuid(),
  submissionId: z.string().uuid(),
});
export const DeleteFileSchema = z.object({
  assignmentId: z.string().uuid(),
});

export const getSubmissionContext = async (req: Request, assignmentId: string) => {
  const userId = (req as any).user?.sub || (req as any).user?.id;
  if (!userId) {
    throw new Error('Usuario no autenticado');
  }
  const assignment = await Assignment.findByPk(assignmentId, {
    attributes: ['id'],
    include: [
      {
        model: Lesson,
        as: 'AssignmentLesson',
        attributes: ['moduleId'],
        include: [
          {
            model: Module,
            as: 'LessonModule',
            attributes: ['courseId']
          }
        ]
      }
    ]
  });
  const castedAssignment = assignment as any;
  if (!assignment || !castedAssignment.AssignmentLesson || !castedAssignment.AssignmentLesson.LessonModule) {
    throw new Error('Asignación no encontrada o mal configurada (sin lección/módulo)');
  }
  const courseId = castedAssignment.AssignmentLesson.LessonModule.courseId;
  const enrollment = await Enrollment.findOne({
    where: { userId, courseId: courseId },
    attributes: ['id', 'groupId'],
    raw: true,
  });
  if (!enrollment) {
    throw new Error('Usuario no inscrito en este curso');
  }
  return {
    enrollmentId: enrollment.id,
    groupId: enrollment.groupId || null,
    userId: userId,
    courseId: courseId
  };
};