import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/api/users', createUser);
router.get('/api/users', getUsers);
router.get('/api/users/:id', getUserById);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

export default router;
