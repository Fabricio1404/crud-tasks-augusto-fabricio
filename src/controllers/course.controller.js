import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'El título es obligatorio' });

    const course = await Course.create({ title: title.trim(), description });
    return res.status(201).json({ message: 'Curso creado', data: course });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getCourses = async (_req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: User, as: 'users', attributes: ['id', 'name', 'email'], through: { attributes: [] } }],
      order: [['id', 'ASC']]
    });
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
