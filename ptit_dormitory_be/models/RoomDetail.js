import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const RoomDetail = sequelize.define(
  'RoomDetail',
  {
    id: {
      // Sử dụng chính cột id để liên kết 1:1 với Place (chỉ áp dụng khi Place.level === 'room')
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    room_detailcol: {
      // Đã thay đổi kiểu dữ liệu thành TEXT
      type: DataTypes.TEXT,
      allowNull: true,
    },
    room_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('notfull', 'full', 'available'),
      allowNull: true,
      defaultValue: null,
    },
    leader: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('X', 'Y'),
      allowNull: true,
    },
  },
  {
    tableName: 'room_detail', // Sử dụng tên bảng chính xác
    timestamps: false,
  },
);

export default RoomDetail;
