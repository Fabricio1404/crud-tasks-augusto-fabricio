import { Router } from 'express';
import { assignUserToCourse, getUserCourses, removeUserFromCourse } from '../controllers/userCourse.controller.js';

const router = Router();

router.post('/user-courses', assignUserToCourse);
router.get('/user-courses', getUserCourses);
router.delete('/user-courses/:id', removeUserFromCourse);

export default router;
