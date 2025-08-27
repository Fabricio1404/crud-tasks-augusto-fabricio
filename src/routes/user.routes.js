import { Router } from "express";
import {
  createUser, getUsers, getUserById, updateUser, deleteUser,
} from "../controllers/user.controller.js";
import {
  validateCreateUser, validateUpdateUser, validateUserIdParam,
} from "../middlewares/validatorsUser.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateUserIdParam, getUserById);
router.post("/", validateCreateUser, createUser);
router.put("/:id", validateUserIdParam, validateUpdateUser, updateUser);
router.delete("/:id", validateUserIdParam, deleteUser);

export default router;
