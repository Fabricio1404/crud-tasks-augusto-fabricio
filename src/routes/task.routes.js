import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskIdParam,
} from "../middlewares/validatorsTask.js";

const router = Router();

// Rutas CORTAS (prefijo /api/tasks se pone en app.js)
router.post("/", validateCreateTask, createTask);
router.get("/", getTasks);
router.get("/:id", validateTaskIdParam, getTaskById);
router.put("/:id", validateTaskIdParam, validateUpdateTask, updateTask);
router.delete("/:id", validateTaskIdParam, deleteTask);

export default router;
