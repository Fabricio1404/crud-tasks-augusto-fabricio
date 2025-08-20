import { Router } from 'express';
import { createRole, getRoles } from '../controllers/course.controller.js';

const router = Router();

router.post('/api/roles', createRole);
router.get('/api/roles', getRoles);

export default router;
