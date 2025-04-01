import Role from './Role.js';
import Permission from './Permission.js';
import RolePermission from './RolePermission.js';
import User from './Users.js';
import Place from './Place.js';
import StudentRoom from './StudentRoom.js';

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
