import { Request, Response } from 'express';
import { handleServiceError } from '@utils/helpers';
import { QuestionOptService, QuestionService } from './question.service';

export const QuestionController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const Questions = await QuestionService.getAll();
      return res.status(200).json(Questions);
    } catch (error) {
      handleServiceError(error, 'Get All Questions');
      return res.status(500).json({ message: 'Failed to fetch Questions' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Question ID is required' });
      const Question = await QuestionService.getById(id);
      if (!Question) return res.status(404).json({ message: 'Question not found' });
      return res.status(200).json(Question);
    } catch (error) {
      handleServiceError(error, 'Get Question by ID');
      return res.status(500).json({ message: 'Failed to fetch Question' });
    }
  },

  getByQuizId: async (req: Request, res: Response) => {
    try {
      const { quizId } = req.params;
      if (!quizId) return res.status(400).json({ message: 'Quiz ID is required' });
      const Questions = await QuestionService.getByQuizId(quizId);
      if (!Questions) return res.status(404).json({ message: 'Questions not found' });
      return res.status(200).json(Questions);
    } catch (error) {
      handleServiceError(error, 'Get Questions by Quiz ID');
      return res.status(500).json({ message: 'Failed to fetch Questions' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const Question = await QuestionService.create(req.body);
      return res.status(201).json(Question);
    } catch (error) {
      handleServiceError(error, 'Create Question');
      return res.status(400).json({ message: 'Failed to create Question' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Question ID is required' });
      const Question = await QuestionService.update(id, req.body);
      if (!Question) return res.status(404).json({ message: 'Question not found' });
      return res.status(200).json(Question);
    } catch (error) {
      handleServiceError(error, 'Update Question');
      return res.status(400).json({ message: 'Failed to update Question' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Question ID is required' });
      await QuestionService.delete(id);
      return res.status(204).send();
    } catch (error) {
      handleServiceError(error, 'Delete Question');
      return res.status(500).json({ message: 'Failed to delete Question' });
    }
  },
};

export const QuestionOptController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const QuestionOpts = await QuestionOptService.getAll();
      return res.status(200).json(QuestionOpts);
    } catch (error) {
      handleServiceError(error, 'Get All QuestionOpts');
      return res.status(500).json({ message: 'Failed to fetch QuestionOpts' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'QuestionOpt ID is required' });
      const QuestionOpt = await QuestionOptService.getById(id);
      if (!QuestionOpt) return res.status(404).json({ message: 'QuestionOpt not found' });
      return res.status(200).json(QuestionOpt);
    } catch (error) {
      handleServiceError(error, 'Get QuestionOpt by ID');
      return res.status(500).json({ message: 'Failed to fetch QuestionOpt' });
    }
  },

  getByQuestionId: async (req: Request, res: Response) => {
    try {
      const { questionId } = req.params;
      if (!questionId) return res.status(400).json({ message: 'Question ID is required' });
      const QuestionOpts = await QuestionOptService.getByQuestionId(questionId);
      if (!QuestionOpts) return res.status(404).json({ message: 'Options not found' });
      return res.status(200).json(QuestionOpts);
    } catch (error) {
      handleServiceError(error, 'Get QuestionOpts by Question ID');
      return res.status(500).json({ message: 'Failed to fetch QuestionOpts' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const QuestionOpt = await QuestionOptService.create(req.body);
      return res.status(201).json(QuestionOpt);
    } catch (error) {
      handleServiceError(error, 'Create QuestionOpt');
      return res.status(400).json({ message: 'Failed to create QuestionOpt' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'QuestionOpt ID is required' });
      const QuestionOpt = await QuestionOptService.update(id, req.body);
      if (!QuestionOpt) return res.status(404).json({ message: 'QuestionOpt not found' });
      return res.status(200).json(QuestionOpt);
    } catch (error) {
      handleServiceError(error, 'Update QuestionOpt');
      return res.status(400).json({ message: 'Failed to update QuestionOpt' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'QuestionOpt ID is required' });
      await QuestionOptService.delete(id);
      return res.status(204).send();
    } catch (error) {
      handleServiceError(error, 'Delete QuestionOpt');
      return res.status(500).json({ message: 'Failed to delete QuestionOpt' });
    }
  },
};