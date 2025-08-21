import { Router } from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller.js';

const router = Router();

router.post('/api/courses',     createCourse);
router.get('/api/courses',      getCourses);
router.get('/api/courses/:id',  getCourseById);
router.put('/api/courses/:id',  updateCourse);
router.delete('/api/courses/:id', deleteCourse);

export default router;
