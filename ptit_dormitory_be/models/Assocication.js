import Role from './Role.js';
import Permission from './Permission.js';
import RolePermission from './RolePermission.js';

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
});
