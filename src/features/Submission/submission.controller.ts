import { Request, Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { SubmissionService } from './submission.service';

export const SubmissionController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const Submissions = await SubmissionService.getAll();
      return res.status(200).json(Submissions);
    } catch (error) {
      handleServiceError(error, 'Get All Submissions');
      return res.status(500).json({ message: 'Failed to fetch submissions' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Submission ID is required' });
      const Submission = await SubmissionService.getById(id);
      if (!Submission) return res.status(404).json({ message: 'Submission not found' });
      return res.status(200).json(Submission);
    } catch (error) {
      handleServiceError(error, 'Get Submission by ID');
      return res.status(500).json({ message: 'Failed to fetch submission' });
    }
  },

  getByLessonId: async (req: Request, res: Response) => {
    try {
      const { lessonId } = req.params;
      if (!lessonId) return res.status(400).json({ message: 'Lesson ID is required' });
      const Submissions = await SubmissionService.getByLessonId(lessonId);
      return res.status(200).json(Submissions);
    } catch (error) {
      handleServiceError(error, 'Get Submissions by Lesson');
      return res.status(500).json({ message: 'Failed to fetch submissions' });
    }
  },

  getByEnrollmentId: async (req: Request, res: Response) => {
    try {
      const { enrollmentId } = req.params;
      if (!enrollmentId) return res.status(400).json({ message: 'Enrollment ID is required' });
      const Submissions = await SubmissionService.getByEnrollmentId(enrollmentId);
      return res.status(200).json(Submissions);
    } catch (error) {
      handleServiceError(error, 'Get Submissions by Enrollment');
      return res.status(500).json({ message: 'Failed to fetch submissions' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const Submission = await SubmissionService.create(req.body);
      return res.status(201).json(Submission);
    } catch (error) {
      handleServiceError(error, 'Create Submission');
      return res.status(400).json({ message: 'Failed to create submission' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Submission ID is required' } );
      const Submission = await SubmissionService.update(id, req.body);
      return res.status(200).json(Submission);
    } catch (error) {
      handleServiceError(error, 'Update Submission');
      return res.status(400).json({ message: 'Failed to update submission' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if ( !id ) return res.status( 400 ).json( { message: 'Submission ID is required' } );
      await SubmissionService.delete(id);
      return res.status(204).send();
    } catch (error) {
      handleServiceError(error, 'Delete Submission');
      return res.status(500).json({ message: 'Failed to delete submission' });
    }
  },
};
