import { User } from '../models/user.model.js';
import { Task } from '../models/task.model.js';
import { Op } from 'sequelize';

const MAX = 100;

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email y password son requeridos' });
    }
    if (name.length > MAX || email.length > MAX || password.length > MAX) {
      return res.status(400).json({ message: 'Campos de máximo 100 caracteres' });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'email ya registrado' });

    const created = await User.create({ name, email, password });
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const row = await User.findByPk(req.params.id, { include: [{ model: Task, as: 'tasks' }] });
    if (!row) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const row = await User.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { name, email, password } = req.body;
    if (name && name.length > MAX) return res.status(400).json({ message: 'name máx 100' });
    if (email && email.length > MAX) return res.status(400).json({ message: 'email máx 100' });
    if (password && password.length > MAX) return res.status(400).json({ message: 'password máx 100' });

    if (email) {
      const other = await User.findOne({ where: { email, id: { [Op.ne]: row.id } } });
      if (other) return res.status(400).json({ message: 'email ya registrado por otro usuario' });
    }

    await row.update({ name, email, password });
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
