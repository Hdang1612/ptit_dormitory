import { v4 as uuidv4 } from 'uuid';
import Role from '../models/Role.js';

import ApiError from '../utils/apiError.js';
export const getAllRoles = async () => {
  return await Role.findAll();
};

export const getRoleById = async (roleId) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new ApiError(404, 'Role not found');
  }
  return role;
};

export const createRole = async (roleData) => {
  const newRole = await Role.create({
    id: uuidv4(),
    role_name: roleData.role_name,
    description: roleData.description || '',
  });
  return newRole;
};

export const updateRole = async (roleId, roleData) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new ApiError(404, 'Role not found');
  }

  await role.update({
    role_name: roleData.role_name,
    description: roleData.description || role.description,
  });

  return role;
};

// export const deleteRole = async (roleId) => {
//   const role = await Role.findByPk(roleId);
//   if (!role) {
//     return null;
//   }

//   await role.destroy();
//   return roleId;
// };
