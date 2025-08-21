import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: { name: 'unique_course_name', msg: 'El nombre del curso ya existe' },
    validate: {
      notEmpty: { msg: 'El nombre es requerido' },
      len: { args: [1, 100], msg: 'name hasta 100 caracteres' }
    }
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
    validate: { len: { args: [0, 200], msg: 'description hasta 200 caracteres' } }
  },
  start_date: { type: DataTypes.DATEONLY, allowNull: true },
  end_date:   { type: DataTypes.DATEONLY, allowNull: true }
}, {
  tableName: 'courses',
  timestamps: false
});
