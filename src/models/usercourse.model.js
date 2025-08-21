import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserCourse = sequelize.define('UserCourse', {
  id:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id:   { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'usercourses',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['user_id', 'course_id'], name: 'uniq_user_course' }
  ]
});
