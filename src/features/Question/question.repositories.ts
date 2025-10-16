import { Question } from '@interfaces/models';
import { QuestionCreationAttributes } from './model/question.model';
import { QuestionOpt, QuestionOptCreationAttributes } from '@features/Question/model/questionOps.model';

export const questionRepository = {
  findAll: () => Question.findAll(),

  findById: (id: string) => Question.findByPk(id),

  findByQuizId: (quizId: string) => Question.findAll({ where: { quizId } }),

  create: (data: QuestionCreationAttributes) => Question.create(data),

  update: (id: string, data: Partial<QuestionCreationAttributes>) =>
    Question.update(data, { where: { id }, returning: true }),

  delete: (id: string) => Question.destroy({ where: { id } }),
};

export const questionOptRepository = {
  findAll: () => QuestionOpt.findAll(),

  findById: (id: string) => QuestionOpt.findByPk(id),

  findByQuestionId: (questionId: string) => QuestionOpt.findAll({ where: { questionId } }),

  create: (data: QuestionOptCreationAttributes) => QuestionOpt.create(data),

  update: (id: string, data: Partial<QuestionOptCreationAttributes>) =>
    QuestionOpt.update(data, { where: { id }, returning: true }),

  delete: (id: string) => QuestionOpt.destroy({ where: { id } }),
};