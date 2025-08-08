import { User } from '../models/user.js';
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
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (name && name.length > MAX) return res.status(400).json({ message: 'name excede 100 caracteres' });
    if (email && email.length > MAX) return res.status(400).json({ message: 'email excede 100 caracteres' });
    if (password && password.length > MAX) return res.status(400).json({ message: 'password excede 100 caracteres' });

    if (email && email !== user.email) {
      const emailTaken = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
      if (emailTaken) return res.status(400).json({ message: 'El email ya existe' });
    }

    await user.update({ name, email, password });
    return res.status(200).json({ message: 'Usuario actualizado', data: user });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
