// Importa el modelo centralmente
import { User } from '@interfaces/models'; 
import { FindOptions } from 'sequelize';
import { Announcement, AnnouncementAttributes, AnnouncementCreationAttributes } from './model/announcements.model';

export const announcementRepository = {
  findAll: (options?: FindOptions<AnnouncementAttributes>) =>
    Announcement.findAll(options),

  findByCourseId: (courseId: string, options?: FindOptions<AnnouncementAttributes>) =>
    Announcement.findAll({
      where: { courseId },
      include: [{ model: User, as: 'AnnouncementCreator', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']],
      ...options
    }),

  findById: (id: string) =>
    Announcement.findByPk(id, {
      include: [{ model: User, as: 'AnnouncementCreator', attributes: ['id', 'name', 'email'] }]
    }),

  create: (data: AnnouncementCreationAttributes) =>
    Announcement.create(data),

  update: (id: string, data: Partial<AnnouncementCreationAttributes>) =>
    Announcement.update(data, { where: { id }, returning: true }),

  delete: (id: string) =>
    Announcement.destroy({ where: { id } }),
};