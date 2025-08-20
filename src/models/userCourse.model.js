import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserCourse = sequelize.define('UserCourse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'user_courses',
  timestamps: true
});
