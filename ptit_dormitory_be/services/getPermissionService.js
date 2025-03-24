import Role from '../models/Role.js';
import Permission from '../models/Permission.js';

export const getPermissionService = async (role_id) => {
  const role = await Role.findByPk(role_id, {
    include: {
      model: Permission,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  if (!role) return [];

  return role.Permissions.map((p) => p.name);
};
