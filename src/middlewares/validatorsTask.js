import { body, param, validationResult } from "express-validator";
import { User } from "../models/user.model.js";

export const validateTaskIdParam = [
  param("id").trim().isInt({ min: 1 }).withMessage("El id debe ser un entero positivo."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const validateCreateTask = [
  body("title").trim().notEmpty().withMessage("title es obligatorio.")
    .isLength({ min: 1, max: 100 }).withMessage("title debe tener hasta 100 caracteres."),
  body("description").trim().notEmpty().withMessage("description es obligatorio.")
    .isLength({ min: 1, max: 100 }).withMessage("description debe tener hasta 100 caracteres."),
  body("user_id").notEmpty().withMessage("user_id es obligatorio.")
    .isInt({ min: 1 }).withMessage("user_id debe ser un entero positivo.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("user_id no existe.");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const validateUpdateTask = [
  body("title").optional().trim()
    .isLength({ min: 1, max: 100 }).withMessage("title debe tener hasta 100 caracteres."),
  body("description").optional().trim()
    .isLength({ min: 1, max: 100 }).withMessage("description debe tener hasta 100 caracteres."),
  body("user_id").optional().isInt({ min: 1 }).withMessage("user_id debe ser entero positivo."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
