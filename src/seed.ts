import { AcademicLevel, Course, Module, User, Lesson, Schedule, Enrollment, Announcement, sequelize, Submission, QuestionOpt, Question, Quiz, CourseContent, Attendance, Assignment, Group } from '@interfaces/models';
import { logger } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    // Sync database, force: true to reset
    await sequelize.sync( { force: true } );

    // Hash default password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Creating academic levels (6 levels)
    const academicLevels = await AcademicLevel.bulkCreate([
      { id: uuidv4(), name: '1ro Primaria', orderIndex: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: '2do Primaria', orderIndex: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: '3ro Primaria', orderIndex: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: '4to Primaria', orderIndex: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: '5to Primaria', orderIndex: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: '6to Primaria', orderIndex: 6, createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!academicLevels || academicLevels.length < 6) throw new Error('Failed to create academicLevels');
    if (!academicLevels[0] || !academicLevels[1] || !academicLevels[2] || !academicLevels[3] || !academicLevels[4] || !academicLevels[5]) throw new Error('Invalid academicLevels data');

    // Creating users (3 admins, 5 teachers, 12 students)
    const users = await User.bulkCreate([
      // Admins
      { id: uuidv4(), email: 'admin1@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'admin2@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Two', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'admin3@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Three', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      // Teachers
      { id: uuidv4(), email: 'docente1@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'docente2@example.com', password: hashedPassword, role: 'docente', name: 'Docente Dos', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'docente3@example.com', password: hashedPassword, role: 'docente', name: 'Docente Tres', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'docente4@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cuatro', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'docente5@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cinco', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      // Students
      { id: uuidv4(), email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante3@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Tres', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante4@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cuatro', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante5@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cinco', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante6@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Seis', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante7@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Siete', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante8@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Ocho', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante9@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Nueve', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante10@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Diez', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante11@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Once', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), email: 'estudiante12@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Doce', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!users || users.length < 20) throw new Error('Failed to create users');
    if (!users[0] || !users[1] || !users[2] || !users[3] || !users[4] || !users[5] || !users[6] || !users[7] ||
        !users[8] || !users[9] || !users[10] || !users[11] || !users[12] || !users[13] || !users[14] ||
        !users[15] || !users[16] || !users[17] || !users[18] || !users[19]) throw new Error('Invalid user data');

    // Creating courses (8 courses across different academic levels)
    const courses = await Course.bulkCreate([
      {
        id: uuidv4(),
        tittle: 'Matemáticas Básicas',
        description: 'Curso introductorio de matemáticas para 1ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[0].id,
        academicLevelId: academicLevels[0].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Biología Introductoria',
        description: 'Curso introductorio de biología para 1ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[0].id,
        academicLevelId: academicLevels[0].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Ciencias Naturales',
        description: 'Curso de ciencias para 2do Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[1].id,
        academicLevelId: academicLevels[1].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Matemáticas Avanzadas',
        description: 'Curso avanzado de matemáticas para 3ro Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[1].id,
        academicLevelId: academicLevels[2].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Historia Básica',
        description: 'Introducción a la historia para 4to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[2].id,
        academicLevelId: academicLevels[3].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Lenguaje y Literatura',
        description: 'Curso de lenguaje para 5to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[2].id,
        academicLevelId: academicLevels[4].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Geografía Introductoria',
        description: 'Curso de geografía para 5to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[0].id,
        academicLevelId: academicLevels[4].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        tittle: 'Ciencias Avanzadas',
        description: 'Curso avanzado de ciencias para 6to Primaria',
        coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg',
        createdBy: users[1].id,
        academicLevelId: academicLevels[5].id,
        groupsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!courses || courses.length < 8) throw new Error('Failed to create courses');
    if (!courses[0] || !courses[1] || !courses[2] || !courses[3] || !courses[4] || !courses[5] || !courses[6] || !courses[7]) throw new Error('Invalid course data');

    // Creating groups for courses (2 groups for the first two courses)
    const groups = await Group.bulkCreate([
      {
        id: uuidv4(),
        courseId: courses[0].id,
        name: 'Grupo A - Matemáticas',
        description: 'Grupo A para Matemáticas Básicas',
        maxMembers: 10,
        isOpenForJoin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: courses[0].id,
        name: 'Grupo B - Matemáticas',
        description: 'Grupo B para Matemáticas Básicas',
        maxMembers: 10,
        isOpenForJoin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: courses[1].id,
        name: 'Grupo A - Biología',
        description: 'Grupo A para Biología Introductoria',
        maxMembers: 10,
        isOpenForJoin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        courseId: courses[1].id,
        name: 'Grupo B - Biología',
        description: 'Grupo B para Biología Introductoria',
        maxMembers: 10,
        isOpenForJoin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!groups || groups.length < 4) throw new Error('Failed to create groups');
    if (!groups[0] || !groups[1] || !groups[2] || !groups[3]) throw new Error('Invalid group data');

    // Creating enrollments (students and teachers in multiple courses, with group assignments)
    const enrollments = await Enrollment.bulkCreate([
      // Course 1: Matemáticas Básicas (1ro Primaria)
      { id: uuidv4(), userId: users[8].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[0].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[9].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[1].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[3].id, courseId: courses[0].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 2: Biología Introductoria (1ro Primaria)
      { id: uuidv4(), userId: users[8].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[2].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[9].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[3].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[4].id, courseId: courses[1].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 3: Ciencias Naturales (2do Primaria)
      { id: uuidv4(), userId: users[10].id, courseId: courses[2].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[11].id, courseId: courses[2].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[5].id, courseId: courses[2].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 4: Matemáticas Avanzadas (3ro Primaria)
      { id: uuidv4(), userId: users[12].id, courseId: courses[3].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[13].id, courseId: courses[3].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[3].id, courseId: courses[3].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 5: Historia Básica (4to Primaria)
      { id: uuidv4(), userId: users[14].id, courseId: courses[4].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[15].id, courseId: courses[4].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[6].id, courseId: courses[4].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 6: Lenguaje y Literatura (5to Primaria)
      { id: uuidv4(), userId: users[16].id, courseId: courses[5].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[17].id, courseId: courses[5].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[7].id, courseId: courses[5].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 7: Geografía Introductoria (5to Primaria)
      { id: uuidv4(), userId: users[16].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[17].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[4].id, courseId: courses[6].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      // Course 8: Ciencias Avanzadas (6to Primaria)
      { id: uuidv4(), userId: users[18].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[19].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), userId: users[5].id, courseId: courses[7].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!enrollments || enrollments.length < 24) throw new Error('Failed to create enrollments');
    if (!enrollments[0] || !enrollments[1] || !enrollments[2] || !enrollments[3] || !enrollments[4] || !enrollments[5] ||
        !enrollments[6] || !enrollments[7] || !enrollments[8] || !enrollments[9] || !enrollments[10] || !enrollments[11] ||
        !enrollments[12] || !enrollments[13] || !enrollments[14] || !enrollments[15] || !enrollments[16] || !enrollments[17] ||
        !enrollments[18] || !enrollments[19] || !enrollments[20] || !enrollments[21] || !enrollments[22] || !enrollments[23]) {
      throw new Error('Invalid enrollment data');
    }

    // Creating modules for courses (2 modules per course)
    const modules = await Module.bulkCreate([
      // Course 1: Matemáticas Básicas
      { id: uuidv4(), courseId: courses[0].id, tittle: 'Módulo 1: Fundamentos', orderIndex: 1, description: 'Módulo introductorio de matemáticas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[0].id, tittle: 'Módulo 2: Operaciones Básicas', orderIndex: 2, description: 'Suma y resta avanzada', createdAt: new Date(), updatedAt: new Date() },
      // Course 2: Biología Introductoria
      { id: uuidv4(), courseId: courses[1].id, tittle: 'Módulo 1: Los Seres Vivos', orderIndex: 1, description: 'Introducción a los seres vivos', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[1].id, tittle: 'Módulo 2: Ecosistemas', orderIndex: 2, description: 'Exploración de ecosistemas', createdAt: new Date(), updatedAt: new Date() },
      // Course 3: Ciencias Naturales
      { id: uuidv4(), courseId: courses[2].id, tittle: 'Módulo 1: La Tierra', orderIndex: 1, description: 'Estudio del planeta Tierra', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[2].id, tittle: 'Módulo 2: El Cuerpo Humano', orderIndex: 2, description: 'Anatomía básica', createdAt: new Date(), updatedAt: new Date() },
      // Course 4: Matemáticas Avanzadas
      { id: uuidv4(), courseId: courses[3].id, tittle: 'Módulo 1: Fracciones', orderIndex: 1, description: 'Introducción a las fracciones', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[3].id, tittle: 'Módulo 2: Geometría Básica', orderIndex: 2, description: 'Formas y figuras', createdAt: new Date(), updatedAt: new Date() },
      // Course 5: Historia Básica
      { id: uuidv4(), courseId: courses[4].id, tittle: 'Módulo 1: Civilizaciones Antiguas', orderIndex: 1, description: 'Historia de civilizaciones', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[4].id, tittle: 'Módulo 2: Eventos Clave', orderIndex: 2, description: 'Acontecimientos históricos', createdAt: new Date(), updatedAt: new Date() },
      // Course 6: Lenguaje y Literatura
      { id: uuidv4(), courseId: courses[5].id, tittle: 'Módulo 1: Gramática', orderIndex: 1, description: 'Reglas gramaticales básicas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[5].id, tittle: 'Módulo 2: Literatura', orderIndex: 2, description: 'Análisis de textos', createdAt: new Date(), updatedAt: new Date() },
      // Course 7: Geografía Introductoria
      { id: uuidv4(), courseId: courses[6].id, tittle: 'Módulo 1: Mapas', orderIndex: 1, description: 'Uso e interpretación de mapas', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[6].id, tittle: 'Módulo 2: Continentes', orderIndex: 2, description: 'Estudio de los continentes', createdAt: new Date(), updatedAt: new Date() },
      // Course 8: Ciencias Avanzadas
      { id: uuidv4(), courseId: courses[7].id, tittle: 'Módulo 1: Física Básica', orderIndex: 1, description: 'Conceptos de física', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[7].id, tittle: 'Módulo 2: Química Básica', orderIndex: 2, description: 'Introducción a la química', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!modules || modules.length < 16) throw new Error('Failed to create modules');
    if (!modules[0] || !modules[1] || !modules[2] || !modules[3] || !modules[4] || !modules[5] || !modules[6] || !modules[7] ||
        !modules[8] || !modules[9] || !modules[10] || !modules[11] || !modules[12] || !modules[13] || !modules[14] || !modules[15]) {
      throw new Error('Invalid module data');
    }

    // Creating lessons for modules (3 lessons per module for first two courses)
    const lessons = await Lesson.bulkCreate([
      // Course 1, Module 1
      { id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 1: Sumas Básicas', description: 'Introducción a las sumas', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 2: Restas Básicas', description: 'Introducción a las restas', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 3: Números Enteros', description: 'Conceptos de números enteros', orderIndex: 3, duration: 20, createdAt: new Date(), updatedAt: new Date() },
      // Course 1, Module 2
      { id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 1: Multiplicaciones', description: 'Conceptos de multiplicación', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 2: Divisiones', description: 'Conceptos de división', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 3: Ejercicios Prácticos', description: 'Práctica de operaciones', orderIndex: 3, duration: 15, createdAt: new Date(), updatedAt: new Date() },
      // Course 2, Module 1
      { id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 1: Clasificación de Seres Vivos', description: 'Cómo clasificar seres vivos', orderIndex: 1, duration: 40, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 2: Plantas', description: 'Características de las plantas', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 3: Animales', description: 'Características de los animales', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
      // Course 2, Module 2
      { id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 1: Ecosistemas Terrestres', description: 'Estudio de ecosistemas terrestres', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 2: Ecosistemas Acuáticos', description: 'Estudio de ecosistemas acuáticos', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 3: Cadenas Alimenticias', description: 'Conceptos de cadenas alimenticias', orderIndex: 3, duration: 20, createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!lessons || lessons.length < 12) throw new Error('Failed to create lessons');
    if (!lessons[0] || !lessons[1] || !lessons[2] || !lessons[3] || !lessons[4] || !lessons[5] ||
        !lessons[6] || !lessons[7] || !lessons[8] || !lessons[9] || !lessons[10] || !lessons[11]) {
      throw new Error('Invalid lesson data');
    }

    // Creating assignments for lessons (2 assignments for lessons in first two courses)
    const assignments = await Assignment.bulkCreate([
      // Course 1, Module 1, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[0].id,
        tittle: 'Tarea de Sumas',
        description: 'Resolver 10 ejercicios de sumas básicas',
        dueDate: new Date('2025-10-25T23:59:59-05:00'),
        maxScore: 100,
        fileUrl: 'https://media.sancato.dev/assignments/sumas.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 1, Module 2, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[3].id,
        tittle: 'Tarea de Multiplicaciones',
        description: 'Resolver 5 ejercicios de multiplicaciones',
        dueDate: new Date('2025-10-26T23:59:59-05:00'),
        maxScore: 100,
        fileUrl: 'https://media.sancato.dev/assignments/multiplicaciones.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 2, Module 1, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[6].id,
        tittle: 'Clasificación de Seres Vivos',
        description: 'Clasificar 10 seres vivos en un cuadro',
        dueDate: new Date('2025-10-27T23:59:59-05:00'),
        maxScore: 100,
        fileUrl: 'https://media.sancato.dev/assignments/clasificacion.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 2, Module 2, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[9].id,
        tittle: 'Dibujo de Ecosistema',
        description: 'Dibujar un ecosistema terrestre',
        dueDate: new Date('2025-10-28T23:59:59-05:00'),
        maxScore: 100,
        fileUrl: 'https://media.sancato.dev/assignments/ecosistema.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!assignments || assignments.length < 4) throw new Error('Failed to create assignments');
    if (!assignments[0] || !assignments[1] || !assignments[2] || !assignments[3]) throw new Error('Invalid assignment data');

    // Creating attendance records (for students in first two courses)
    const attendance = await Attendance.bulkCreate([
      // Course 1, Lesson 1
      { id: uuidv4(), enrollmentId: enrollments[0].id, lessonId: lessons[0].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), enrollmentId: enrollments[1].id, lessonId: lessons[0].id, status: 'absent', createdAt: new Date(), updatedAt: new Date() },
      // Course 2, Lesson 1
      { id: uuidv4(), enrollmentId: enrollments[3].id, lessonId: lessons[6].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), enrollmentId: enrollments[4].id, lessonId: lessons[6].id, status: 'late', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!attendance || attendance.length < 4) throw new Error('Failed to create attendance records');
    if (!attendance[0] || !attendance[1] || !attendance[2] || !attendance[3]) throw new Error('Invalid attendance data');

    // Creating course content for lessons (2 contents per lesson for first two courses)
    const courseContent = await CourseContent.bulkCreate([
      // Course 1, Module 1, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[0].id,
        type: 'video',
        orderIndex: 1,
        contentBody: 'Video explicativo sobre sumas básicas',
        contentUrl: 'https://media.sancato.dev/videos/sumas.mp4',
        description: 'Video introductorio de sumas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        lessonId: lessons[0].id,
        type: 'pdf',
        orderIndex: 2,
        contentBody: 'Guía en PDF con ejercicios de sumas',
        contentUrl: 'https://media.sancato.dev/pdfs/sumas.pdf',
        description: 'Guía de sumas básicas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 2, Module 1, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[6].id,
        type: 'video',
        orderIndex: 1,
        contentBody: 'Video sobre la clasificación de seres vivos',
        contentUrl: 'https://media.sancato.dev/videos/seres_vivos.mp4',
        description: 'Video sobre clasificación de seres vivos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        lessonId: lessons[6].id,
        type: 'pdf',
        orderIndex: 2,
        contentBody: 'Material en PDF sobre clasificación de seres vivos',
        contentUrl: 'https://media.sancato.dev/pdfs/seres_vivos.pdf',
        description: 'Material de clasificación',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!courseContent || courseContent.length < 4) throw new Error('Failed to create course content');
    if (!courseContent[0] || !courseContent[1] || !courseContent[2] || !courseContent[3]) throw new Error('Invalid course content data');

    // Creating quizzes for lessons (1 quiz per lesson for first two lessons of first two courses)
    const quizzes = await Quiz.bulkCreate([
      // Course 1, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[0].id,
        tittle: 'Quiz de Sumas',
        description: 'Evaluación de sumas básicas',
        duration: 20,
        totalPoints: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 1, Lesson 2
      {
        id: uuidv4(),
        lessonId: lessons[1].id,
        tittle: 'Quiz de Restas',
        description: 'Evaluación de restas básicas',
        duration: 20,
        totalPoints: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 2, Lesson 1
      {
        id: uuidv4(),
        lessonId: lessons[6].id,
        tittle: 'Quiz de Seres Vivos',
        description: 'Evaluación de clasificación de seres vivos',
        duration: 25,
        totalPoints: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Course 2, Lesson 2
      {
        id: uuidv4(),
        lessonId: lessons[7].id,
        tittle: 'Quiz de Plantas',
        description: 'Evaluación sobre plantas',
        duration: 25,
        totalPoints: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!quizzes || quizzes.length < 4) throw new Error('Failed to create quizzes');
    if (!quizzes[0] || !quizzes[1] || !quizzes[2] || !quizzes[3]) throw new Error('Invalid quiz data');

    // Creating questions for quizzes (2 questions per quiz)
    const questions = await Question.bulkCreate([
      // Quiz 1: Sumas
      {
        id: uuidv4(),
        quizId: quizzes[0].id,
        text: '¿Cuál es el resultado de 2 + 3?',
        type: 'mcq',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        quizId: quizzes[0].id,
        text: '¿Es cierto que 5 + 5 = 10?',
        type: 'true_false',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Quiz 2: Restas
      {
        id: uuidv4(),
        quizId: quizzes[1].id,
        text: '¿Cuál es el resultado de 7 - 4?',
        type: 'mcq',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        quizId: quizzes[1].id,
        text: 'Escribe cómo resolver 10 - 3',
        type: 'short_answer',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Quiz 3: Seres Vivos
      {
        id: uuidv4(),
        quizId: quizzes[2].id,
        text: '¿Cuál de estos es un ser vivo?',
        type: 'mcq',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        quizId: quizzes[2].id,
        text: '¿Los humanos son seres vivos? (Verdadero/Falso)',
        type: 'true_false',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Quiz 4: Plantas
      {
        id: uuidv4(),
        quizId: quizzes[3].id,
        text: '¿Qué necesitan las plantas para crecer?',
        type: 'mcq',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        quizId: quizzes[3].id,
        text: 'Describe la función de las raíces',
        type: 'short_answer',
        points: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!questions || questions.length < 8) throw new Error('Failed to create questions');
    if (!questions[0] || !questions[1] || !questions[2] || !questions[3] || !questions[4] || !questions[5] || !questions[6] || !questions[7]) {
      throw new Error('Invalid question data');
    }

    // Creating question options for MCQ and true/false questions
    const questionOptions = await QuestionOpt.bulkCreate([
      // Question 1: 2 + 3
      { id: uuidv4(), questionId: questions[0].id, text: '5', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[0].id, text: '6', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[0].id, text: '7', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[0].id, text: '4', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      // Question 2: 5 + 5 = 10
      { id: uuidv4(), questionId: questions[1].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[1].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      // Question 3: 7 - 4
      { id: uuidv4(), questionId: questions[2].id, text: '3', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[2].id, text: '4', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[2].id, text: '2', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[2].id, text: '5', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      // Question 5: Ser vivo
      { id: uuidv4(), questionId: questions[4].id, text: 'Perro', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[4].id, text: 'Roca', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[4].id, text: 'Mesa', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[4].id, text: 'Silla', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      // Question 6: Humanos son seres vivos
      { id: uuidv4(), questionId: questions[5].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[5].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      // Question 7: Necesidades de plantas
      { id: uuidv4(), questionId: questions[6].id, text: 'Agua', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[6].id, text: 'Plástico', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[6].id, text: 'Metal', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), questionId: questions[6].id, text: 'Vidrio', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!questionOptions || questionOptions.length < 20) throw new Error('Failed to create question options');
    if (!questionOptions[0] || !questionOptions[1] || !questionOptions[2] || !questionOptions[3] ||
        !questionOptions[4] || !questionOptions[5] || !questionOptions[6] || !questionOptions[7] ||
        !questionOptions[8] || !questionOptions[9] || !questionOptions[10] || !questionOptions[11] ||
        !questionOptions[12] || !questionOptions[13] || !questionOptions[14] || !questionOptions[15] ||
        !questionOptions[16] || !questionOptions[17] || !questionOptions[18] || !questionOptions[19]) {
      throw new Error('Invalid question options data');
    }

    // Creating submissions for assignments and quizzes (for students in first two courses)
    // Note: Since submission table requires both assignmentId and quizId, we create dummy placeholders for the unused field
    const dummyQuizId = quizzes[0].id; // Used as placeholder for assignment submissions
    const dummyAssignmentId = assignments[0].id; // Used as placeholder for quiz submissions
    const submissions = await Submission.bulkCreate([
      // Assignment submission for Course 1, Lesson 1
      {
        id: uuidv4(),
        enrollmentId: enrollments[0].id,
        assignmentId: assignments[0].id,
        quizId: dummyQuizId, // Placeholder
        grade: 85.00,
        feedback: 'Buen trabajo, pero revisa el ejercicio 5',
        fileUrl: 'https://media.sancato.dev/submissions/estudiante1_sumas.pdf',
        submittedAt: new Date('2025-10-24T12:00:00-05:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Quiz submission for Course 1, Lesson 1
      {
        id: uuidv4(),
        enrollmentId: enrollments[0].id,
        assignmentId: dummyAssignmentId, // Placeholder
        quizId: quizzes[0].id,
        grade: 90.00,
        feedback: 'Excelente en las sumas',
        fileUrl: null!,
        submittedAt: new Date('2025-10-24T12:30:00-05:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Assignment submission for Course 2, Lesson 1
      {
        id: uuidv4(),
        enrollmentId: enrollments[3].id,
        assignmentId: assignments[2].id,
        quizId: dummyQuizId, // Placeholder
        grade: 80.00,
        feedback: 'Buen esfuerzo, incluye más ejemplos',
        fileUrl: 'https://media.sancato.dev/submissions/estudiante1_clasificacion.pdf',
        submittedAt: new Date('2025-10-24T13:00:00-05:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Quiz submission for Course 2, Lesson 1
      {
        id: uuidv4(),
        enrollmentId: enrollments[3].id,
        assignmentId: dummyAssignmentId, // Placeholder
        quizId: quizzes[2].id,
        grade: 95.00,
        feedback: 'Muy bien en la clasificación',
        fileUrl: null!,
        submittedAt: new Date('2025-10-24T13:30:00-05:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { returning: true });
    if (!submissions || submissions.length < 4) throw new Error('Failed to create submissions');
    if (!submissions[0] || !submissions[1] || !submissions[2] || !submissions[3]) throw new Error('Invalid submission data');


    // Creating schedules for courses (2 schedules per course for first two courses)
    const schedules = await Schedule.bulkCreate([
      // Course 1
      { id: uuidv4(), courseId: courses[0].id, lessonId: lessons[0].id, startTime: new Date('2025-10-27T10:00:00-05:00'), endTime: new Date('2025-10-27T11:00:00-05:00'), mode: 'live', meetingLink: 'https://zoom.us/j/123456789', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[0].id, lessonId: lessons[1].id, startTime: new Date('2025-10-28T10:00:00-05:00'), endTime: new Date('2025-10-28T11:00:00-05:00'), mode: 'live', meetingLink: 'https://zoom.us/j/987654321', createdAt: new Date(), updatedAt: new Date() },
      // Course 2
      { id: uuidv4(), courseId: courses[1].id, lessonId: lessons[6].id, startTime: new Date('2025-10-29T09:00:00-05:00'), endTime: new Date('2025-10-29T10:00:00-05:00'), mode: 'live', meetingLink: 'https://zoom.us/j/111222333', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[1].id, lessonId: lessons[7].id, startTime: new Date('2025-10-30T09:00:00-05:00'), endTime: new Date('2025-10-30T10:00:00-05:00'), mode: 'live', meetingLink: 'https://zoom.us/j/444555666', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!schedules || schedules.length < 4) throw new Error('Failed to create schedules');
    if (!schedules[0] || !schedules[1] || !schedules[2] || !schedules[3]) throw new Error('Invalid schedule data');

    // Creating announcements for courses
    const announcements = await Announcement.bulkCreate([
      { id: uuidv4(), courseId: courses[0].id, userId: users[3].id, title: '¡Bienvenidos a Matemáticas Básicas!', content: 'Empezamos con sumas y restas esta semana. ¡No falten a la clase en vivo!', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Home/logo-sancato.dev.png', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[0].id, userId: users[3].id, title: 'Tarea Semanal', content: 'Completar los ejercicios de la Lección 1.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[0].id, userId: users[3].id, title: 'Material Adicional', content: 'He subido un PDF con ejercicios extra en la Lección 2.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[1].id, userId: users[4].id, title: 'Clase de Seres Vivos', content: 'No olviden revisar el material antes de la clase en vivo.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[1].id, userId: users[4].id, title: 'Proyecto de Ecosistemas', content: 'Preparar un dibujo de un ecosistema para la próxima semana.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), courseId: courses[2].id, userId: users[5].id, title: 'Proyecto de la Tierra', content: 'Preparar un modelo del planeta para la próxima semana.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });
    if (!announcements || announcements.length < 6) throw new Error('Failed to create announcements');
    if (!announcements[0] || !announcements[1] || !announcements[2] || !announcements[3] || !announcements[4] || !announcements[5]) throw new Error('Invalid announcement data');

    logger.info( 'Database seeded successfully' );
  } catch ( err ) {
    logger.error( 'Seeding failed', err );
    throw err;
  }
}

seed();