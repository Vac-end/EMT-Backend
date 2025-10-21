import { AcademicLevel, Course, Module, User, Lesson, Schedule, Enrollment, Announcement, GlobalTracking, sequelize } from '@interfaces/models';
import { logger } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    // Sync database, force: true to reset
    await sequelize.sync( { force: true } );

    // Hash default password
    const hashedPassword = await bcrypt.hash( 'password123', 10 );

    // Creating academic levels (expanded to 6 levels)
    const academicLevels = await AcademicLevel.bulkCreate( [
      { name: '1ro Primaria', orderIndex: 1 },
      { name: '2do Primaria', orderIndex: 2 },
      { name: '3ro Primaria', orderIndex: 3 },
      { name: '4to Primaria', orderIndex: 4 },
      { name: '5to Primaria', orderIndex: 5 },
      { name: '6to Primaria', orderIndex: 6 },
    ], { returning: true } );
    if ( !academicLevels || academicLevels.length < 6 ) throw new Error( 'Failed to create academicLevels' );
    if ( !academicLevels[ 0 ] || !academicLevels[ 1 ] || !academicLevels[ 2 ] || !academicLevels[ 3 ] || !academicLevels[ 4 ] || !academicLevels[ 5 ] ) throw new Error( 'Invalid academicLevels data' );

    // Creating users (3 admins, 5 teachers, 12 students)
    const users = await User.bulkCreate( [
      // Admins
      { email: 'admin1@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One' },
      { email: 'admin2@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Two' },
      { email: 'admin3@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Three' },
      // Teachers
      { email: 'docente1@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno' },
      { email: 'docente2@example.com', password: hashedPassword, role: 'docente', name: 'Docente Dos' },
      { email: 'docente3@example.com', password: hashedPassword, role: 'docente', name: 'Docente Tres' },
      { email: 'docente4@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cuatro' },
      { email: 'docente5@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cinco' },
      // Students
      { email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno', academicLevelId: academicLevels[ 0 ].id },
      { email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos', academicLevelId: academicLevels[ 0 ].id },
      { email: 'estudiante3@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Tres', academicLevelId: academicLevels[ 1 ].id },
      { email: 'estudiante4@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cuatro', academicLevelId: academicLevels[ 1 ].id },
      { email: 'estudiante5@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cinco', academicLevelId: academicLevels[ 2 ].id },
      { email: 'estudiante6@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Seis', academicLevelId: academicLevels[ 2 ].id },
      { email: 'estudiante7@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Siete', academicLevelId: academicLevels[ 3 ].id },
      { email: 'estudiante8@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Ocho', academicLevelId: academicLevels[ 3 ].id },
      { email: 'estudiante9@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Nueve', academicLevelId: academicLevels[ 4 ].id },
      { email: 'estudiante10@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Diez', academicLevelId: academicLevels[ 4 ].id },
      { email: 'estudiante11@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Once', academicLevelId: academicLevels[ 5 ].id },
      { email: 'estudiante12@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Doce', academicLevelId: academicLevels[ 5 ].id },
    ], { returning: true } );
    if ( !users || users.length < 20 ) throw new Error( 'Failed to create users' );
    if ( !users[ 0 ] || !users[ 1 ] || !users[ 2 ] || !users[ 3 ] || !users[ 4 ] || !users[ 5 ] || !users[ 6 ] || !users[ 7 ] ||
      !users[ 8 ] || !users[ 9 ] || !users[ 10 ] || !users[ 11 ] || !users[ 12 ] || !users[ 13 ] || !users[ 14 ] ||
      !users[ 15 ] || !users[ 16 ] || !users[ 17 ] || !users[ 18 ] || !users[ 19 ] ) throw new Error( 'Invalid user data' );

    // Creating courses (8 courses across different academic levels)
    const courses = await Course.bulkCreate( [
      {
        tittle: 'Matemáticas Básicas',
        description: 'Curso introductorio de matemáticas para 1ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 0 ].id,
        academicLevelId: academicLevels[ 0 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Biología Introductoria',
        description: 'Curso introductorio de biología para 1ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 0 ].id,
        academicLevelId: academicLevels[ 0 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Ciencias Naturales',
        description: 'Curso de ciencias para 2do Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 1 ].id,
        academicLevelId: academicLevels[ 1 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Matemáticas Avanzadas',
        description: 'Curso avanzado de matemáticas para 3ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 1 ].id,
        academicLevelId: academicLevels[ 2 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Historia Básica',
        description: 'Introducción a la historia para 4to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 2 ].id,
        academicLevelId: academicLevels[ 3 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Lenguaje y Literatura',
        description: 'Curso de lenguaje para 5to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 2 ].id,
        academicLevelId: academicLevels[ 4 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Geografía Introductoria',
        description: 'Curso de geografía para 5to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 0 ].id,
        academicLevelId: academicLevels[ 4 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tittle: 'Ciencias Avanzadas',
        description: 'Curso avanzado de ciencias para 6to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[ 1 ].id,
        academicLevelId: academicLevels[ 5 ].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true } );
    if ( !courses || courses.length < 8 ) throw new Error( 'Failed to create courses' );
    if ( !courses[ 0 ] || !courses[ 1 ] || !courses[ 2 ] || !courses[ 3 ] || !courses[ 4 ] || !courses[ 5 ] || !courses[ 6 ] || !courses[ 7 ] ) throw new Error( 'Invalid course data' );

    // Creating enrollments (students and teachers in multiple courses)
    const enrollments = await Enrollment.bulkCreate( [
      // Course 1: Matemáticas Básicas (1ro Primaria)
      { id: uuidv4(), userId: users[ 8 ].id, courseId: courses[ 0 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 9 ].id, courseId: courses[ 0 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 3 ].id, courseId: courses[ 0 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 2: Biología Introductoria (1ro Primaria)
      { id: uuidv4(), userId: users[ 8 ].id, courseId: courses[ 1 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 9 ].id, courseId: courses[ 1 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 4 ].id, courseId: courses[ 1 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 3: Ciencias Naturales (2do Primaria)
      { id: uuidv4(), userId: users[ 10 ].id, courseId: courses[ 2 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 11 ].id, courseId: courses[ 2 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 5 ].id, courseId: courses[ 2 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 4: Matemáticas Avanzadas (3ro Primaria)
      { id: uuidv4(), userId: users[ 12 ].id, courseId: courses[ 3 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 13 ].id, courseId: courses[ 3 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 3 ].id, courseId: courses[ 3 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 5: Historia Básica (4to Primaria)
      { id: uuidv4(), userId: users[ 14 ].id, courseId: courses[ 4 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 15 ].id, courseId: courses[ 4 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 6 ].id, courseId: courses[ 4 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 6: Lenguaje y Literatura (5to Primaria)
      { id: uuidv4(), userId: users[ 16 ].id, courseId: courses[ 5 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 17 ].id, courseId: courses[ 5 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 7 ].id, courseId: courses[ 5 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 7: Geografía Introductoria (5to Primaria)
      { id: uuidv4(), userId: users[ 16 ].id, courseId: courses[ 6 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 17 ].id, courseId: courses[ 6 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 4 ].id, courseId: courses[ 6 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 8: Ciencias Avanzadas (6to Primaria)
      { id: uuidv4(), userId: users[ 18 ].id, courseId: courses[ 7 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 19 ].id, courseId: courses[ 7 ].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[ 5 ].id, courseId: courses[ 7 ].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true } );
    if ( !enrollments || enrollments.length < 24 ) throw new Error( 'Failed to create enrollments' );
    if ( !enrollments[ 0 ] || !enrollments[ 1 ] || !enrollments[ 2 ] || !enrollments[ 3 ] || !enrollments[ 4 ] || !enrollments[ 5 ] ||
      !enrollments[ 6 ] || !enrollments[ 7 ] || !enrollments[ 8 ] || !enrollments[ 9 ] || !enrollments[ 10 ] || !enrollments[ 11 ] ||
      !enrollments[ 12 ] || !enrollments[ 13 ] || !enrollments[ 14 ] || !enrollments[ 15 ] || !enrollments[ 16 ] || !enrollments[ 17 ] ||
      !enrollments[ 18 ] || !enrollments[ 19 ] || !enrollments[ 20 ] || !enrollments[ 21 ] || !enrollments[ 22 ] || !enrollments[ 23 ] ) {
      throw new Error( 'Invalid enrollment data' );
    }

    // Creating modules for courses (2 modules per course)
    const modules = await Module.bulkCreate( [
      // Course 1: Matemáticas Básicas
      { id: uuidv4(), courseId: courses[ 0 ].id, tittle: 'Módulo 1: Fundamentos', orderIndex: 1, description: 'Módulo introductorio de matemáticas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 0 ].id, tittle: 'Módulo 2: Operaciones Básicas', orderIndex: 2, description: 'Suma y resta avanzada', createdAt: new Date(), updatedAt: new Date() },
      // Course 2: Biología Introductoria
      { id: uuidv4(), courseId: courses[ 1 ].id, tittle: 'Módulo 1: Los Seres Vivos', orderIndex: 1, description: 'Introducción a los seres vivos', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 1 ].id, tittle: 'Módulo 2: Ecosistemas', orderIndex: 2, description: 'Exploración de ecosistemas', createdAt: new Date(), updatedAt: new Date() },
      // Course 3: Ciencias Naturales
      { id: uuidv4(), courseId: courses[ 2 ].id, tittle: 'Módulo 1: La Tierra', orderIndex: 1, description: 'Estudio del planeta Tierra', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 2 ].id, tittle: 'Módulo 2: El Cuerpo Humano', orderIndex: 2, description: 'Anatomía básica', createdAt: new Date(), updatedAt: new Date() },
      // Course 4: Matemáticas Avanzadas
      { id: uuidv4(), courseId: courses[ 3 ].id, tittle: 'Módulo 1: Fracciones', orderIndex: 1, description: 'Introducción a las fracciones', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 3 ].id, tittle: 'Módulo 2: Geometría Básica', orderIndex: 2, description: 'Formas y figuras', createdAt: new Date(), updatedAt: new Date() },
      // Course 5: Historia Básica
      { id: uuidv4(), courseId: courses[ 4 ].id, tittle: 'Módulo 1: Civilizaciones Antiguas', orderIndex: 1, description: 'Historia de civilizaciones', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 4 ].id, tittle: 'Módulo 2: Eventos Clave', orderIndex: 2, description: 'Acontecimientos históricos', createdAt: new Date(), updatedAt: new Date() },
      // Course 6: Lenguaje y Literatura
      { id: uuidv4(), courseId: courses[ 5 ].id, tittle: 'Módulo 1: Gramática', orderIndex: 1, description: 'Reglas gramaticales básicas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 5 ].id, tittle: 'Módulo 2: Literatura', orderIndex: 2, description: 'Análisis de textos', createdAt: new Date(), updatedAt: new Date() },
      // Course 7: Geografía Introductoria
      { id: uuidv4(), courseId: courses[ 6 ].id, tittle: 'Módulo 1: Mapas', orderIndex: 1, description: 'Uso e interpretación de mapas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 6 ].id, tittle: 'Módulo 2: Continentes', orderIndex: 2, description: 'Estudio de los continentes', createdAt: new Date(), updatedAt: new Date() },
      // Course 8: Ciencias Avanzadas
      { id: uuidv4(), courseId: courses[ 7 ].id, tittle: 'Módulo 1: Física Básica', orderIndex: 1, description: 'Conceptos de física', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 7 ].id, tittle: 'Módulo 2: Química Básica', orderIndex: 2, description: 'Introducción a la química', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true } );
    if ( !modules || modules.length < 16 ) throw new Error( 'Failed to create modules' );
    if ( !modules[ 0 ] || !modules[ 1 ] || !modules[ 2 ] || !modules[ 3 ] || !modules[ 4 ] || !modules[ 5 ] || !modules[ 6 ] || !modules[ 7 ] ||
      !modules[ 8 ] || !modules[ 9 ] || !modules[ 10 ] || !modules[ 11 ] || !modules[ 12 ] || !modules[ 13 ] || !modules[ 14 ] || !modules[ 15 ] ) {
      throw new Error( 'Invalid module data' );
    }

    // Creating lessons for modules (3 lessons per module for first two courses)
    const lessons = await Lesson.bulkCreate( [
      // Course 1, Module 1
      { id: uuidv4(), moduleId: modules[ 0 ].id, tittle: 'Lección 1: Sumas Básicas', orderIndex: 1, type: 'video', description: 'Introducción a las sumas', contentUrl: 'https://example.com/sumas.mp4', duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 0 ].id, tittle: 'Lección 2: Restas Básicas', orderIndex: 2, type: 'video', description: 'Introducción a las restas', contentUrl: 'https://example.com/restas.mp4', duration: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 0 ].id, tittle: 'Lección 3: Números Enteros', orderIndex: 3, type: 'archivo', description: 'Conceptos de números enteros', contentUrl: 'https://example.com/enteros.pdf', duration: 20, createdAt: new Date(), updatedAt: new Date() },
      // Course 1, Module 2
      { id: uuidv4(), moduleId: modules[ 1 ].id, tittle: 'Lección 1: Multiplicaciones', orderIndex: 1, type: 'video', description: 'Tablas de multiplicar', contentUrl: 'https://example.com/multiplicaciones.mp4', duration: 35, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 1 ].id, tittle: 'Lección 2: Divisiones', orderIndex: 2, type: 'video', description: 'Introducción a la división', contentUrl: 'https://example.com/divisiones.mp4', duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 1 ].id, tittle: 'Lección 3: Ejercicios Prácticos', orderIndex: 3, type: 'image', description: 'Práctica de operaciones', contentUrl: 'https://example.com/quiz1.json', duration: 15, createdAt: new Date(), updatedAt: new Date() },
      // Course 2, Module 1
      { id: uuidv4(), moduleId: modules[ 2 ].id, tittle: 'Lección 1: Clasificación de Seres Vivos', orderIndex: 1, type: 'video', description: 'Reinos de la vida', contentUrl: 'https://example.com/seresvivos.mp4', duration: 40, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 2 ].id, tittle: 'Lección 2: Plantas', orderIndex: 2, type: 'archivo', description: 'Estructura de las plantas', contentUrl: 'https://example.com/plantas.pdf', duration: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 2 ].id, tittle: 'Lección 3: Animales', orderIndex: 3, type: 'video', description: 'Clasificación de animales', contentUrl: 'https://example.com/animales.mp4', duration: 30, createdAt: new Date(), updatedAt: new Date() },
      // Course 2, Module 2
      { id: uuidv4(), moduleId: modules[ 3 ].id, tittle: 'Lección 1: Ecosistemas Terrestres', orderIndex: 1, type: 'video', description: 'Tipos de ecosistemas terrestres', contentUrl: 'https://example.com/terrestres.mp4', duration: 35, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 3 ].id, tittle: 'Lección 2: Ecosistemas Acuáticos', orderIndex: 2, type: 'video', description: 'Ecosistemas marinos y de agua dulce', contentUrl: 'https://example.com/acuaticos.mp4', duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[ 3 ].id, tittle: 'Lección 3: Cadenas Alimenticias', orderIndex: 3, type: 'video', description: 'Introducción a las cadenas alimenticias', contentUrl: 'https://example.com/cadenas.json', duration: 20, createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true } );
    if ( !lessons || lessons.length < 12 ) throw new Error( 'Failed to create lessons' );
    if ( !lessons[ 0 ] || !lessons[ 1 ] || !lessons[ 2 ] || !lessons[ 3 ] || !lessons[ 4 ] || !lessons[ 5 ] ||
      !lessons[ 6 ] || !lessons[ 7 ] || !lessons[ 8 ] || !lessons[ 9 ] || !lessons[ 10 ] || !lessons[ 11 ] ) {
      throw new Error( 'Invalid lesson data' );
    }

    // Creating schedules for courses (2 schedules per course for first two courses)
    const schedules = await Schedule.bulkCreate( [
      // Course 1
      { id: uuidv4(), courseId: courses[ 0 ].id, lessonId: lessons[ 0 ].id, startTime: new Date( '2025-10-20T10:00:00-05:00' ), endTime: new Date( '2025-10-20T11:00:00-05:00' ), mode: 'live', meetingLink: 'https://zoom.us/j/123456789', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 0 ].id, lessonId: lessons[ 1 ].id, startTime: new Date( '2025-10-21T10:00:00-05:00' ), endTime: new Date( '2025-10-21T11:00:00-05:00' ), mode: 'live', meetingLink: 'https://zoom.us/j/987654321', createdAt: new Date(), updatedAt: new Date() },
      // Course 2
      { id: uuidv4(), courseId: courses[ 1 ].id, lessonId: lessons[ 6 ].id, startTime: new Date( '2025-10-22T09:00:00-05:00' ), endTime: new Date( '2025-10-22T10:00:00-05:00' ), mode: 'live', meetingLink: 'https://zoom.us/j/111222333', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[ 1 ].id, lessonId: lessons[ 7 ].id, startTime: new Date( '2025-10-23T09:00:00-05:00' ), endTime: new Date( '2025-10-23T10:00:00-05:00' ), mode: 'live', meetingLink: 'https://zoom.us/j/444555666', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true } );
    if ( !schedules || schedules.length < 4 ) throw new Error( 'Failed to create schedules' );
    if ( !schedules[ 0 ] || !schedules[ 1 ] || !schedules[ 2 ] || !schedules[ 3 ] ) throw new Error( 'Invalid schedule data' );

    // Creating announcements for courses
    const announcements = await Announcement.bulkCreate( [
      { courseId: courses[ 0 ].id, userId: users[ 3 ].id, title: '¡Bienvenidos a Matemáticas Básicas!', content: 'Empezamos con sumas y restas esta semana. ¡No falten a la clase en vivo!', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Home/logo-sancato.dev.png' },
      { courseId: courses[ 0 ].id, userId: users[ 3 ].id, title: 'Tarea Semanal', content: 'Completar los ejercicios de la Lección 1.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg' },
      { courseId: courses[ 0 ].id, userId: users[ 3 ].id, title: 'Material Adicional', content: 'He subido un PDF con ejercicios extra en la Lección 2.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg' },
      { courseId: courses[ 1 ].id, userId: users[ 4 ].id, title: 'Clase de Seres Vivos', content: 'No olviden revisar el material antes de la clase en vivo.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg' },
      { courseId: courses[ 1 ].id, userId: users[ 4 ].id, title: 'Proyecto de Ecosistemas', content: 'Preparar un dibujo de un ecosistema para la próxima semana.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg' },
      { courseId: courses[ 2 ].id, userId: users[ 5 ].id, title: 'Proyecto de la Tierra', content: 'Preparar un modelo del planeta para la próxima semana.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg' },
    ], { returning: true } );
    if ( !announcements || announcements.length < 6 ) throw new Error( 'Failed to create announcements' );
    if ( !announcements[ 0 ] || !announcements[ 1 ] || !announcements[ 2 ] || !announcements[ 3 ] || !announcements[ 4 ] || !announcements[ 5 ] ) throw new Error( 'Invalid announcement data' );

    // Creating global tracking records
    const trackingData = await GlobalTracking.bulkCreate( [
      // Course 1: Matemáticas Básicas
      { userId: users[ 8 ].id, courseId: courses[ 0 ].id, trackableType: 'lesson', trackableId: lessons[ 0 ].id, status: 'completed', completedAt: new Date() },
      { userId: users[ 8 ].id, courseId: courses[ 0 ].id, trackableType: 'lesson', trackableId: lessons[ 1 ].id, status: 'viewed' },
      { userId: users[ 9 ].id, courseId: courses[ 0 ].id, trackableType: 'lesson', trackableId: lessons[ 0 ].id, status: 'viewed' },
      { userId: users[ 9 ].id, courseId: courses[ 0 ].id, trackableType: 'lesson', trackableId: lessons[ 1 ].id, status: 'completed', completedAt: new Date() },
      // Course 2: Biología Introductoria
      { userId: users[ 8 ].id, courseId: courses[ 1 ].id, trackableType: 'lesson', trackableId: lessons[ 6 ].id, status: 'viewed' },
      { userId: users[ 8 ].id, courseId: courses[ 1 ].id, trackableType: 'lesson', trackableId: lessons[ 7 ].id, status: 'completed', completedAt: new Date() },
      { userId: users[ 9 ].id, courseId: courses[ 1 ].id, trackableType: 'lesson', trackableId: lessons[ 6 ].id, status: 'viewed' },
      { userId: users[ 9 ].id, courseId: courses[ 1 ].id, trackableType: 'lesson', trackableId: lessons[ 7 ].id, status: 'viewed' },
      // Course 3: Ciencias Naturales
      { userId: users[ 10 ].id, courseId: courses[ 2 ].id, trackableType: 'module', trackableId: modules[ 4 ].id, status: 'viewed' },
    ], { returning: true } );
    if ( !trackingData || trackingData.length < 9 ) throw new Error( 'Failed to create tracking data' );
    if ( !trackingData[ 0 ] || !trackingData[ 1 ] || !trackingData[ 2 ] || !trackingData[ 3 ] || !trackingData[ 4 ] ||
      !trackingData[ 5 ] || !trackingData[ 6 ] || !trackingData[ 7 ] || !trackingData[ 8 ] ) {
      throw new Error( 'Invalid tracking data' );
    }

    logger.info( 'Database seeded successfully' );
  } catch ( err ) {
    logger.error( 'Seeding failed', err );
    throw err;
  }
}

seed();