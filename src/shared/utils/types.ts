
export const CONTENT_TYPE_VALUES = [
  'video',
  'pdf',
  'image',
  'text',
  'html',
  'xlsx',
  'word',
  'powerpoint',
  'link',
  'other'
] as const;

export type ContentType = typeof CONTENT_TYPE_VALUES[number];