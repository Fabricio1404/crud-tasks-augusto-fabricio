import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

// CREAR
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;
    const uid = Number(user_id);

    if (!title || !description) {
      return res.status(400).json({ message: "title y description son requeridos" });
    }
    if (!Number.isInteger(uid) || uid <= 0) {
      return res.status(400).json({ message: "user_id debe ser entero positivo" });
    }

    const created = await Task.create({ title, description, isComplete, user_id: uid });
    return res.status(201).json(created);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: err.errors.map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};

// LISTAR TODAS (solo activas)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { is_deleted: false },
      order: [["id", "ASC"]],
    });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};

// OBTENER POR ID (no mostrar soft-deleted)
export const getTaskById = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};

// ACTUALIZAR
export const updateTask = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: "Tarea no encontrada" });

    const { title, description, isComplete, user_id } = req.body;
    await row.update({ title, description, isComplete, user_id });
    return res.status(200).json(row);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: err.errors.map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};

// ELIMINAR (soft delete)
export const deleteTask = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: "Tarea no encontrada" });

    await row.update({ is_deleted: true });
    return res.status(200).json({ message: "Tarea eliminada lógicamente" });
  } catch (err) {
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};

// NUEVO: LISTAR TAREAS POR USUARIO (ruta anidada /api/users/:id/tasks)
export const getTasksByUser = async (req, res) => {
  try {
    const uid = Number(req.params.id);
    if (!Number.isInteger(uid) || uid <= 0) {
      return res.status(400).json({ message: "id inválido (entero positivo)" });
    }

    const user = await User.findByPk(uid);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const tasks = await Task.findAll({
      where: { user_id: uid, is_deleted: false },
      order: [["id", "ASC"]],
    });

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Error en servidor", error: err.message });
  }
};
