import { Router } from 'express';
import {
  createUser, getUsers, getUserById, updateUser, deleteUser,
} from '../controllers/user.controller.js';
import {
  validateCreateUser, validateUpdateUser, validateUserIdParam
} from '../middlewares/validatorsUser.js';

const router = Router();

router.post('/api/users', validateCreateUser, createUser);
router.get('/api/users', getUsers);
router.get('/api/users/:id', validateUserIdParam, getUserById);
router.put('/api/users/:id', validateUserIdParam, validateUpdateUser, updateUser);
router.delete('/api/users/:id', validateUserIdParam, deleteUser);

export default router;
