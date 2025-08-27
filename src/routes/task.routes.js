import { Router } from "express";
import {
  getTasks, getTaskById, createTask, updateTask, deleteTask,
} from "../controllers/task.controller.js";
import {
  validateCreateTask, validateUpdateTask, validateTaskIdParam,
} from "../middlewares/validatorsTask.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", validateTaskIdParam, getTaskById);
router.post("/", validateCreateTask, createTask);
router.put("/:id", validateTaskIdParam, validateUpdateTask, updateTask);
router.delete("/:id", validateTaskIdParam, deleteTask);

export default router;
