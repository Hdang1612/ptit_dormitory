import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
// import User from './User.js';

const Contract = sequelize.define(
  'Contract',
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
    apply_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'rejected', 'accepted'),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    confirm_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'contract',
    timestamps: false,
  },
);

export default Contract;
