import { authMiddleware } from '@middlewares/auth.middleware';
import { roleMiddleware } from '@middlewares/role.middleware';
import { validate } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { GroupController } from './group.controller';
import { createGroupSchema, updateGroupSchema, manageMembersSchema } from './model/group.validation';

const router = Router();
const teacherOrAdmin = roleMiddleware(['docente', 'administrador']);

router.get('/course/:courseId', authMiddleware, GroupController.getByCourse); 
router.get('/:groupId', authMiddleware, GroupController.getById);
router.post('/course/:courseId', authMiddleware, teacherOrAdmin, validate(createGroupSchema), GroupController.create);
router.post('/:groupId/join', authMiddleware, roleMiddleware(['estudiante']), GroupController.join);
router.put('/:groupId/toggle-join', authMiddleware, teacherOrAdmin, GroupController.toggleJoin);
router.put('/:groupId/members', authMiddleware, teacherOrAdmin, validate(manageMembersSchema), GroupController.manageMembers);
router.put('/:groupId', authMiddleware, teacherOrAdmin, validate(updateGroupSchema), GroupController.update);
router.delete('/leave/course/:courseId', authMiddleware, roleMiddleware(['estudiante']), GroupController.leave);
router.delete('/:groupId', authMiddleware, teacherOrAdmin, GroupController.delete);


export default router;