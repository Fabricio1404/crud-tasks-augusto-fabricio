import { User } from "./user.model.js";
import { Task } from "./task.model.js";
import { Course } from "./course.model.js";
import { UserCourse } from "./userCourse.model.js";

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
