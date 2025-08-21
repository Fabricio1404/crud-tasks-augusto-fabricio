import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,   
} from '../controllers/task.controller.js';

const router = Router();

router.post('/api/tasks', createTask);
router.get('/api/tasks', getTasks);
router.get('/api/tasks/:id', getTaskById);
router.put('/api/tasks/:id', updateTask);
router.delete('/api/tasks/:id', deleteTask);

//listar tareas de un usuario
router.get('/api/users/:id/tasks', getTasksByUser);

export default router;
