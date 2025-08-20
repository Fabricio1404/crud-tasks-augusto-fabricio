import { Task } from '../models/task.model.js';
import { User } from '../models/course.model.js';
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
      return res.status(400).json({ message: 'user_id es requerido y debe ser entero válido' });
    }
    if (title.length > MAX || description.length > MAX) {
      return res.status(400).json({ message: 'Campos de máximo 100 caracteres' });
    }
    if (typeof isComplete !== 'undefined' && typeof isComplete !== 'boolean') {
      return res.status(400).json({ message: 'isComplete debe ser booleano' });
    }

    const existsUser = await User.findByPk(uid);
    if (!existsUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    const exists = await Task.findOne({ where: { title } });
    if (exists) return res.status(400).json({ message: 'El título ya existe' });

    const task = await Task.create({
      title,
      description,
      isComplete: !!isComplete,
      user_id: uid,
    });

    return res.status(201).json({ message: 'Tarea creada', data: task });
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

export const getTasks = async (req, res) => {
  try {
    const {
      isComplete, user_id, q, page = 1, limit = 10, sort = 'id:asc'
    } = req.query;

    const where = {};

    if (typeof isComplete !== 'undefined') {
      if (isComplete !== 'true' && isComplete !== 'false') {
        return res.status(400).json({ message: 'isComplete debe ser "true" o "false"' });
      }
      where.isComplete = isComplete === 'true';
    }

    if (user_id) {
      const uid = Number(user_id);
      if (!Number.isInteger(uid) || uid <= 0) {
        return res.status(400).json({ message: 'user_id debe ser un entero válido' });
      }
      where.user_id = uid;
    }

    if (q && q.trim()) {
      where[Op.or] = [
        { title: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
      ];
    }

    const p = Math.max(1, Number(page));
    const l = Math.max(1, Math.min(100, Number(limit)));
    const offset = (p - 1) * l;

    let order = [['id', 'ASC']];
    if (sort) {
      const [field, dirRaw] = String(sort).split(':');
      const dir = (dirRaw || 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      if (['id', 'createdAt', 'updatedAt', 'title'].includes(field)) {
        order = [[field, dir]];
      }
    }

    const { rows, count } = await Task.findAndCountAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      order,
      limit: l,
      offset,
    });

    return res.status(200).json({
      data: rows,
      pagination: {
        total: count,
        page: p,
        limit: l,
        pages: Math.ceil(count / l),
      },
    });
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
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json(task);
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
      const uid = Number(user_id);
      if (!Number.isInteger(uid) || uid <= 0) {
        return res.status(400).json({ message: 'user_id debe ser un entero válido' });
      }
      const existsUser = await User.findByPk(uid);
      if (!existsUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (title && title !== task.title) {
      const titleTaken = await Task.findOne({ where: { title, id: { [Op.ne]: id } } });
      if (titleTaken) return res.status(400).json({ message: 'El título ya existe' });
    }

    await task.update({ title, description, isComplete, user_id });
    return res.status(200).json({ message: 'Tarea actualizada', data: task });
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
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json({ message: 'Tarea eliminada' });
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

// NUEVO: tareas por usuario
export const getTasksByUser = async (req, res) => {
  try {
    const uid = Number(req.params.id);
    if (!Number.isInteger(uid) || uid <= 0) {
      return res.status(400).json({ message: 'id de usuario inválido' });
    }

    const tasks = await Task.findAll({
      where: { user_id: uid },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
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
