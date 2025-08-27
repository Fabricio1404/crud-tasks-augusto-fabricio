import { body, param, validationResult } from "express-validator";
import { User } from "../models/user.model";

export const validateUserIdParam = [
  param("id").trim().isInt({ min: 1 }).withMessage("El id debe ser un entero positivo."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const validateCreateUser = [
  body("name").trim().notEmpty().withMessage("name es obligatorio.")
    .isLength({ min: 2, max: 60 }).withMessage("name debe tener 2-60 caracteres."),
  body("email").trim().notEmpty().withMessage("email es obligatorio.")
    .isEmail().withMessage("email no tiene formato válido.")
    .custom(async (value) => {
      const exists = await User.findOne({ where: { email: value } });
      if (exists) throw new Error("email ya está registrado.");
      return true;
    }),
  body("password").notEmpty().withMessage("password es obligatorio.")
    .isLength({ min: 6 }).withMessage("password debe tener al menos 6 caracteres."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const validateUpdateUser = [
  body("name").optional().trim()
    .isLength({ min: 2, max: 60 }).withMessage("name debe tener 2-60 caracteres."),
  body("email").optional().trim().isEmail().withMessage("email no tiene formato válido.")
    .custom(async (value, { req }) => {
      const other = await User.findOne({ where: { email: value } });
      if (other && String(other.id) !== String(req.params.id)) {
        throw new Error("email ya está registrado por otro usuario.");
      }
      return true;
    }),
  body("password").optional().isLength({ min: 6 })
    .withMessage("password debe tener al menos 6 caracteres."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
