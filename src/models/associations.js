
import { User } from './user.model.js';
import { Task } from './task.model.js';
import { Course } from './course.model.js';
import { UserCourse } from './usercourse.model.js';

// User ↔ Task (1:N)
User.hasMany(Task,  { foreignKey: 'user_id',  as: 'tasks' });
Task.belongsTo(User,{ foreignKey: 'user_id',  as: 'user'  });

// Course ↔ Task (1:N) (opcional, habilitado porque agregamos course_id en Task)
Course.hasMany(Task, { foreignKey: 'course_id', as: 'tasks'  });
Task.belongsTo(Course,{ foreignKey: 'course_id', as: 'course' });

// User ↔ Course (N:M) via UserCourse
User.belongsToMany(Course, { through: UserCourse, foreignKey: 'user_id',   otherKey: 'course_id', as: 'courses' });
Course.belongsToMany(User, { through: UserCourse, foreignKey: 'course_id', otherKey: 'user_id',   as: 'users' });
