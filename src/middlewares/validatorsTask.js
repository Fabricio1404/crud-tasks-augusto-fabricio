import { body, param, validationResult } from "express-validator";
import { User } from "../models/user.model";

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
    .isLength({ min: 2, max: 100 }).withMessage("title debe tener 2-100 caracteres."),
  body("description").optional().trim().isLength({ max: 300 })
    .withMessage("description no debe superar 300 caracteres."),
  body("userId").notEmpty().withMessage("userId es obligatorio.")
    .isInt({ min: 1 }).withMessage("userId debe ser un entero positivo.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) throw new Error("userId no existe.");
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
    .isLength({ min: 2, max: 100 }).withMessage("title debe tener 2-100 caracteres."),
  body("description").optional().trim().isLength({ max: 300 })
    .withMessage("description no debe superar 300 caracteres."),
  body("userId").optional().isInt({ min: 1 }).withMessage("userId debe ser entero positivo.")
    .custom(async (value) => {
      if (!value) return true;
      const user = await User.findByPk(value);
      if (!user) throw new Error("userId no existe.");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
