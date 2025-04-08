import Contract from '../models/Contract.js';
import User from '../models/Users.js';
import StudentRoom from '../models/StudentRoom.js';
import Place from '../models/Place.js';
import ContractType from '../models/contractType.js';
import ApiError from '../utils/apiError.js';
import { v4 as uuidv4 } from 'uuid';
import { createReport } from 'docx-templates';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Lấy danh sách hợp đồng
export const getContractsService = async (query) => {
  const { page = 1, limit = 10, status, student_id } = query;
  const offset = (page - 1) * limit;

  const whereClause = {};
  if (status) whereClause.status = status;
  if (student_id) whereClause.student_id = student_id;

  const { count, rows } = await Contract.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    include: [
      {
        model: ContractType,
        as: 'ContractType',
      },
      {
        model: User,
        as: 'student',
        attributes: ['id', 'first_name', 'last_name', 'student_code'],
      },
    ],
    order: [['apply_date', 'DESC']],
  });

  return {
    contracts: rows,
    pagination: {
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// Lấy chi tiết hợp đồng
export const getContractByIdService = async (contractId) => {
  const contract = await Contract.findByPk(contractId, {
    include: [
      {
        model: ContractType,
        as: 'ContractType',
      },
      {
        model: User,
        as: 'student',
        attributes: ['id', 'first_name', 'last_name', 'student_code'],
      },
    ],
  });

  if (!contract) {
    throw new ApiError(404, 'Hợp đồng không tồn tại');
  }

  return contract;
};

// // Tạo hợp đồng mới
// export const createContractService = async (contractData) => {
//   const { student_id, contract_type_id, apply_date, status } = contractData;

//   // Kiểm tra sinh viên tồn tại
//   const student = await User.findByPk(student_id);
//   if (!student) {
//     throw new ApiError(404, 'Sinh viên không tồn tại');
//   }

//   // Kiểm tra loại hợp đồng tồn tại
//   const contractType = await ContractType.findByPk(contract_type_id);
//   if (!contractType) {
//     throw new ApiError(404, 'Loại hợp đồng không tồn tại');
//   }

//   const newContract = await Contract.create({
//     id: uuidv4(),
//     student_id,
//     contract_type_id,
//     apply_date: apply_date || new Date(),
//     status: status || 'pending',
//   });

//   return newContract;
// };

// // Cập nhật hợp đồng
// export const updateContractService = async (contractId, updateData) => {
//   const contract = await Contract.findByPk(contractId);
//   if (!contract) {
//     throw new ApiError(404, 'Hợp đồng không tồn tại');
//   }

//   // Kiểm tra loại hợp đồng nếu cập nhật
//   if (updateData.contract_type_id) {
//     const contractType = await ContractType.findByPk(
//       updateData.contract_type_id,
//     );
//     if (!contractType) {
//       throw new ApiError(404, 'Loại hợp đồng không tồn tại');
//     }
//   }

//   await contract.update(updateData);
//   return contract;
// };

// // Xóa hợp đồng
// export const deleteContractService = async (contractId) => {
//   const contract = await Contract.findByPk(contractId);
//   if (!contract) {
//     throw new ApiError(404, 'Hợp đồng không tồn tại');
//   }

//   await contract.destroy();
//   return { message: 'Xóa hợp đồng thành công' };
// };

// Service điền thông tin hợp đồng
export const fillContractService = async (studentId) => {
  const student = await User.findByPk(studentId, {
    where: { role_id: 4 }, // Chỉ lấy sinh viên
    include: [
      {
        model: StudentRoom,
        as: 'StudentRoom',
        include: [
          {
            model: Place,
            as: 'Place',
            include: [
              {
                model: Place,
                as: 'ParentPlace',
                attributes: ['area_name', 'level'],
                include: [
                  {
                    model: Place,
                    as: 'ParentPlace',
                    attributes: ['area_name', 'level'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!student) {
    throw new ApiError(404, 'Sinh viên không tồn tại');
  }

  // Lấy hợp đồng gần nhất
  // const latestContract = await Contract.findOne({
  //   where: { student_id: studentId },
  //   include: [
  //     {
  //       model: ContractType,
  //       as: 'ContractType',
  //     },
  //     {
  //       model: User,
  //       as: 'confirmBy',
  //       attributes: ['id', 'first_name', 'last_name'],
  //     },
  //   ],
  //   order: [['apply_date', 'DESC']],
  // });

  return {
    full_name: ` ${student.first_name} ${student.last_name}`,
    student_code: student.student_code,
    dob: student.dob,
    gender: student.gender,
    email: student.email,
    phone_number: student.phone_number,
    class_code: student.class_code,
    cooperation_area: student.cooperation_area,
    nationality: student.nationality,
    religion: student.religion,
    identification_code: student.identification_code,
    stu_province: student.stu_province,
    stu_distict: student.stu_distict,
    stu_commune: student.stu_commune,
    room: student.StudentRoom?.Place?.area_name || '',
    floor: student.StudentRoom?.Place?.ParentPlace?.area_name || '',
    area: student.StudentRoom?.Place?.ParentPlace?.ParentPlace?.area_name || '',
    // latest_contract: latestContract
    //   ? {
    //       id: latestContract.id,
    //       type: latestContract.ContractType?.name,
    //       apply_date: latestContract.apply_date,
    //       status: latestContract.status,
    //       confirm_by: latestContract.confirmBy
    //         ? `${latestContract.confirmBy.last_name} ${latestContract.confirmBy.first_name}`
    //         : null,
    //     }
    //   : null,
  };
};

// Tạo file Word từ template
export const generateContractFile = async (contractId) => {
  try {
    // Lấy thông tin hợp đồng
    const contract = await Contract.findByPk(contractId, {
      include: [
        {
          model: User,
          as: 'student',
          attributes: [
            'first_name',
            'last_name',
            'student_code',
            'dob',
            'gender',
            'email',
            'phone_number',
            'class_code',
          ],
        },
        {
          model: ContractType,
          as: 'ContractType',
        },
      ],
    });

    if (!contract) {
      throw new ApiError(404, 'Hợp đồng không tồn tại');
    }

    // Đường dẫn đến template
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(
      __dirname,
      '../templates/contract_template.docx',
    );

    // Dữ liệu để điền vào template
    const data = {
      student_name: `${contract.student.last_name} ${contract.student.first_name}`,
      student_code: contract.student.student_code,
      dob: contract.student.dob,
      gender: contract.student.gender,
      email: contract.student.email,
      phone_number: contract.student.phone_number,
      class_code: contract.student.class_code,
      contract_type: contract.ContractType.name,
      apply_date: contract.apply_date,
      status: contract.status,
    };

    // Tạo file từ template
    const buffer = await createReport({
      template: templatePath,
      data,
    });

    // Tạo thư mục nếu chưa tồn tại
    const outputDir = path.join(__dirname, '../public/contracts');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Tạo tên file
    const fileName = `contract_${contractId}.docx`;
    const filePath = path.join(outputDir, fileName);

    // Lưu file
    fs.writeFileSync(filePath, buffer);

    // Cập nhật đường dẫn file trong database
    await contract.update({ file_path: `/contracts/${fileName}` });

    return {
      filePath,
      fileName,
    };
  } catch (error) {
    console.error('Error generating contract file:', error);
    throw new ApiError(500, 'Lỗi khi tạo file hợp đồng');
  }
};

// Tải file hợp đồng
export const downloadContractFile = async (contractId) => {
  try {
    const contract = await Contract.findByPk(contractId);

    if (!contract) {
      throw new ApiError(404, 'Hợp đồng không tồn tại');
    }

    if (!contract.file_path) {
      throw new ApiError(404, 'File hợp đồng không tồn tại');
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../public', contract.file_path);

    if (!fs.existsSync(filePath)) {
      throw new ApiError(404, 'File hợp đồng không tồn tại');
    }

    return {
      filePath,
      fileName: path.basename(contract.file_path),
    };
  } catch (error) {
    console.error('Error downloading contract file:', error);
    throw new ApiError(500, 'Lỗi khi tải file hợp đồng');
  }
};
