import Role from './Role.js';
import Permission from './Permission.js';
import RolePermission from './RolePermission.js';
import User from './Users.js';
import Place from './Place.js';
import StudentRoom from './StudentRoom.js';
import Contract from './Contract.js';
import ContractType from './contractType.js';

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
});

// Mỗi user chỉ thuộc 1 phòng (1-1)
User.hasOne(StudentRoom, { foreignKey: 'student_id' });
StudentRoom.belongsTo(User, { foreignKey: 'student_id' });

// Một phòng có nhiều user (1-N)
Place.hasMany(StudentRoom, { foreignKey: 'room_id' });
StudentRoom.belongsTo(Place, { foreignKey: 'room_id' });

// Quan hệ Contract và ContractType
ContractType.hasMany(Contract, {
  foreignKey: 'type',
  as: 'contracts',
});
Contract.belongsTo(ContractType, {
  foreignKey: 'type',
  as: 'ContractType',
});

// Quan hệ Contract và User (sinh viên)
User.hasMany(Contract, {
  foreignKey: 'student_id',
  as: 'contracts',
});
Contract.belongsTo(User, {
  foreignKey: 'student_id',
  as: 'student',
});

// Quan hệ Contract và User (người xác nhận)
User.hasMany(Contract, {
  foreignKey: 'confirm_by',
  as: 'confirmedContracts',
});
Contract.belongsTo(User, {
  foreignKey: 'confirm_by',
  as: 'confirmBy',
});
