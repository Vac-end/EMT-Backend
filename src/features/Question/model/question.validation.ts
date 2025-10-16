import z from 'zod';

export const QuestionSchema = z.object({
  quizId: z.string(),
  text: z.string().min(1),
  type: z.enum(['mcq', 'true_false', 'short_answer']).default('mcq'),
  points: z.number().min(1).default(1),
});

export const QuestionOptSchema = z.object({
  questionId: z.string(),
  text: z.string().min(1),
  isCorrect: z.boolean().default(false),
});
