import { User } from './user.model.js';
import { Task } from './task.model.js';

// 1 Usuario -> N Tareas
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
// Cada Tarea pertenece a 1 Usuario
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { User, Task };
