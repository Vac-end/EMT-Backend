import { Assignment } from '@interfaces/models';
import { AssignmentCreationAttributes } from './model/assignment.model';

export const assignmentRepository = {
  findAll: () => Assignment.findAll(),

  findById: (id: string) => Assignment.findByPk(id),

  findByLessonId: (lessonId: string) => Assignment.findAll({ where: { lessonId } }),

  create: (data: AssignmentCreationAttributes) => Assignment.create(data),

  update: (id: string, data: Partial<AssignmentCreationAttributes>) =>
    Assignment.update(data, { where: { id }, returning: true }),

  delete: (id: string) => Assignment.destroy({ where: { id } }),
};
