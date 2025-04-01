import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const StudentRoom = sequelize.define(
  'StudentRoom',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    room_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apply_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'student_room',
    timestamps: false,
  },
);

export default StudentRoom;
