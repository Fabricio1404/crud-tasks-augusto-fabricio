import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { Op } from 'sequelize';

const MAX = 100;

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;

    if (!title || !description) return res.status(400).json({ message: 'title y description son requeridos' });
    if (!user_id) return res.status(400).json({ message: 'user_id es requerido' });
    if (title.length > MAX || description.length > MAX) return res.status(400).json({ message: 'Campos de máximo 100 caracteres' });
    if (typeof isComplete !== 'undefined' && typeof isComplete !== 'boolean') return res.status(400).json({ message: 'isComplete debe ser booleano' });

    const existsUser = await User.findByPk(user_id);
    if (!existsUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    const exists = await Task.findOne({ where: { title } });
    if (exists) return res.status(400).json({ message: 'El título ya existe' });

    const task = await Task.create({ title, description, isComplete: !!isComplete, user_id });
    return res.status(201).json({ message: 'Tarea creada', data: task });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getTasks = async (_req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete, user_id } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (title && title.length > MAX) return res.status(400).json({ message: 'title excede 100 caracteres' });
    if (description && description.length > MAX) return res.status(400).json({ message: 'description excede 100 caracteres' });
    if (typeof isComplete !== 'undefined' && typeof isComplete !== 'boolean') return res.status(400).json({ message: 'isComplete debe ser booleano' });

    if (user_id) {
      const existsUser = await User.findByPk(user_id);
      if (!existsUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (title && title !== task.title) {
      const titleTaken = await Task.findOne({ where: { title, id: { [Op.ne]: id } } });
      if (titleTaken) return res.status(400).json({ message: 'El título ya existe' });
    }

    await task.update({ title, description, isComplete, user_id });
    return res.status(200).json({ message: 'Tarea actualizada', data: task });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
