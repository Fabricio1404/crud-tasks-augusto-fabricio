// src/controllers/course.controller.js
import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';

// Crear curso
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    // opcional: evitar duplicados por título
    const exists = await Course.findOne({ where: { title: title.trim() } });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe un curso con ese título' });
    }

    const course = await Course.create({
      title: title.trim(),
      description: typeof description === 'string' ? description : null
    });

    return res.status(201).json({ message: 'Curso creado', data: course });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Listar cursos (incluye usuarios si tenés la relación N:M configurada)
export const getCourses = async (_req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        { model: User, as: 'users', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
      ],
      order: [['id', 'ASC']]
    });
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Obtener curso por ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        { model: User, as: 'users', attributes: ['id', 'name', 'email'], through: { attributes: [] } }
      ]
    });
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Actualizar curso
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    const { title, description } = req.body;

    if (title !== undefined && !title?.trim()) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    await course.update({
      title: title?.trim() ?? course.title,
      description: typeof description === 'undefined' ? course.description : description
    });

    return res.status(200).json({ message: 'Curso actualizado', data: course });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Eliminar curso
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Curso no encontrado' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
