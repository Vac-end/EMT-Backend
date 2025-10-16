import { handleServiceError } from '@utils/helpers';
import { QuestionCreationAttributes } from './model/question.model';
import { questionOptRepository, questionRepository } from './question.repositories';
import { QuestionOptCreationAttributes } from './model/questionOps.model';


export const QuestionService = {
  getAll: async () => {
    try {
      const Questions = await questionRepository.findAll();
      return Questions;
    } catch (error) {
      handleServiceError(error, 'Get All Questions');
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const Question = await questionRepository.findById(id);
      return Question;
    } catch (error) {
      handleServiceError(error, 'Get By Id Question');
      throw error;
    }
  },

  getByQuizId: async (quizId: string) => {
    try {
      const Questions = await questionRepository.findByQuizId(quizId);
      return Questions;
    } catch (error) {
      handleServiceError(error, 'Get By QuizId Question');
      throw error;
    }
  },

  create: async (data: QuestionCreationAttributes) => {
    try {
      return questionRepository.create({ ...data });
    } catch (error) {
      handleServiceError(error, 'Create Question');
      throw error;
    }
  },

  update: async (id: string, data: Partial<QuestionCreationAttributes>) => {
    try {
      return questionRepository.update(id, data);
    } catch (error) {
      handleServiceError(error, 'Update Question');
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const deleted = await questionRepository.delete(id);
      if (deleted === 0) throw new Error('Question not found');
      return deleted;
    } catch (error) {
      handleServiceError(error, 'Delete Question');
      throw error;
    }
  },
};


export const QuestionOptService = {
  getAll: async () => {
    try {
      const QuestionOpts = await questionOptRepository.findAll();
      return QuestionOpts;
    } catch (error) {
      handleServiceError(error, 'Get All QuestionOpts');
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const QuestionOpt = await questionOptRepository.findById(id);
      return QuestionOpt;
    } catch (error) {
      handleServiceError(error, 'Get By Id QuestionOpt');
      throw error;
    }
  },

  getByQuestionId: async (questionId: string) => {
    try {
      const QuestionOpts = await questionOptRepository.findByQuestionId(questionId);
      return QuestionOpts;
    } catch (error) {
      handleServiceError(error, 'Get By QuestionId QuestionOpt');
      throw error;
    }
  },

  create: async (data: QuestionOptCreationAttributes) => {
    try {
      return questionOptRepository.create({ ...data });
    } catch (error) {
      handleServiceError(error, 'Create QuestionOpt');
      throw error;
    }
  },

  update: async (id: string, data: Partial<QuestionOptCreationAttributes>) => {
    try {
      return questionOptRepository.update(id, data);
    } catch (error) {
      handleServiceError(error, 'Update QuestionOpt');
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const deleted = await questionOptRepository.delete(id);
      if (deleted === 0) throw new Error('QuestionOpt not found');
      return deleted;
    } catch (error) {
      handleServiceError(error, 'Delete QuestionOpt');
      throw error;
    }
  },
};
