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
    if (exists) return res.status(400).json({ message: 'El email ya existe' });

    const user = await User.create({ name, email, password });
    return res.status(201).json({ message: 'Usuario creado', data: user });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Task, as: 'tasks', attributes: ['id', 'title', 'description', 'isComplete'] }],
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Task, as: 'tasks', attributes: ['id', 'title', 'description', 'isComplete'] }],
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const current = await User.findByPk(req.params.id);
    if (!current) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { name, email, password } = req.body;
    if (name && name.length > MAX) return res.status(400).json({ message: 'name excede 100 caracteres' });
    if (email && email.length > MAX) return res.status(400).json({ message: 'email excede 100 caracteres' });
    if (password && password.length > MAX) return res.status(400).json({ message: 'password excede 100 caracteres' });

    if (email && email !== current.email) {
      const taken = await User.findOne({ where: { email, id: { [Op.ne]: current.id } } });
      if (taken) return res.status(400).json({ message: 'El email ya existe' });
    }

    await current.update({ name, email, password });
    return res.status(200).json({ message: 'Usuario actualizado', data: current });
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
