import { Request, Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { AssignmentService } from './assignment.service';

export const AssignmentController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const Assignments = await AssignmentService.getAll();
      return res.status(200).json(Assignments);
    } catch (error) {
      handleServiceError(error, 'Get All Assignments');
      return res.status(500).json({ message: 'Failed to fetch Assignments' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Assignment ID is required' });
      const Assignment = await AssignmentService.getById(id);
      if (!Assignment) return res.status(404).json({ message: 'Assignment not found' });
      return res.status(200).json(Assignment);
    } catch (error) {
      handleServiceError(error, 'Get Assignment by ID');
      return res.status(500).json({ message: 'Failed to fetch Assignment' });
    }
  },

  getByLessonId: async (req: Request, res: Response) => {
    try {
      const { lessonId } = req.params;
      if (!lessonId) return res.status(400).json({ message: 'Lesson ID is required' });
      const Assignments = await AssignmentService.getByLessonId(lessonId);
      if (!Assignments) return res.status(404).json({ message: 'Assignments not found' });
      return res.status(200).json(Assignments);
    } catch (error) {
      handleServiceError(error, 'Get Assignments by Lesson ID');
      return res.status(500).json({ message: 'Failed to fetch Assignments' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const Assignment = await AssignmentService.create(req.body);
      return res.status(201).json(Assignment);
    } catch (error) {
      handleServiceError(error, 'Create Assignment');
      return res.status(400).json({ message: 'Failed to create Assignment' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Assignment ID is required' });
      const Assignment = await AssignmentService.update(id, req.body);
      if (!Assignment) return res.status(404).json({ message: 'Assignment not found' });
      return res.status(200).json(Assignment);
    } catch (error) {
      handleServiceError(error, 'Update Assignment');
      return res.status(400).json({ message: 'Failed to update Assignment' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Assignment ID is required' });
      await AssignmentService.delete(id);
      return res.status(204).send();
    } catch (error) {
      handleServiceError(error, 'Delete Assignment');
      return res.status(500).json({ message: 'Failed to delete Assignment' });
    }
  },
};
