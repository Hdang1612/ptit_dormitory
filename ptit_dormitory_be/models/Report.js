import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Report = sequelize.define(
  'Report',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    create_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    checkin_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shift_schedule_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'reports',
    timestamps: false,
  },
);
export default Report;
