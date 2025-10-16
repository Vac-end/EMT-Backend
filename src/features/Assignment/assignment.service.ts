import { handleServiceError } from '@utils/helpers';
import { assignmentRepository } from './assignment.repositories';
import { AssignmentCreationAttributes } from './model/assignment.model';

export const AssignmentService = {
  getAll: async () => {
    try {
      const Assignments = await assignmentRepository.findAll();
      return Assignments;
    } catch (error) {
      handleServiceError(error, 'Get All Assignments');
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const Assignment = await assignmentRepository.findById(id);
      return Assignment;
    } catch (error) {
      handleServiceError(error, 'Get By Id Assignment');
      throw error;
    }
  },

  getByLessonId: async (lessonId: string) => {
    try {
      const Assignments = await assignmentRepository.findByLessonId(lessonId);
      return Assignments;
    } catch (error) {
      handleServiceError(error, 'Get By LessonId Assignment');
      throw error;
    }
  },

  create: async (data: AssignmentCreationAttributes) => {
    try {
      return assignmentRepository.create({ ...data });
    } catch (error) {
      handleServiceError(error, 'Create Assignment');
      throw error;
    }
  },

  update: async (id: string, data: Partial<AssignmentCreationAttributes>) => {
    try {
      return assignmentRepository.update(id, data);
    } catch (error) {
      handleServiceError(error, 'Update Assignment');
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const deleted = await assignmentRepository.delete(id);
      if (deleted === 0) throw new Error('Assignment not found');
      return deleted;
    } catch (error) {
      handleServiceError(error, 'Delete Assignment');
      throw error;
    }
  },
};
