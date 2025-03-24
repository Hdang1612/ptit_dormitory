import Place from './Place.js';
import RoomDetail from './RoomDetail.js';
import User from './Users.js';

// Thiết lập association cho self-referencing trong Place
Place.hasMany(Place, { as: 'SubPlace', foreignKey: 'parent_id' });
Place.belongsTo(Place, { as: 'ParentPlace', foreignKey: 'parent_id' });

// Thiết lập quan hệ 1:1 giữa Place và RoomDetail:
// Nếu Place.level === 'room', RoomDetail sẽ dùng cột id trùng với Place.id.
Place.hasOne(RoomDetail, { foreignKey: 'id', as: 'room_detail' });
RoomDetail.belongsTo(Place, { foreignKey: 'id', as: 'place' });

// Thiết lập quan hệ giữa RoomDetail và User cho trường leader
RoomDetail.belongsTo(User, { foreignKey: 'leader', as: 'leaderUser' });

// Export lại các model để sử dụng ở nơi khác
export { Place, RoomDetail, User };
