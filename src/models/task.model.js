import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Task = sequelize.define(
  "Task",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // ← soft delete
    user_id: { type: DataTypes.INTEGER, allowNull: false },   // FK -> users.id
    course_id: { type: DataTypes.INTEGER, allowNull: true },  // FK -> courses.id (opcional)
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);


