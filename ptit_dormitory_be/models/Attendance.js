import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Attendance = sequelize.define(
  'Attendance',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    shift_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'attendance',
    timestamps: false,
  },
);
export default Attendance;
