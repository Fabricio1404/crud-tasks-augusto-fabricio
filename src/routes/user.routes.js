import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  validateCreateUser,
  validateUpdateUser,
  validateUserIdParam,
} from "../middlewares/validatorsUser.js";
import { getTasksByUser } from "../controllers/task.controller.js";

const router = Router();

// Rutas CORTAS (prefijo /api/users se pone en app.js)
router.post("/", validateCreateUser, createUser);
router.get("/", getUsers);
router.get("/:id", validateUserIdParam, getUserById);
router.put("/:id", validateUserIdParam, validateUpdateUser, updateUser);
router.delete("/:id", validateUserIdParam, deleteUser);

// Ruta anidada limpia: /api/users/:id/tasks
router.get("/:id/tasks", validateUserIdParam, getTasksByUser);

export default router;
