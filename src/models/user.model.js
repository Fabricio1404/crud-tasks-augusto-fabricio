import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es requerido' },
        len: { args: [1, 100], msg: 'El nombre debe tener hasta 100 caracteres' },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { name: 'unique_email', msg: 'El email ya existe' },
      validate: {
        notEmpty: { msg: 'El email es requerido' },
        len: { args: [1, 100], msg: 'El email debe tener hasta 100 caracteres' },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La contraseña es requerida' },
        len: { args: [1, 100], msg: 'La contraseña debe tener hasta 100 caracteres' },
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);
