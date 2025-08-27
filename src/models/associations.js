<<<<<<< HEAD

import { User } from './user.model.js';
import { Task } from './task.model.js';
import { Course } from './course.model.js';
<<<<<<< HEAD
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
=======
import { UserCourse } from './userCourse.model.js';
=======
import { User } from "./user.model.js";
import { Task } from "./task.model.js";
import { Course } from "./course.model.js";
import { UserCourse } from "./userCourse.model.js";
>>>>>>> develop

/** 1:N - User -> Task (con CASCADE) */
User.hasMany(Task, {
  foreignKey: "user_id",
  as: "tasks",
  onDelete: "CASCADE",
  hooks: true, // necesario para que Sequelize aplique el cascade
});
Task.belongsTo(User, { foreignKey: "user_id", as: "user" });

/** 1:N - Course -> Task (no choca porque es otro modelo) */
Course.hasMany(Task, { foreignKey: "course_id", as: "tasks" });
Task.belongsTo(Course, { foreignKey: "course_id", as: "course" });

/** N:M - User <-> Course (tabla intermedia UserCourse) */
User.belongsToMany(Course, {
  through: UserCourse,
  as: "courses",
  foreignKey: "user_id",
  otherKey: "course_id",
});
Course.belongsToMany(User, {
  through: UserCourse,
  as: "users",
  foreignKey: "course_id",
  otherKey: "user_id",
});

/** Para poder hacer include directo desde la intermedia */
UserCourse.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserCourse.belongsTo(Course, { foreignKey: "course_id", as: "course" });

export { User, Task, Course, UserCourse };
>>>>>>> develop
