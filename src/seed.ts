import { AcademicLevel, Course, Module, User, Lesson, Schedule, Enrollment, sequelize } from '@interfaces/models';
import { logger } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';


async function seed() {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Creating more academic levels
  const academicLevels = await AcademicLevel.bulkCreate([
    { name: '1ro Primaria', orderIndex: 1 },
    { name: '2do Primaria', orderIndex: 2 },
    { name: '3ro Primaria', orderIndex: 3 },
    { name: '4to Primaria', orderIndex: 4 },
  ], { returning: true });
  if (!academicLevels || academicLevels.length < 4) throw new Error('Failed to create academicLevels');
  if (!academicLevels[0] || !academicLevels[1] || !academicLevels[2] || !academicLevels[3]) throw new Error('Invalid academicLevels data');

  // Creating more users (2 admins, 3 teachers, 6 students)
  const users = await User.bulkCreate([
    { email: 'admin1@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One' },
    { email: 'admin2@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Two' },
    { email: 'docente1@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno' },
    { email: 'docente2@example.com', password: hashedPassword, role: 'docente', name: 'Docente Dos' },
    { email: 'docente3@example.com', password: hashedPassword, role: 'docente', name: 'Docente Tres' },
    { email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno', academicLevelId: academicLevels[0].id },
    { email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos', academicLevelId: academicLevels[0].id },
    { email: 'estudiante3@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Tres', academicLevelId: academicLevels[1].id },
    { email: 'estudiante4@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cuatro', academicLevelId: academicLevels[1].id },
    { email: 'estudiante5@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cinco', academicLevelId: academicLevels[2].id },
    { email: 'estudiante6@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Seis', academicLevelId: academicLevels[3].id },
  ], { returning: true });
  if (!users || users.length < 11) throw new Error('Failed to create users');
  if (!users[0] || !users[1] || !users[2] || !users[3] || !users[4] || !users[5] || !users[6] || !users[7] || !users[8] || !users[9] || !users[10]) throw new Error('Invalid user data');

  // Creating more courses (4 courses across different academic levels)
  const courses = await Course.bulkCreate([
    {
      tittle: 'Curso de Matemáticas Básicas',
      description: 'Curso introductorio de matemáticas para 1ro Primaria',
      coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
      createdBy: users[0].id,
      academicLevelId: academicLevels[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tittle: 'Curso de Biología Introductoria',
      description: 'Curso introductorio de biología para 1ro Primaria',
      coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
      createdBy: users[0].id,
      academicLevelId: academicLevels[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tittle: 'Curso de Ciencias Naturales',
      description: 'Curso de ciencias para 2do Primaria',
      coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
      createdBy: users[1].id,
      academicLevelId: academicLevels[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tittle: 'Curso de Matemáticas Avanzadas',
      description: 'Curso avanzado de matemáticas para 3ro y 4to Primaria',
      coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
      createdBy: users[1].id,
      academicLevelId: academicLevels[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true });
  if (!courses || courses.length < 4) throw new Error('Failed to create courses');
  if (!courses[0] || !courses[1] || !courses[2] || !courses[3]) throw new Error('Invalid course data');

  // Creating more enrollments (students and teachers in multiple courses)
  const enrollments = await Enrollment.bulkCreate([
    // Course 1: Matemáticas Básicas (1ro Primaria)
    { id: uuidv4(), userId: users[5].id, courseId: courses[0].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[6].id, courseId: courses[0].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[2].id, courseId: courses[0].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    // Course 2: Biología Introductoria (1ro Primaria)
    { id: uuidv4(), userId: users[5].id, courseId: courses[1].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[6].id, courseId: courses[1].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[3].id, courseId: courses[1].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    // Course 3: Ciencias Naturales (2do Primaria)
    { id: uuidv4(), userId: users[7].id, courseId: courses[2].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[8].id, courseId: courses[2].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[4].id, courseId: courses[2].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    // Course 4: Matemáticas Avanzadas (3ro y 4to Primaria)
    { id: uuidv4(), userId: users[9].id, courseId: courses[3].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[10].id, courseId: courses[3].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), userId: users[2].id, courseId: courses[3].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  ], { returning: true });
  if (!enrollments || enrollments.length < 12) throw new Error('Failed to create enrollments');
  if (!enrollments[0] || !enrollments[1] || !enrollments[2] || !enrollments[3] || !enrollments[4] || !enrollments[5] ||
      !enrollments[6] || !enrollments[7] || !enrollments[8] || !enrollments[9] || !enrollments[10] || !enrollments[11]) {
    throw new Error('Invalid enrollment data');
  }

  // Creating a module for one course (keeping minimal for simplicity)
  const moduleId = uuidv4();
  const modules = await Module.bulkCreate([
    {
      id: moduleId,
      courseId: courses[0].id,
      tittle: 'Módulo 1: Fundamentos',
      orderIndex: 1,
      description: 'Módulo introductorio de matemáticas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true });
  if (!modules || modules.length < 1) throw new Error('Failed to create modules');
  if (!modules[0]) throw new Error('Invalid module data');

  // Creating lessons for the module
  const lessonId1 = uuidv4();
  const lessonId2 = uuidv4();
  const lessons = await Lesson.bulkCreate([
    {
      id: lessonId1,
      moduleId: moduleId,
      tittle: 'Lección 1: Sumas Básicas',
      orderIndex: 1,
      type: 'video',
      description: 'Introducción a las sumas',
      contentUrl: 'https://example.com/sumas.mp4',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: lessonId2,
      moduleId: moduleId,
      tittle: 'Lección 2: Restas Básicas',
      orderIndex: 2,
      type: 'video',
      description: 'Introducción a las restas',
      contentUrl: 'https://example.com/restas.mp4',
      duration: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true });
  if (!lessons || lessons.length < 2) throw new Error('Failed to create lessons');
  if (!lessons[0] || !lessons[1]) throw new Error('Invalid lesson data');

  // Creating schedules for one course
  const schedules = await Schedule.bulkCreate([
    {
      id: uuidv4(),
      courseId: courses[0].id,
      lessonId: lessonId1,
      startTime: new Date('2025-10-20T10:00:00-05:00'),
      endTime: new Date('2025-10-20T11:00:00-05:00'),
      mode: 'live',
      meetingLink: 'https://zoom.us/j/123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      courseId: courses[0].id,
      lessonId: lessonId2,
      startTime: new Date('2025-10-21T10:00:00-05:00'),
      endTime: new Date('2025-10-21T11:00:00-05:00'),
      mode: 'live',
      meetingLink: 'https://zoom.us/j/987654321',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true });
  if (!schedules || schedules.length < 2) throw new Error('Failed to create schedules');
  if (!schedules[0] || !schedules[1]) throw new Error('Invalid schedule data');

  logger.info('Database seeded');
}

seed().catch(err => logger.error('Seeding failed', err));