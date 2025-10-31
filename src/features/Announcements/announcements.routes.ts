import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { AnnouncementController } from './announcements.controller';
import { announcementSchema } from './model/announcements.validation';

const router = Router();

router.get( '/course/:courseId', authMiddleware, AnnouncementController.getByCourseIdPaginated );
router.get( '/:id', authMiddleware, AnnouncementController.getById );
router.post( '/', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( announcementSchema ), AnnouncementController.create );
router.put( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), validate( announcementSchema.partial() ), AnnouncementController.update );
router.delete( '/:id', authMiddleware, roleMiddleware( [ 'docente', 'administrador' ] ), AnnouncementController.delete );

export default router;