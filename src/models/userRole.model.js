import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  role_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'user_roles',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['user_id', 'role_id'], name: 'user_role_unique' }
  ]
});
