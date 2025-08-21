import { User } from '../models/user.model.js';
import { Course } from '../models/course.model.js';

export const addUserToCourse = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { courseId } = req.body;

    const u = await User.findByPk(userId);
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });

    const c = await Course.findByPk(Number(courseId));
    if (!c) return res.status(404).json({ message: 'Curso no encontrado' });

    await u.addCourse(c); // via belongsToMany
    const courses = await u.getCourses();
    return res.status(200).json({ message: 'Inscripción realizada', courses });
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getUserCourses = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const u = await User.findByPk(userId);
    if (!u) return res.status(404).json({ message: 'Usuario no encontrado' });
    const courses = await u.getCourses();
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};

export const getCourseUsers = async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);
    const c = await Course.findByPk(courseId);
    if (!c) return res.status(404).json({ message: 'Curso no encontrado' });
    const users = await c.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error en servidor', error: err.message });
  }
};
