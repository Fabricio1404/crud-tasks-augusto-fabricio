import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Course = sequelize.define(
  'Course',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { name: 'unique_course_name', msg: 'El nombre del curso ya existe' },
      validate: {
        notEmpty: { msg: 'El nombre es requerido' },
        len: { args: [1, 100], msg: 'El nombre debe tener hasta 100 caracteres' },
      },
    },
    description: {
      type: DataTypes.STRING(255), 
      allowNull: true,
      validate: {
        len: { args: [0, 255], msg: 'La descripción puede tener hasta 255 caracteres' },
      },
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: 'courses',
    timestamps: false, // 
  }
);
