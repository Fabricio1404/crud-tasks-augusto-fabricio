import { Course } from '../models/course.model.js';
import { Task } from '../models/task.model.js';

export const createCourse = async (req, res) => {
  try {
    const { name, description, start_date, end_date } = req.body;
    if (!name) return res.status(400).json({ message: 'name es requerido' });
    const created = await Course.create({ name, description, start_date, end_date });
    return res.status(201).json(created);
  } catch (err) {
    if (err.name?.includes('Sequelize')) {
      return res.status(400).json({ message: 'Error de validación', errors: err.errors?.map(e => e.message) });
    }
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getCourses = async (_req, res) => {
  const all = await Course.findAll({ order: [['id','ASC']] });
  return res.status(200).json(all);
};

export const getCourseById = async (req, res) => {
  const c = await Course.findByPk(req.params.id, { include: [{ model: Task, as: 'tasks' }] });
  if (!c) return res.status(404).json({ message: 'Curso no encontrado' });
  return res.status(200).json(c);
};

export const updateCourse = async (req, res) => {
  try {
    const c = await Course.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Curso no encontrado' });
    await c.update(req.body);
    return res.status(200).json({ message: 'Curso actualizado', data: c });
  } catch (err) {
    if (err.name?.includes('Sequelize')) {
      return res.status(400).json({ message: 'Error de validación', error: err.message });
    }
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  const deleted = await Course.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ message: 'Curso no encontrado' });
  return res.status(204).send();
};
