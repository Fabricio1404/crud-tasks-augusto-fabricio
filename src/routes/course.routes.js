import { Router } from 'express';
import { createCourse, getCourses } from '../controllers/course.controller.js';

const router = Router();

router.post('/courses', createCourse);
router.get('/courses', getCourses);

export default router;
