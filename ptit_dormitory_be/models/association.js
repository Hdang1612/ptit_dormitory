import Role from './Role.js';
import Permission from './Permission.js';
import RolePermission from './RolePermission.js';
import User from './Users.js';
import Place from './Place.js';
import RoomDetail from './RoomDetail.js';
import StudentRoom from './StudentRoom.js';
import Attendance from './Attendance.js';
import ShiftSchedule from './ShiftSchedule.js';
import Report from './Report.js';

// Thiết lập quan hệ Role - Permission (N-N)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
});

// Thiết lập association cho self-referencing trong Place (kết nối cha-con giữa các địa điểm)
Place.hasMany(Place, { as: 'SubPlace', foreignKey: 'parent_id' });
Place.belongsTo(Place, { as: 'ParentPlace', foreignKey: 'parent_id' });

// Thiết lập quan hệ 1:1 giữa Place và RoomDetail (nếu Place.level === 'room')
Place.hasOne(RoomDetail, { foreignKey: 'id', as: 'room_detail' });
RoomDetail.belongsTo(Place, { foreignKey: 'id', as: 'place' });

// Thiết lập quan hệ giữa RoomDetail và User (trưởng phòng - leader)
RoomDetail.belongsTo(User, { foreignKey: 'leader', as: 'leaderUser' });

// Quan hệ giữa User và StudentRoom (1-1: Mỗi user chỉ thuộc một phòng)
User.hasOne(StudentRoom, { foreignKey: 'student_id' });
StudentRoom.belongsTo(User, { foreignKey: 'student_id', as: 'student' });

// Quan hệ giữa Place (phòng) và StudentRoom (1-N: Một phòng có nhiều sinh viên)
Place.hasMany(StudentRoom, { foreignKey: 'room_id', as: 'StudentRoom' });
StudentRoom.belongsTo(Place, {
  foreignKey: 'room_id',
  targetKey: 'id',
  as: 'place',
});

// ======== Thêm các quan hệ mới: Attendance - Report - ShiftSchedule ======== //

// Attendance thuộc về sinh viên (User)
Attendance.belongsTo(User, { foreignKey: 'student_id', as: 'student' });
User.hasMany(Attendance, { foreignKey: 'student_id', as: 'attendances' });

// Attendance thuộc về ca trực
Attendance.belongsTo(ShiftSchedule, { foreignKey: 'shift_id', as: 'shift' });
ShiftSchedule.hasMany(Attendance, {
  foreignKey: 'shift_id',
  as: 'attendances',
});

// ShiftSchedule có thể có nhiều báo cáo
ShiftSchedule.hasMany(Report, {
  foreignKey: 'shift_schedule_id',
  as: 'reports',
});
Report.belongsTo(ShiftSchedule, {
  foreignKey: 'shift_schedule_id',
  as: 'shifts',
});

// Report được tạo bởi 1 user
Report.belongsTo(User, { foreignKey: 'create_by', as: 'creator' });
User.hasMany(Report, { foreignKey: 'create_by', as: 'reports' });

// ShiftSchedule thuộc về User (người trực)
ShiftSchedule.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(ShiftSchedule, { foreignKey: 'user_id', as: 'shifts' });

// ShiftSchedule thuộc về Place
ShiftSchedule.belongsTo(Place, { foreignKey: 'place_id', as: 'place' });
Place.hasMany(ShiftSchedule, { foreignKey: 'place_id', as: 'shifts' });

// ======== END các quan hệ mới ======== //

// Xuất tất cả các models
export {
  Role,
  Permission,
  RolePermission,
  User,
  Place,
  RoomDetail,
  StudentRoom,
  Attendance,
  ShiftSchedule,
  Report,
};
