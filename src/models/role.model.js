import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: { name: 'unique_role_name', msg: 'El nombre de rol ya existe' },
    validate: {
      notEmpty: { msg: 'El nombre de rol es requerido' },
      len: { args: [1, 50], msg: 'El rol debe tener hasta 50 caracteres' }
    }
  }
}, {
  tableName: 'roles',
  timestamps: false,
});
