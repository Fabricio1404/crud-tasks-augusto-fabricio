import { Router } from 'express';
import {
  addUserToCourse,
  getUserCourses,
  getCourseUsers
} from '../controllers/usercourse.controller.js';

const router = Router();

// Inscribir usuario a un curso
router.post('/api/users/:userId/courses', addUserToCourse);

// Cursos de un usuario
router.get('/api/users/:userId/courses', getUserCourses);

// Usuarios de un curso
router.get('/api/courses/:courseId/users', getCourseUsers);

export default router;
