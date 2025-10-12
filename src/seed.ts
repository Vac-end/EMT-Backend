import { User } from '@features/user/model/user.model';
import { sequelize } from '@interfaces/models';
import { logger } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Course } from '@features/course/model/course.model';
import { Module } from '@features/Module/model/module.model';
import { Lesson } from '@features/Lesson/model/lesson.model';
import { Schedule } from '@features/Schedule/model/schedule.model';
import { Enrollment } from '@features/Enrollment/model/enrollment.model';
import { AcademicLevel } from '@features/AcademicLevel/model/academicLevel.model';

async function seed() {
  await sequelize.sync( { force: true } );

  const hashedPassword = await bcrypt.hash( 'password123', 10 );

  const academicLevels = await AcademicLevel.bulkCreate([
    { name: '1ro Primaria', orderIndex: 1},
    { name: '2do Primaria', orderIndex: 2}
  ], {returning: true});
  if ( !academicLevels || academicLevels.length < 2 ) throw new Error( 'Failed to create academicLevels' );
  if ( !academicLevels[ 0 ] || !academicLevels[ 1 ] ) throw new Error( 'Invalid academicLevels data' );

  const users = await User.bulkCreate( [
    { email: 'admin@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One' },
    { email: 'docente@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno' },
    { email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno' },
    { email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos' },
  ], { returning: true } );
  if ( !users || users.length < 4 ) throw new Error( 'Failed to create users' );
  if ( !users[ 0 ] || !users[ 1 ] || !users[ 2 ] || !users[ 3 ] ) throw new Error( 'Invalid user data' );

  // Crear Curso
  const courseId = uuidv4();
  const courses = await Course.bulkCreate( [
    {
      id: courseId,
      tittle: 'Curso de Matemáticas',
      description: 'Curso introductorio de matemáticas',
      coverImageUrl: 'https://example.com/math-course.jpg',
      createdBy: users[0].id, // Reemplaza con un userId válido si tienes usuarios reales
      academicLevelId: academicLevels[0].id, // Reemplaza con un academicLevelId válido si es necesario
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true } );
  if ( !courses || courses.length < 1 ) throw new Error( 'Failed to create courses' );
  if ( !courses[ 0 ] ) throw new Error( 'Invalid course data' );

  const enrollments = await Enrollment.bulkCreate( [
    {
      id: uuidv4(),
      userId: users[2].id,
      courseId: courseId,
      role: 'estudiante',
      enrollmentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: users[3].id,
      courseId: courseId,
      role: 'estudiante',
      enrollmentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userId: users[1].id,
      courseId: courseId,
      role: 'docente',
      enrollmentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true } );
  if ( !enrollments || enrollments.length < 3 ) throw new Error( 'Failed to create enrollments' );
  if ( !enrollments[ 0 ] || !enrollments[ 1 ] || !enrollments[ 2 ] ) throw new Error( 'Invalid enrollment data' );

  // Crear Módulo
  const moduleId = uuidv4();
  const modules = await Module.bulkCreate( [
    {
      id: moduleId,
      courseId: courseId,
      tittle: 'Módulo 1: Fundamentos',
      orderIndex: 1,
      description: 'Módulo introductorio de matemáticas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true } );
  if ( !modules || modules.length < 1 ) throw new Error( 'Failed to create modules' );
  if ( !modules[ 0 ] ) throw new Error( 'Invalid module data' );

  // Crear Lecciones
  const lessonId1 = uuidv4();
  const lessonId2 = uuidv4();
  const lessons = await Lesson.bulkCreate( [
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
  ], { returning: true } );
  if ( !lessons || lessons.length < 2 ) throw new Error( 'Failed to create lessons' );
  if ( !lessons[ 0 ] || !lessons[ 1 ] ) throw new Error( 'Invalid lesson data' );

  // Crear Horarios
  const schedules = await Schedule.bulkCreate( [
    {
      id: uuidv4(),
      courseId: courseId,
      lessonId: lessonId1,
      startTime: new Date( '2025-10-13T10:00:00-05:00' ), // Fecha futura
      endTime: new Date( '2025-10-13T11:00:00-05:00' ),
      mode: 'live',
      meetingLink: 'https://zoom.us/j/123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      courseId: courseId,
      lessonId: lessonId2,
      startTime: new Date( '2025-10-14T10:00:00-05:00' ), // Fecha futura
      endTime: new Date( '2025-10-14T11:00:00-05:00' ),
      mode: 'live',
      meetingLink: 'https://zoom.us/j/987654321',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], { returning: true } );
  if ( !schedules || schedules.length < 2 ) throw new Error( 'Failed to create schedules' );
  if ( !schedules[ 0 ] || !schedules[ 1 ] ) throw new Error( 'Invalid schedule data' );


  logger.info( 'Database seeded' );
}

seed().catch( err => logger.error( 'Seeding failed', err ) );