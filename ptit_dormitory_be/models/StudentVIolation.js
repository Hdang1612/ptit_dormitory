import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const StudentViolation = sequelize.define(
  'StudentViolation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'student_violation',
    timestamps: false,
  },
);

export default StudentViolation;
