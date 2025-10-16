import { handleServiceError } from '@utils/helpers';
import { submissionRepository } from './submission.repositories';
import { SubmissionCreationAttributes } from './model/submission.model';

export const SubmissionService = {
  getAll: async () => {
    try {
      return await submissionRepository.findAll();
    } catch (error) {
      handleServiceError(error, 'Get All Submissions');
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await submissionRepository.findById(id);
    } catch (error) {
      handleServiceError(error, 'Get Submission By ID');
      throw error;
    }
  },

  getByLessonId: async (lessonId: string) => {
    try {
      return await submissionRepository.findByLessonId(lessonId);
    } catch (error) {
      handleServiceError(error, 'Get Submissions By LessonId');
      throw error;
    }
  },

  getByEnrollmentId: async (enrollmentId: string) => {
    try {
      return await submissionRepository.findByEnrollmentId(enrollmentId);
    } catch (error) {
      handleServiceError(error, 'Get Submissions By EnrollmentId');
      throw error;
    }
  },

  create: async (data: SubmissionCreationAttributes) => {
    try {
      return await submissionRepository.create(data);
    } catch (error) {
      handleServiceError(error, 'Create Submission');
      throw error;
    }
  },

  update: async (id: string, data: Partial<SubmissionCreationAttributes>) => {
    try {
      return await submissionRepository.update(id, data);
    } catch (error) {
      handleServiceError(error, 'Update Submission');
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const deleted = await submissionRepository.delete(id);
      if (deleted === 0) throw new Error('Submission not found');
      return deleted;
    } catch (error) {
      handleServiceError(error, 'Delete Submission');
      throw error;
    }
  },
};
