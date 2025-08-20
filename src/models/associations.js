import { User } from './user.model.js';
import { Task } from './task.model.js';
import { Role } from './role.model.js';
import { UserRole } from './userRole.model.js';

// 1:N Users-Tasks 
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// N:N Users-Roles 
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles'
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users'
});

export { User, Task, Role, UserRole };
