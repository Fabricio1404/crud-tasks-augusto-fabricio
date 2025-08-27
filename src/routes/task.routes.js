import { Router } from 'express';
import {
  createTask, getTasks, getTaskById, updateTask, deleteTask, getTasksByUser,
} from '../controllers/task.controller.js';
import {
  validateCreateTask, validateUpdateTask, validateTaskIdParam
} from '../middlewares/validatorsTask.js';

const router = Router();

router.post('/', validateCreateTask, createTask);
router.get('/', getTasks);
router.get('/:id', validateTaskIdParam, getTaskById);
router.put('/:id', validateTaskIdParam, validateUpdateTask, updateTask);
router.delete('/:id', validateTaskIdParam, deleteTask);


router.get('/users/:id/tasks', getTasksByUser);

export default router;
