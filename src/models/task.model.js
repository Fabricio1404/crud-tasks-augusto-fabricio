import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Task = sequelize.define(
  'Task',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { name: 'unique_title', msg: 'El título ya existe' },
      validate: {
        notEmpty: { msg: 'El título es requerido' },
        len: { args: [1, 100], msg: 'El título debe tener hasta 100 caracteres' }
      }
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción es requerida' },
        len: { args: [1, 100], msg: 'La descripción debe tener hasta 100 caracteres' }
      }
    },
    isComplete: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // <--- nuevo
    user_id:    { type: DataTypes.INTEGER, allowNull: false }, // FK -> users.id
    course_id:  { type: DataTypes.INTEGER, allowNull: true }   // (opcional) FK -> courses.id
  },
  { tableName: 'tasks', timestamps: false }
);
