import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const sanitize = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return purify.sanitize(input, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });
};

export const sanitizeFilePath = (input: string): string => {
  const sanitized = input.replace(/[<>:"\/\\|?*]/g, '');
  return sanitized.trim();
};