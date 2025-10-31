import { AcademicLevel, Course, Module, User, Lesson, Schedule, Enrollment, Announcement, sequelize, Submission, QuestionOpt, Question, Quiz, CourseContent, Attendance, Assignment, Group, File } from '@interfaces/models';
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
// Creating users (3 admins, 5 teachers, 24 students)
const users = await User.bulkCreate([
{ id: uuidv4(), email: 'admin1@example.com', password: hashedPassword, role: 'administrador', name: 'Admin One', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'admin2@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Two', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'admin3@example.com', password: hashedPassword, role: 'administrador', name: 'Admin Three', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'docente1@example.com', password: hashedPassword, role: 'docente', name: 'Docente Uno', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'docente2@example.com', password: hashedPassword, role: 'docente', name: 'Docente Dos', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'docente3@example.com', password: hashedPassword, role: 'docente', name: 'Docente Tres', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'docente4@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cuatro', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'docente5@example.com', password: hashedPassword, role: 'docente', name: 'Docente Cinco', otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante1@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Uno', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante2@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dos', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante3@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Tres', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante4@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cuatro', academicLevelId: academicLevels[0].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante5@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Cinco', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante6@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Seis', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante7@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Siete', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante8@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Ocho', academicLevelId: academicLevels[1].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante9@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Nueve', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante10@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Diez', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante11@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Once', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante12@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Doce', academicLevelId: academicLevels[2].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante13@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Trece', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante14@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Catorce', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante15@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Quince', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante16@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dieciséis', academicLevelId: academicLevels[3].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante17@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Diecisiete', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante18@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Dieciocho', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante19@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Diecinueve', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante20@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Veinte', academicLevelId: academicLevels[4].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante21@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Veintiuno', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante22@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Veintidós', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante23@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Veintitrés', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), email: 'estudiante24@example.com', password: hashedPassword, role: 'estudiante', name: 'Estudiante Veinticuatro', academicLevelId: academicLevels[5].id, otpRequired: false, imagePerfilUrl: '/Multimedia/Imagenes/Usuarios/Perfiles/defaultProfile.webp', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!users || users.length < 32) throw new Error('Failed to create users');
if (!users[0] || !users[1] || !users[2] || !users[3] || !users[4] || !users[5] || !users[6] || !users[7] ||
!users[8] || !users[9] || !users[10] || !users[11] || !users[12] || !users[13] || !users[14] ||
!users[15] || !users[16] || !users[17] || !users[18] || !users[19] || !users[20] || !users[21] ||
!users[22] || !users[23] || !users[24] || !users[25] || !users[26] || !users[27] || !users[28] ||
!users[29] || !users[30] || !users[31]) throw new Error('Invalid user data');
// Creating courses (12 courses)
const courses = await Course.bulkCreate([
{ id: uuidv4(), tittle: 'Matemáticas Básicas', description: 'Curso introductorio de matemáticas para 1ro Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[0].id, academicLevelId: academicLevels[0].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Biología Introductoria', description: 'Curso introductorio de biología para 1ro Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[0].id, academicLevelId: academicLevels[0].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Ciencias Naturales', description: 'Curso de ciencias para 2do Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[1].id, academicLevelId: academicLevels[1].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Matemáticas Avanzadas', description: 'Curso avanzado de matemáticas para 3ro Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[1].id, academicLevelId: academicLevels[2].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Historia Básica', description: 'Introducción a la historia para 4to Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[2].id, academicLevelId: academicLevels[3].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Lenguaje y Literatura', description: 'Curso de lenguaje para 5to Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[2].id, academicLevelId: academicLevels[4].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Geografía Introductoria', description: 'Curso de geografía para 5to Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[0].id, academicLevelId: academicLevels[4].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Ciencias Avanzadas', description: 'Curso avanzado de ciencias para 6to Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[1].id, academicLevelId: academicLevels[5].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Arte y Creatividad', description: 'Curso de arte para 1ro Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[2].id, academicLevelId: academicLevels[0].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Educación Física', description: 'Curso de educación física para 2do Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[0].id, academicLevelId: academicLevels[1].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Música Básica', description: 'Introducción a la música para 3ro Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[1].id, academicLevelId: academicLevels[2].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), tittle: 'Informática Introductoria', description: 'Curso básico de informática para 4to Primaria', coverImageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdBy: users[2].id, academicLevelId: academicLevels[3].id, groupsEnabled: true, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!courses || courses.length < 12) throw new Error('Failed to create courses');
if (!courses[0] || !courses[1] || !courses[2] || !courses[3] || !courses[4] || !courses[5] || !courses[6] || !courses[7] ||
!courses[8] || !courses[9] || !courses[10] || !courses[11]) throw new Error('Invalid course data');
// Creating groups for courses (2 groups for the first 6 courses)
const groups = await Group.bulkCreate([
{ id: uuidv4(), courseId: courses[0].id, name: 'Grupo A - Matemáticas', description: 'Grupo A para Matemáticas Básicas', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[0].id, name: 'Grupo B - Matemáticas', description: 'Grupo B para Matemáticas Básicas', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, name: 'Grupo A - Biología', description: 'Grupo A para Biología Introductoria', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, name: 'Grupo B - Biología', description: 'Grupo B para Biología Introductoria', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[2].id, name: 'Grupo A - Ciencias', description: 'Grupo A para Ciencias Naturales', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[2].id, name: 'Grupo B - Ciencias', description: 'Grupo B para Ciencias Naturales', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[3].id, name: 'Grupo A - Matemáticas Avanzadas', description: 'Grupo A para Matemáticas Avanzadas', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[3].id, name: 'Grupo B - Matemáticas Avanzadas', description: 'Grupo B para Matemáticas Avanzadas', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[4].id, name: 'Grupo A - Historia', description: 'Grupo A para Historia Básica', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[4].id, name: 'Grupo B - Historia', description: 'Grupo B para Historia Básica', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[5].id, name: 'Grupo A - Lenguaje', description: 'Grupo A para Lenguaje y Literatura', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[5].id, name: 'Grupo B - Lenguaje', description: 'Grupo B para Lenguaje y Literatura', maxMembers: 10, isOpenForJoin: true, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!groups || groups.length < 12) throw new Error('Failed to create groups');
if (!groups[0] || !groups[1] || !groups[2] || !groups[3] || !groups[4] || !groups[5] || !groups[6] || !groups[7] ||
!groups[8] || !groups[9] || !groups[10] || !groups[11]) throw new Error('Invalid group data');
// Creating enrollments (all students enrolled in courses of their level, teachers assigned)
const enrollments = await Enrollment.bulkCreate([
{ id: uuidv4(), userId: users[8].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[0].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[9].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[1].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[3].id, courseId: courses[0].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[8].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[2].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[9].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[3].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[4].id, courseId: courses[1].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[12].id, courseId: courses[2].id, role: 'estudiante', groupId: groups[4].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[13].id, courseId: courses[2].id, role: 'estudiante', groupId: groups[5].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[5].id, courseId: courses[2].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[16].id, courseId: courses[3].id, role: 'estudiante', groupId: groups[6].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[17].id, courseId: courses[3].id, role: 'estudiante', groupId: groups[7].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[3].id, courseId: courses[3].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[20].id, courseId: courses[4].id, role: 'estudiante', groupId: groups[8].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[21].id, courseId: courses[4].id, role: 'estudiante', groupId: groups[9].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[6].id, courseId: courses[4].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[24].id, courseId: courses[5].id, role: 'estudiante', groupId: groups[10].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[25].id, courseId: courses[5].id, role: 'estudiante', groupId: groups[11].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[7].id, courseId: courses[5].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[24].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[25].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[4].id, courseId: courses[6].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[28].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[29].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[5].id, courseId: courses[7].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[8].id, courseId: courses[8].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[9].id, courseId: courses[8].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[6].id, courseId: courses[8].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[12].id, courseId: courses[9].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[13].id, courseId: courses[9].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[7].id, courseId: courses[9].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[16].id, courseId: courses[10].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[17].id, courseId: courses[10].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[3].id, courseId: courses[10].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[20].id, courseId: courses[11].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[21].id, courseId: courses[11].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[4].id, courseId: courses[11].id, role: 'docente', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[10].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[0].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[11].id, courseId: courses[0].id, role: 'estudiante', groupId: groups[1].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[10].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[2].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[11].id, courseId: courses[1].id, role: 'estudiante', groupId: groups[3].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[14].id, courseId: courses[2].id, role: 'estudiante', groupId: groups[4].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[15].id, courseId: courses[2].id, role: 'estudiante', groupId: groups[5].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[18].id, courseId: courses[3].id, role: 'estudiante', groupId: groups[6].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[19].id, courseId: courses[3].id, role: 'estudiante', groupId: groups[7].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[22].id, courseId: courses[4].id, role: 'estudiante', groupId: groups[8].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[23].id, courseId: courses[4].id, role: 'estudiante', groupId: groups[9].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[26].id, courseId: courses[5].id, role: 'estudiante', groupId: groups[10].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[27].id, courseId: courses[5].id, role: 'estudiante', groupId: groups[11].id, enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[26].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[27].id, courseId: courses[6].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[30].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[31].id, courseId: courses[7].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[10].id, courseId: courses[8].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[11].id, courseId: courses[8].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[14].id, courseId: courses[9].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[15].id, courseId: courses[9].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[18].id, courseId: courses[10].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[19].id, courseId: courses[10].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[22].id, courseId: courses[11].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), userId: users[23].id, courseId: courses[11].id, role: 'estudiante', enrollmentDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!enrollments || enrollments.length < 48) throw new Error('Failed to create enrollments');
if (!enrollments[0] || !enrollments[1] || !enrollments[2] || !enrollments[3] || !enrollments[4] || !enrollments[5] ||
!enrollments[6] || !enrollments[7] || !enrollments[8] || !enrollments[9] || !enrollments[10] || !enrollments[11] ||
!enrollments[12] || !enrollments[13] || !enrollments[14] || !enrollments[15] || !enrollments[16] || !enrollments[17] ||
!enrollments[18] || !enrollments[19] || !enrollments[20] || !enrollments[21] || !enrollments[22] || !enrollments[23] ||
!enrollments[24] || !enrollments[25] || !enrollments[26] || !enrollments[27] || !enrollments[28] || !enrollments[29] ||
!enrollments[30] || !enrollments[31] || !enrollments[32] || !enrollments[33] || !enrollments[34] || !enrollments[35] ||
!enrollments[36] || !enrollments[37] || !enrollments[38] || !enrollments[39] || !enrollments[40] || !enrollments[41] ||
!enrollments[42] || !enrollments[43] || !enrollments[44] || !enrollments[45] || !enrollments[46] || !enrollments[47]) {
throw new Error('Invalid enrollment data');
}
// Creating modules for courses (2 modules per course)
const modules = await Module.bulkCreate([
{ id: uuidv4(), courseId: courses[0].id, tittle: 'Módulo 1: Fundamentos', orderIndex: 1, description: 'Módulo introductorio de matemáticas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[0].id, tittle: 'Módulo 2: Operaciones Básicas', orderIndex: 2, description: 'Suma y resta avanzada', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, tittle: 'Módulo 1: Los Seres Vivos', orderIndex: 1, description: 'Introducción a los seres vivos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, tittle: 'Módulo 2: Ecosistemas', orderIndex: 2, description: 'Exploración de ecosistemas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[2].id, tittle: 'Módulo 1: La Tierra', orderIndex: 1, description: 'Estudio del planeta Tierra', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[2].id, tittle: 'Módulo 2: El Cuerpo Humano', orderIndex: 2, description: 'Anatomía básica', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[3].id, tittle: 'Módulo 1: Fracciones', orderIndex: 1, description: 'Introducción a las fracciones', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[3].id, tittle: 'Módulo 2: Geometría Básica', orderIndex: 2, description: 'Formas y figuras', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[4].id, tittle: 'Módulo 1: Civilizaciones Antiguas', orderIndex: 1, description: 'Historia de civilizaciones', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[4].id, tittle: 'Módulo 2: Eventos Clave', orderIndex: 2, description: 'Acontecimientos históricos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[5].id, tittle: 'Módulo 1: Gramática', orderIndex: 1, description: 'Reglas gramaticales básicas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[5].id, tittle: 'Módulo 2: Literatura', orderIndex: 2, description: 'Análisis de textos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[6].id, tittle: 'Módulo 1: Mapas', orderIndex: 1, description: 'Uso e interpretación de mapas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[6].id, tittle: 'Módulo 2: Continentes', orderIndex: 2, description: 'Estudio de los continentes', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[7].id, tittle: 'Módulo 1: Física Básica', orderIndex: 1, description: 'Conceptos de física', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[7].id, tittle: 'Módulo 2: Química Básica', orderIndex: 2, description: 'Introducción a la química', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[8].id, tittle: 'Módulo 1: Dibujo', orderIndex: 1, description: 'Introducción al dibujo', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[8].id, tittle: 'Módulo 2: Pintura', orderIndex: 2, description: 'Técnicas de pintura', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[9].id, tittle: 'Módulo 1: Deportes', orderIndex: 1, description: 'Deportes básicos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[9].id, tittle: 'Módulo 2: Ejercicios', orderIndex: 2, description: 'Rutinas de ejercicio', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[10].id, tittle: 'Módulo 1: Notas Musicales', orderIndex: 1, description: 'Introducción a las notas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[10].id, tittle: 'Módulo 2: Instrumentos', orderIndex: 2, description: 'Conocimiento de instrumentos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[11].id, tittle: 'Módulo 1: Computadoras', orderIndex: 1, description: 'Partes de una computadora', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[11].id, tittle: 'Módulo 2: Internet', orderIndex: 2, description: 'Navegación en internet', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!modules || modules.length < 24) throw new Error('Failed to create modules');
if (!modules[0] || !modules[1] || !modules[2] || !modules[3] || !modules[4] || !modules[5] || !modules[6] || !modules[7] ||
!modules[8] || !modules[9] || !modules[10] || !modules[11] || !modules[12] || !modules[13] || !modules[14] || !modules[15] ||
!modules[16] || !modules[17] || !modules[18] || !modules[19] || !modules[20] || !modules[21] || !modules[22] || !modules[23]) {
throw new Error('Invalid module data');
}
// Creating lessons for modules (3 lessons per module)
const lessons = await Lesson.bulkCreate([
{ id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 1: Sumas Básicas', description: 'Introducción a las sumas', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 2: Restas Básicas', description: 'Introducción a las restas', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[0].id, tittle: 'Lección 3: Números Enteros', description: 'Conceptos de números enteros', orderIndex: 3, duration: 20, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 1: Multiplicaciones', description: 'Conceptos de multiplicación', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 2: Divisiones', description: 'Conceptos de división', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[1].id, tittle: 'Lección 3: Ejercicios Prácticos', description: 'Práctica de operaciones', orderIndex: 3, duration: 15, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 1: Clasificación de Seres Vivos', description: 'Cómo clasificar seres vivos', orderIndex: 1, duration: 40, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 2: Plantas', description: 'Características de las plantas', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[2].id, tittle: 'Lección 3: Animales', description: 'Características de los animales', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 1: Ecosistemas Terrestres', description: 'Estudio de ecosistemas terrestres', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 2: Ecosistemas Acuáticos', description: 'Estudio de ecosistemas acuáticos', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[3].id, tittle: 'Lección 3: Cadenas Alimenticias', description: 'Conceptos de cadenas alimenticias', orderIndex: 3, duration: 20, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[4].id, tittle: 'Lección 1: Planeta Tierra', description: 'Introducción al planeta Tierra', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[4].id, tittle: 'Lección 2: Ciclo del Agua', description: 'El ciclo del agua', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[4].id, tittle: 'Lección 3: Volcanes', description: 'Estudio de volcanes', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[5].id, tittle: 'Lección 1: Sistema Respiratorio', description: 'El sistema respiratorio', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[5].id, tittle: 'Lección 2: Sistema Circulatorio', description: 'El sistema circulatorio', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[5].id, tittle: 'Lección 3: Sistema Digestivo', description: 'El sistema digestivo', orderIndex: 3, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[6].id, tittle: 'Lección 1: Fracciones Básicas', description: 'Introducción a fracciones', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[6].id, tittle: 'Lección 2: Operaciones con Fracciones', description: 'Operaciones con fracciones', orderIndex: 2, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[6].id, tittle: 'Lección 3: Decimales', description: 'Introducción a decimales', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[7].id, tittle: 'Lección 1: Formas Geométricas', description: 'Formas básicas', orderIndex: 1, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[7].id, tittle: 'Lección 2: Medidas', description: 'Medidas y perímetros', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[7].id, tittle: 'Lección 3: Ángulos', description: 'Introducción a ángulos', orderIndex: 3, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[8].id, tittle: 'Lección 1: Egipcios', description: 'Civilización egipcia', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[8].id, tittle: 'Lección 2: Romanos', description: 'Imperio romano', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[8].id, tittle: 'Lección 3: Mayas', description: 'Civilización maya', orderIndex: 3, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[9].id, tittle: 'Lección 1: Descubrimiento de América', description: 'Evento histórico', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[9].id, tittle: 'Lección 2: Revolución Industrial', description: 'Revolución industrial', orderIndex: 2, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[9].id, tittle: 'Lección 3: Guerras Mundiales', description: 'Guerras mundiales', orderIndex: 3, duration: 40, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[10].id, tittle: 'Lección 1: Verbos', description: 'Conjugación de verbos', orderIndex: 1, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[10].id, tittle: 'Lección 2: Sustantivos', description: 'Tipos de sustantivos', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[10].id, tittle: 'Lección 3: Adjetivos', description: 'Uso de adjetivos', orderIndex: 3, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[11].id, tittle: 'Lección 1: Cuentos', description: 'Análisis de cuentos', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[11].id, tittle: 'Lección 2: Poemas', description: 'Análisis de poemas', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[11].id, tittle: 'Lección 3: Novelas', description: 'Introducción a novelas', orderIndex: 3, duration: 40, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[12].id, tittle: 'Lección 1: Tipos de Mapas', description: 'Diferentes tipos de mapas', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[12].id, tittle: 'Lección 2: Orientación', description: 'Orientación en mapas', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[12].id, tittle: 'Lección 3: Escalas', description: 'Escalas en mapas', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[13].id, tittle: 'Lección 1: Asia', description: 'Continente Asia', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[13].id, tittle: 'Lección 2: Europa', description: 'Continente Europa', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[13].id, tittle: 'Lección 3: América', description: 'Continente América', orderIndex: 3, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[14].id, tittle: 'Lección 1: Fuerza', description: 'Concepto de fuerza', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[14].id, tittle: 'Lección 2: Movimiento', description: 'Leyes del movimiento', orderIndex: 2, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[14].id, tittle: 'Lección 3: Energía', description: 'Tipos de energía', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[15].id, tittle: 'Lección 1: Átomos', description: 'Estructura atómica', orderIndex: 1, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[15].id, tittle: 'Lección 2: Elementos', description: 'Tabla periódica', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[15].id, tittle: 'Lección 3: Reacciones', description: 'Reacciones químicas', orderIndex: 3, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[16].id, tittle: 'Lección 1: Líneas y Formas', description: 'Dibujo con líneas', orderIndex: 1, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[16].id, tittle: 'Lección 2: Colores', description: 'Teoría del color', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[16].id, tittle: 'Lección 3: Dibujo Libre', description: 'Dibujo libre', orderIndex: 3, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[17].id, tittle: 'Lección 1: Pintura con Acuarelas', description: 'Uso de acuarelas', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[17].id, tittle: 'Lección 2: Pintura con Óleo', description: 'Uso de óleo', orderIndex: 2, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[17].id, tittle: 'Lección 3: Técnicas Mixtas', description: 'Técnicas mixtas de pintura', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[18].id, tittle: 'Lección 1: Fútbol', description: 'Reglas del fútbol', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[18].id, tittle: 'Lección 2: Baloncesto', description: 'Reglas del baloncesto', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[18].id, tittle: 'Lección 3: Voleibol', description: 'Reglas del voleibol', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[19].id, tittle: 'Lección 1: Calentamiento', description: 'Ejercicios de calentamiento', orderIndex: 1, duration: 20, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[19].id, tittle: 'Lección 2: Estiramientos', description: 'Ejercicios de estiramiento', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[19].id, tittle: 'Lección 3: Cardio', description: 'Ejercicios cardiovasculares', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[20].id, tittle: 'Lección 1: Ritmo', description: 'Concepto de ritmo', orderIndex: 1, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[20].id, tittle: 'Lección 2: Melodía', description: 'Concepto de melodía', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[20].id, tittle: 'Lección 3: Armonía', description: 'Concepto de armonía', orderIndex: 3, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[21].id, tittle: 'Lección 1: Piano', description: 'Introducción al piano', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[21].id, tittle: 'Lección 2: Guitarra', description: 'Introducción a la guitarra', orderIndex: 2, duration: 35, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[21].id, tittle: 'Lección 3: Flauta', description: 'Introducción a la flauta', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[22].id, tittle: 'Lección 1: Hardware', description: 'Componentes de hardware', orderIndex: 1, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[22].id, tittle: 'Lección 2: Software', description: 'Tipos de software', orderIndex: 2, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[22].id, tittle: 'Lección 3: Redes', description: 'Introducción a redes', orderIndex: 3, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[23].id, tittle: 'Lección 1: Navegación', description: 'Navegación en internet', orderIndex: 1, duration: 25, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[23].id, tittle: 'Lección 2: Seguridad', description: 'Seguridad en internet', orderIndex: 2, duration: 30, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), moduleId: modules[23].id, tittle: 'Lección 3: Búsquedas', description: 'Búsquedas efectivas', orderIndex: 3, duration: 25, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!lessons || lessons.length < 72) throw new Error('Failed to create lessons');
if (!lessons[0] || !lessons[1] || !lessons[2] || !lessons[3] || !lessons[4] || !lessons[5] || !lessons[6] || !lessons[7] ||
!lessons[8] || !lessons[9] || !lessons[10] || !lessons[11] || !lessons[12] || !lessons[13] || !lessons[14] || !lessons[15] ||
!lessons[16] || !lessons[17] || !lessons[18] || !lessons[19] || !lessons[20] || !lessons[21] || !lessons[22] || !lessons[23] ||
!lessons[24] || !lessons[25] || !lessons[26] || !lessons[27] || !lessons[28] || !lessons[29] || !lessons[30] || !lessons[31] ||
!lessons[32] || !lessons[33] || !lessons[34] || !lessons[35] || !lessons[36] || !lessons[37] || !lessons[38] || !lessons[39] ||
!lessons[40] || !lessons[41] || !lessons[42] || !lessons[43] || !lessons[44] || !lessons[45] || !lessons[46] || !lessons[47] ||
!lessons[48] || !lessons[49] || !lessons[50] || !lessons[51] || !lessons[52] || !lessons[53] || !lessons[54] || !lessons[55] ||
!lessons[56] || !lessons[57] || !lessons[58] || !lessons[59] || !lessons[60] || !lessons[61] || !lessons[62] || !lessons[63] ||
!lessons[64] || !lessons[65] || !lessons[66] || !lessons[67] || !lessons[68] || !lessons[69] || !lessons[70] || !lessons[71]) {
throw new Error('Invalid lesson data');
}
// Creating assignments for lessons (1 assignment per lesson for the first 12 lessons)
const assignments = await Assignment.bulkCreate([
{ id: uuidv4(), lessonId: lessons[0].id, tittle: 'Tarea de Sumas', description: 'Resolver 10 ejercicios de sumas básicas', dueDate: new Date('2025-10-26T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[1].id, tittle: 'Tarea de Restas', description: 'Resolver 10 ejercicios de restas básicas', dueDate: new Date('2025-10-27T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[2].id, tittle: 'Tarea de Números Enteros', description: 'Resolver ejercicios de números enteros', dueDate: new Date('2025-10-28T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[3].id, tittle: 'Tarea de Multiplicaciones', description: 'Resolver 5 ejercicios de multiplicaciones', dueDate: new Date('2025-10-27T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[4].id, tittle: 'Tarea de Divisiones', description: 'Resolver ejercicios de divisiones', dueDate: new Date('2025-10-28T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[5].id, tittle: 'Tarea de Ejercicios Prácticos', description: 'Completar ejercicios prácticos', dueDate: new Date('2025-10-29T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[6].id, tittle: 'Clasificación de Seres Vivos', description: 'Clasificar 10 seres vivos en un cuadro', dueDate: new Date('2025-10-28T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[7].id, tittle: 'Tarea de Plantas', description: 'Describir características de plantas', dueDate: new Date('2025-10-29T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[8].id, tittle: 'Tarea de Animales', description: 'Describir características de animales', dueDate: new Date('2025-10-30T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[9].id, tittle: 'Dibujo de Ecosistema', description: 'Dibujar un ecosistema terrestre', dueDate: new Date('2025-10-29T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[10].id, tittle: 'Tarea de Ecosistemas Acuáticos', description: 'Describir ecosistemas acuáticos', dueDate: new Date('2025-10-30T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[11].id, tittle: 'Tarea de Cadenas Alimenticias', description: 'Dibujar una cadena alimenticia', dueDate: new Date('2025-10-31T04:59:59'), maxScore: 100, isGroupAssignment: false, maxAttempts: 1, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!assignments || assignments.length < 12) throw new Error('Failed to create assignments');
if (!assignments[0] || !assignments[1] || !assignments[2] || !assignments[3] || !assignments[4] || !assignments[5] || !assignments[6] || !assignments[7] ||
!assignments[8] || !assignments[9] || !assignments[10] || !assignments[11]) throw new Error('Invalid assignment data');
// Creating attendance records (for the first 4 lessons)
const attendance = await Attendance.bulkCreate([
{ id: uuidv4(), enrollmentId: enrollments[0].id, lessonId: lessons[0].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[1].id, lessonId: lessons[0].id, status: 'absent', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, lessonId: lessons[6].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[4].id, lessonId: lessons[6].id, status: 'late', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[0].id, lessonId: lessons[1].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[1].id, lessonId: lessons[1].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, lessonId: lessons[7].id, status: 'absent', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[4].id, lessonId: lessons[7].id, status: 'present', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!attendance || attendance.length < 8) throw new Error('Failed to create attendance');
if (!attendance[0] || !attendance[1] || !attendance[2] || !attendance[3] || !attendance[4] || !attendance[5] || !attendance[6] || !attendance[7]) throw new Error('Invalid attendance data');
// Creating course content (2 per the first 4 lessons)
const courseContent = await CourseContent.bulkCreate([
{ id: uuidv4(), lessonId: lessons[0].id, type: 'video', orderIndex: 1, contentBody: 'Video explicativo sobre sumas básicas', contentUrl: 'https://media.sancato.dev/videos/sumas.mp4', description: 'Video introductorio de sumas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[0].id, type: 'pdf', orderIndex: 2, contentBody: 'Guía en PDF con ejercicios de sumas', contentUrl: 'https://media.sancato.dev/pdfs/sumas.pdf', description: 'Guía de sumas básicas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[6].id, type: 'video', orderIndex: 1, contentBody: 'Video sobre la clasificación de seres vivos', contentUrl: 'https://www.youtube.com/watch?v=yjBuru8lHLs', description: 'Video sobre clasificación de seres vivos', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[6].id, type: 'pdf', orderIndex: 2, contentBody: 'Material en PDF sobre clasificación de seres vivos', contentUrl: 'https://media.sancato.dev/Documentos/Cursos/Content/Pdf/2%20Mdulo%20Biologa.pdf', description: 'Material de clasificación', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[1].id, type: 'video', orderIndex: 1, contentBody: 'Video explicativo sobre restas básicas', contentUrl: 'https://media.sancato.dev/videos/restas.mp4', description: 'Video introductorio de restas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[1].id, type: 'pdf', orderIndex: 2, contentBody: 'Guía en PDF con ejercicios de restas', contentUrl: 'https://media.sancato.dev/pdfs/restas.pdf', description: 'Guía de restas básicas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[7].id, type: 'video', orderIndex: 1, contentBody: 'Video sobre plantas', contentUrl: 'https://www.youtube.com/watch?v=plants', description: 'Video sobre plantas', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[7].id, type: 'pdf', orderIndex: 2, contentBody: 'Material en PDF sobre plantas', contentUrl: 'https://media.sancato.dev/pdfs/plantas.pdf', description: 'Material de plantas', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!courseContent || courseContent.length < 8) throw new Error('Failed to create course content');
if (!courseContent[0] || !courseContent[1] || !courseContent[2] || !courseContent[3] || !courseContent[4] || !courseContent[5] || !courseContent[6] || !courseContent[7]) throw new Error('Invalid course content data');
// Creating quizzes for lessons (1 per the first 8 lessons)
const quizzes = await Quiz.bulkCreate([
{ id: uuidv4(), lessonId: lessons[0].id, tittle: 'Quiz de Sumas', description: 'Evaluación de sumas básicas', duration: 20, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[1].id, tittle: 'Quiz de Restas', description: 'Evaluación de restas básicas', duration: 20, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[6].id, tittle: 'Quiz de Seres Vivos', description: 'Evaluación de clasificación de seres vivos', duration: 25, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[7].id, tittle: 'Quiz de Plantas', description: 'Evaluación sobre plantas', duration: 25, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[2].id, tittle: 'Quiz de Números Enteros', description: 'Evaluación de números enteros', duration: 20, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[3].id, tittle: 'Quiz de Multiplicaciones', description: 'Evaluación de multiplicaciones', duration: 25, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[8].id, tittle: 'Quiz de Animales', description: 'Evaluación sobre animales', duration: 25, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), lessonId: lessons[9].id, tittle: 'Quiz de Ecosistemas Terrestres', description: 'Evaluación de ecosistemas terrestres', duration: 30, totalPoints: 10, isGroupQuiz: false, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!quizzes || quizzes.length < 8) throw new Error('Failed to create quizzes');
if (!quizzes[0] || !quizzes[1] || !quizzes[2] || !quizzes[3] || !quizzes[4] || !quizzes[5] || !quizzes[6] || !quizzes[7]) throw new Error('Invalid quiz data');
// Creating questions for quizzes (2 per quiz)
const questions = await Question.bulkCreate([
{ id: uuidv4(), quizId: quizzes[0].id, text: '¿Cuál es el resultado de 2 + 3?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[0].id, text: '¿Es cierto que 5 + 5 = 10?', type: 'true_false', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[1].id, text: '¿Cuál es el resultado de 7 - 4?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[1].id, text: 'Escribe cómo resolver 10 - 3', type: 'short_answer', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[2].id, text: '¿Cuál de estos es un ser vivo?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[2].id, text: '¿Los humanos son seres vivos? (Verdadero/Falso)', type: 'true_false', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[3].id, text: '¿Qué necesitan las plantas para crecer?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[3].id, text: 'Describe la función de las raíces', type: 'short_answer', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[4].id, text: '¿Cuál es el resultado de 5 + 6?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[4].id, text: '¿Es cierto que 10 + 10 = 20?', type: 'true_false', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[5].id, text: '¿Cuál es el resultado de 3 * 4?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[5].id, text: 'Escribe cómo resolver 12 / 3', type: 'short_answer', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[6].id, text: '¿Cuál de estos es un animal?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[6].id, text: '¿Los animales respiran? (Verdadero/Falso)', type: 'true_false', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[7].id, text: '¿Qué es un ecosistema terrestre?', type: 'mcq', points: 5, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), quizId: quizzes[7].id, text: 'Describe un ecosistema terrestre', type: 'short_answer', points: 5, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!questions || questions.length < 16) throw new Error('Failed to create questions');
if (!questions[0] || !questions[1] || !questions[2] || !questions[3] || !questions[4] || !questions[5] || !questions[6] || !questions[7] ||
!questions[8] || !questions[9] || !questions[10] || !questions[11] || !questions[12] || !questions[13] || !questions[14] || !questions[15]) {
throw new Error('Invalid question data');
}
// Creating question options (4 per mcq/true_false)
const questionOptions = await QuestionOpt.bulkCreate([
{ id: uuidv4(), questionId: questions[0].id, text: '5', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[0].id, text: '6', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[0].id, text: '4', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[0].id, text: '7', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[1].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[1].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[2].id, text: '3', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[2].id, text: '4', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[2].id, text: '2', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[2].id, text: '5', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[4].id, text: 'Perro', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[4].id, text: 'Roca', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[4].id, text: 'Mesa', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[4].id, text: 'Silla', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[5].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[5].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[6].id, text: 'Agua', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[6].id, text: 'Plástico', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[6].id, text: 'Metal', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[6].id, text: 'Vidrio', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[8].id, text: '11', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[8].id, text: '12', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[8].id, text: '10', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[8].id, text: '13', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[9].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[9].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[10].id, text: '12', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[10].id, text: '13', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[10].id, text: '11', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[10].id, text: '14', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[12].id, text: 'Perro', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[12].id, text: 'Roca', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[12].id, text: 'Mesa', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[12].id, text: 'Silla', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[13].id, text: 'Verdadero', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[13].id, text: 'Falso', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[14].id, text: 'Bosque', isCorrect: true, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[14].id, text: 'Ciudad', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[14].id, text: 'Edificio', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), questionId: questions[14].id, text: 'Carro', isCorrect: false, createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!questionOptions || questionOptions.length < 40) throw new Error('Failed to create question options');
if (!questionOptions[0] || !questionOptions[1] || !questionOptions[2] || !questionOptions[3] ||
!questionOptions[4] || !questionOptions[5] || !questionOptions[6] || !questionOptions[7] ||
!questionOptions[8] || !questionOptions[9] || !questionOptions[10] || !questionOptions[11] ||
!questionOptions[12] || !questionOptions[13] || !questionOptions[14] || !questionOptions[15] ||
!questionOptions[16] || !questionOptions[17] || !questionOptions[18] || !questionOptions[19] ||
!questionOptions[20] || !questionOptions[21] || !questionOptions[22] || !questionOptions[23] ||
!questionOptions[24] || !questionOptions[25] || !questionOptions[26] || !questionOptions[27] ||
!questionOptions[28] || !questionOptions[29] || !questionOptions[30] || !questionOptions[31] ||
!questionOptions[32] || !questionOptions[33] || !questionOptions[34] || !questionOptions[35] ||
!questionOptions[36] || !questionOptions[37] || !questionOptions[38] || !questionOptions[39]) {
throw new Error('Invalid question options data');
}
// Creating submissions for assignments and quizzes (2 per the first 4 assignments/quizzes)
const submissions = await Submission.bulkCreate([
{ id: uuidv4(), enrollmentId: enrollments[0].id, assignmentId: assignments[0].id, grade: 90.00, feedback: 'Excelente en las sumas', status: 'graded', submittedAt: new Date('2025-10-24T17:30:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[0].id, quizId: quizzes[0].id, grade: 85.00, feedback: 'Buen trabajo, pero revisa el ejercicio 5', status: 'graded', submittedAt: new Date('2025-10-24T17:00:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, assignmentId: assignments[6].id, grade: 80.00, feedback: 'Buen esfuerzo, incluye más ejemplos', status: 'graded', submittedAt: new Date('2025-10-24T18:00:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, quizId: quizzes[2].id, grade: 95.00, feedback: 'Muy bien en la clasificación', status: 'graded', submittedAt: new Date('2025-10-24T18:30:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[0].id, assignmentId: assignments[1].id, grade: 88.00, feedback: 'Bien en restas', status: 'graded', submittedAt: new Date('2025-10-25T17:30:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[0].id, quizId: quizzes[1].id, grade: 92.00, feedback: 'Excelente', status: 'graded', submittedAt: new Date('2025-10-25T17:00:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, assignmentId: assignments[7].id, grade: 85.00, feedback: 'Buen trabajo en plantas', status: 'graded', submittedAt: new Date('2025-10-25T18:00:00'), createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), enrollmentId: enrollments[3].id, quizId: quizzes[3].id, grade: 90.00, feedback: 'Muy bien', status: 'graded', submittedAt: new Date('2025-10-25T18:30:00'), createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!submissions || submissions.length < 8) throw new Error('Failed to create submissions');
if (!submissions[0] || !submissions[1] || !submissions[2] || !submissions[3] || !submissions[4] || !submissions[5] || !submissions[6] || !submissions[7]) throw new Error('Invalid submission data');
// Creating schedules (1 per the first 8 lessons)
const schedules = await Schedule.bulkCreate([
{ id: uuidv4(), courseId: courses[0].id, lessonId: lessons[0].id, startTime: new Date('2025-10-27T15:00:00'), endTime: new Date('2025-10-27T16:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/123456789', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[0].id, lessonId: lessons[1].id, startTime: new Date('2025-10-28T15:00:00'), endTime: new Date('2025-10-28T16:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/987654321', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, lessonId: lessons[6].id, startTime: new Date('2025-10-29T14:00:00'), endTime: new Date('2025-10-29T15:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/111222333', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, lessonId: lessons[7].id, startTime: new Date('2025-10-30T14:00:00'), endTime: new Date('2025-10-30T15:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/444555666', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[0].id, lessonId: lessons[2].id, startTime: new Date('2025-10-29T15:00:00'), endTime: new Date('2025-10-29T16:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/555666777', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[0].id, lessonId: lessons[3].id, startTime: new Date('2025-10-30T15:00:00'), endTime: new Date('2025-10-30T16:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/666777888', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, lessonId: lessons[8].id, startTime: new Date('2025-10-31T14:00:00'), endTime: new Date('2025-10-31T15:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/777888999', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, lessonId: lessons[9].id, startTime: new Date('2025-11-01T14:00:00'), endTime: new Date('2025-11-01T15:00:00'), mode: 'live', meetingLink: 'https://zoom.us/j/888999000', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!schedules || schedules.length < 8) throw new Error('Failed to create schedules');
if (!schedules[0] || !schedules[1] || !schedules[2] || !schedules[3] || !schedules[4] || !schedules[5] || !schedules[6] || !schedules[7]) throw new Error('Invalid schedule data');
// Creating announcements (1 per course)
const announcements = await Announcement.bulkCreate([
{ id: uuidv4(), courseId: courses[0].id, userId: users[3].id, title: '¡Bienvenidos a Matemáticas Básicas!', content: 'Empezamos con sumas y restas esta semana. ¡No falten a la clase en vivo!', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Home/logo-sancato.dev.png', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[1].id, userId: users[4].id, title: 'Clase de Seres Vivos', content: 'No olviden revisar el material antes de la clase en vivo.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[2].id, userId: users[5].id, title: 'Proyecto de la Tierra', content: 'Preparar un modelo del planeta para la próxima semana.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[3].id, userId: users[3].id, title: 'Bienvenidos a Matemáticas Avanzadas', content: 'Empezamos con fracciones.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[4].id, userId: users[6].id, title: 'Introducción a Historia', content: 'Revisar material de civilizaciones.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[5].id, userId: users[7].id, title: 'Gramática Básica', content: 'Completar ejercicios de gramática.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[6].id, userId: users[4].id, title: 'Mapas y Continentes', content: 'Preparar mapa del mundo.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[7].id, userId: users[5].id, title: 'Física y Química', content: 'Revisar conceptos básicos.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[8].id, userId: users[6].id, title: 'Dibujo y Pintura', content: 'Preparar materiales para clase.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[9].id, userId: users[7].id, title: 'Deportes y Ejercicios', content: 'Traer ropa deportiva.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[10].id, userId: users[3].id, title: 'Notas e Instrumentos', content: 'Practica notas musicales.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
{ id: uuidv4(), courseId: courses[11].id, userId: users[4].id, title: 'Hardware y Software', content: 'Revisar partes de la computadora.', imageUrl: 'https://media.sancato.dev/Multimedia/Imagenes/Landing/Courses/Curso%20de%20Matematicas.jpg', createdAt: new Date(), updatedAt: new Date() },
], { returning: true });
if (!announcements || announcements.length < 12) throw new Error('Failed to create announcements');
if (!announcements[0] || !announcements[1] || !announcements[2] || !announcements[3] || !announcements[4] || !announcements[5] || !announcements[6] || !announcements[7] ||
!announcements[8] || !announcements[9] || !announcements[10] || !announcements[11]) throw new Error('Invalid announcement data');
// Creating files (1 per the first 8 assignments and submissions)
const files = await File.bulkCreate([
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment1.pdf', fileName: 'assignment1.pdf', fileKey: 'key1', fileType: 'pdf', resourceId: assignments[0].id, resourceType: 'assignment' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission1.pdf', fileName: 'submission1.pdf', fileKey: 'key2', fileType: 'pdf', resourceId: submissions[0].id, resourceType: 'submission' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment2.pdf', fileName: 'assignment2.pdf', fileKey: 'key3', fileType: 'pdf', resourceId: assignments[1].id, resourceType: 'assignment' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission2.pdf', fileName: 'submission2.pdf', fileKey: 'key4', fileType: 'pdf', resourceId: submissions[1].id, resourceType: 'submission' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment3.pdf', fileName: 'assignment3.pdf', fileKey: 'key5', fileType: 'pdf', resourceId: assignments[6].id, resourceType: 'assignment' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission3.pdf', fileName: 'submission3.pdf', fileKey: 'key6', fileType: 'pdf', resourceId: submissions[2].id, resourceType: 'submission' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment4.pdf', fileName: 'assignment4.pdf', fileKey: 'key7', fileType: 'pdf', resourceId: assignments[7].id, resourceType: 'assignment' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission4.pdf', fileName: 'submission4.pdf', fileKey: 'key8', fileType: 'pdf', resourceId: submissions[3].id, resourceType: 'submission' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment5.pdf', fileName: 'assignment5.pdf', fileKey: 'key9', fileType: 'pdf', resourceId: assignments[2].id, resourceType: 'assignment' },
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission5.pdf', fileName: 'submission5.pdf', fileKey: 'key10', fileType: 'pdf', resourceId: submissions[4].id, resourceType: 'submission'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment6.pdf', fileName: 'assignment6.pdf', fileKey: 'key11', fileType: 'pdf', resourceId: assignments[3].id, resourceType: 'assignment'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission6.pdf', fileName: 'submission6.pdf', fileKey: 'key12', fileType: 'pdf', resourceId: submissions[5].id, resourceType: 'submission'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment7.pdf', fileName: 'assignment7.pdf', fileKey: 'key13', fileType: 'pdf', resourceId: assignments[8].id, resourceType: 'assignment'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission7.pdf', fileName: 'submission7.pdf', fileKey: 'key14', fileType: 'pdf', resourceId: submissions[6].id, resourceType: 'submission'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/assignment8.pdf', fileName: 'assignment8.pdf', fileKey: 'key15', fileType: 'pdf', resourceId: assignments[9].id, resourceType: 'assignment'},
{ id: uuidv4(), fileUrl: 'https://media.sancato.dev/files/submission8.pdf', fileName: 'submission8.pdf', fileKey: 'key16', fileType: 'pdf', resourceId: submissions[7].id, resourceType: 'submission'},
], { returning: true });
if (!files || files.length < 16) throw new Error('Failed to create files');
if (!files[0] || !files[1] || !files[2] || !files[3] || !files[4] || !files[5] || !files[6] || !files[7] ||
!files[8] || !files[9] || !files[10] || !files[11] || !files[12] || !files[13] || !files[14] || !files[15]) throw new Error('Invalid file data');
logger.info( 'Database seeded successfully' );
} catch ( err ) {
logger.error( 'Seeding failed', err );
throw err;
}
}
seed();