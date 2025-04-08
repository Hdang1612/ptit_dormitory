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
      allowNull: null,
    },
    apply_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('đã gửi', 'xác nhận', 'từ chối'),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    confirm_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    form_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'contract',
    timestamps: false,
  },
);

export default Contract;
