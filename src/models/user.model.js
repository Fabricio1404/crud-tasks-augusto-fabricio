import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Task } from "./task.model.js";

export const User = sequelize.define("User", {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(120), allowNull: false },
}, {
  tableName: "users",
  timestamps: true,
});

// Asociación (1:N)
User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
  onDelete: "CASCADE",
  hooks: true,
});
