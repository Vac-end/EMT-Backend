import { Submission } from '@interfaces/models';
import { SubmissionCreationAttributes } from './model/submission.model';

export const submissionRepository = {
  findAll: () => Submission.findAll(),

  findById: (id: string) => Submission.findByPk(id),

  findByLessonId: (lessonId: string) => Submission.findAll({ where: { lessonId } }),

  findByEnrollmentId: (enrollmentId: string) => Submission.findAll({ where: { enrollmentId } }),

  create: (data: SubmissionCreationAttributes) => Submission.create(data),

  update: (id: string, data: Partial<SubmissionCreationAttributes>) =>
    Submission.update(data, { where: { id }, returning: true }),

  delete: (id: string) => Submission.destroy({ where: { id } }),
};
