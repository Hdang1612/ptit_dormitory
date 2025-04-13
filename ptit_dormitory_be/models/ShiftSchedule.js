import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ShiftSchedule = sequelize.define(
  'ShiftSchedule',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shift_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    place_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shift_start: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    shift_end: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'shift_schedule',
    timestamps: false,
  },
);
export default ShiftSchedule;
