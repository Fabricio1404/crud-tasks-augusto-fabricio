import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { Op } from 'sequelize';

const MAX = 100;

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;
    const uid = Number(user_id);

    if (!title || !description) {
      return res.status(400).json({ message: 'title y description son requeridos' });
    }
    if (!Number.isInteger(uid) || uid <= 0) {
      return res.status(400).json({ message: 'user_id debe ser entero positivo' });
    }

    const created = await Task.create({ title, description, isComplete, user_id: uid });
    return res.status(201).json(created);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: err.errors.map(e => e.message),
      });
    }
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: 'Tarea no encontrada' });

    const { title, description, isComplete, user_id } = req.body;
    if (title && title.length > MAX) return res.status(400).json({ message: 'title máx 100' });
    if (description && description.length > MAX) return res.status(400).json({ message: 'description máx 100' });

    await row.update({ title, description, isComplete, user_id });
    return res.status(200).json(row);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: err.errors.map(e => e.message),
      });
    }
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const row = await Task.findByPk(req.params.id);
    if (!row || row.is_deleted) return res.status(404).json({ message: 'Tarea no encontrada' });

    await row.update({ is_deleted: true });
    return res.status(200).json({ message: 'Tarea eliminada lógicamente' });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { is_deleted: false },
      order: [['id', 'ASC']],
    });
    return res.status(200).json(tasks);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: err.errors.map(e => e.message),
      });
    }
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

