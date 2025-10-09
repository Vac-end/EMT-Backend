import { User } from '@features/user/model/user.model';
import { sequelize } from '@interfaces/models';
import { logger } from '@utils/logger';
import bcrypt from 'bcrypt';

async function seed() {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await User.bulkCreate([
    { email: 'admin@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One'},
    { email: 'docente@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno'},
    { email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno'},
    { email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos'},
  ], { returning: true });
  if (!users || users.length < 4) throw new Error('Failed to create users');
  if (!users[0] || !users[1] || !users[2] || !users[3]) throw new Error('Invalid user data');

  logger.info('Database seeded');
}

seed().catch(err => logger.error('Seeding failed', err));