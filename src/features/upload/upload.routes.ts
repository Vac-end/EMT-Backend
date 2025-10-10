import express from 'express';

import multer from 'multer';
import { publicController } from './publicUpload.controller';
import { authMiddleware } from '@middlewares/auth.middleware';
import { privateController } from './privateUpload.Controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rutas para bucket público
router.post('/public', upload.array('files'), publicController.uploadPublicFile);
router.delete('/public/delete', publicController.deletePublicFile);

// Rutas para bucket privado
router.post('/private', authMiddleware, upload.array('files'), privateController.uploadPrivateFile);
router.delete('/private/delete', authMiddleware, privateController.deletePrivateFile);
router.post('/private/get-signed-url', authMiddleware, privateController.getSignedUrlForSession);

export default router;