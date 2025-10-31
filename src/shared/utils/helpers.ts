import { logger } from './logger';
import { ContentType } from './types';

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] ?? '';
};
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const calculateProgressPercentage = (completedLessons: number, totalLessons: number): number => {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
};
export const handleServiceError = (error: unknown, context: string): never => {
  logger.error(`${context} failed`, { error: error instanceof Error ? error.message : String(error) });
  throw new Error(`Service error in ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`);
};

export const mapMimeTypeToSimpleType = (mimeType: string | null | undefined): ContentType => {
  if (!mimeType) {
    return 'other';
  }
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType === 'text/html') {
    return 'html';
  }
  if (mimeType === 'text/plain') {
    return 'text';
  }
  if (mimeType === 'application/pdf') {
    return 'pdf';
  }
  if (
    mimeType === 'application/vnd.ms-excel' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return 'xlsx';
  }
  if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'word';
  }
  if (
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    return 'powerpoint';
  }
  return 'other';
};