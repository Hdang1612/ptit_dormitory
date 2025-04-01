import * as roleService from '../services/roleService.js';

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);

    // if (!role) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: 'Không tìm thấy vai trò' });
    // }

    res.status(200).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  try {
    const newRole = await roleService.createRole(req.body);
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRole = await roleService.updateRole(id, req.body);

    // if (!updatedRole) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: 'Không tìm thấy vai trò' });
    // }

    res.status(200).json({ success: true, data: updatedRole });
  } catch (error) {
    next(error);
  }
};

// export const deleteRole = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedRoleId = await roleService.deleteRole(id);

//     if (!deletedRoleId) {
//       return res.status(404).json({ success: false, message: 'Không tìm thấy vai trò' });
//     }

//     res.status(200).json({ success: true, message: 'Xóa vai trò thành công' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Lỗi khi xóa vai trò', error });
//   }
// };
