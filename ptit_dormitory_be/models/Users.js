import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Role from './Role.js';
import { ROLES } from '../constants/admin_role.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    qr_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    student_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    class_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cooperation_area: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    visa_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    passport_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    visa_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    visa_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
);
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
export default User;
