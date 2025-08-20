import { User } from './user.model.js';
import { Task } from './task.model.js';
import { Course } from './course.model.js';
import { UserCourse } from './userCourse.model.js';

// 1 a N
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// N a N
User.belongsToMany(Course, {
  through: UserCourse,
  as: 'courses',
  foreignKey: 'user_id'
});

Course.belongsToMany(User, {
  through: UserCourse,
  as: 'users',
  foreignKey: 'course_id'
});


UserCourse.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserCourse.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
