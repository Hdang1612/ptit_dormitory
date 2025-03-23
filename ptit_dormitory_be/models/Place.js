import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const Place = sequelize.define(
  'Place',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    area_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'place',
        key: 'id',
      },
    },
    level: {
      type: DataTypes.ENUM('room', 'floor', 'area'),
      allowNull: false,
    },
  },
  {
    tableName: 'place',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
);

export default Place;
