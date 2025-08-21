import { UserCourse } from '../models/userCourse.model.js';
import { User } from '../models/user.model.js';
import { Course } from '../models/course.model.js';

// Asignar un usuario a un curso
export const assignUserToCourse = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({ message: 'user_id y course_id son requeridos' });
    }

    const relation = await UserCourse.create({ user_id, course_id });
    return res.status(201).json({ message: 'Usuario asignado al curso', data: relation });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Listar todas las asignaciones
export const getUserCourses = async (_req, res) => {
  try {
    const relations = await UserCourse.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Course, as: 'course', attributes: ['id', 'title'] }
      ]
    });
    return res.status(200).json(relations);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

// Eliminar una asignación
export const removeUserFromCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserCourse.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'Asignación no encontrada' });
    return res.status(200).json({ message: 'Asignación eliminada' });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
