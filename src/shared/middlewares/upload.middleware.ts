import multer, { Multer } from 'multer';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
const storage = multer.memoryStorage();
const multerUpload: Multer = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
});
export const handleUploadArray = (fieldName: string, maxCount: number = 10) => {
  return multerUpload.array(fieldName, maxCount);
};
export const handleUploadSingle = (fieldName: string) => {
  return multerUpload.single(fieldName);
};
export const handleUploadFields = (fields: ReadonlyArray<multer.Field>) => {
  return multerUpload.fields(fields);
};