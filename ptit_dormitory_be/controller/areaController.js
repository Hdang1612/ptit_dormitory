import {
  getPlacesService,
  getPlaceDetailService,
  createPlaceService,
  updatePlaceService,
} from '../services/areaServices.js';

const getPlaces = async (req, res) => {
  try {
    const result = await getPlacesService(req.query);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error in getPlaces controller: ', error);
    res.status(error.status || 500).json({ error: error.message || error });
  }
};
const getPlaceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await getPlaceDetailService(id);
    if (!detail) {
      return res.status(404).json({ error: 'Place not found' });
    }
    return res.status(200).json(detail);
  } catch (error) {
    console.log('Error in getPlaceDetail controller: ', error);
    res.status(error.status || 500).json({ error: error.message || error });
  }
};
const createPlaces = async (req, res) => {
  try {
    const result = await createPlaceService(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error in create Place: ', error);
    res.status(error.status || 500).json({ error: error.message || error });
  }
};
const updatePlaces = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updatePlaceService(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log('Error in update Place: ', error);
    res.status(error.status || 500).json({ error: error.message || error });
  }
};

const areaController = {
  getPlaces,
  createPlaces,
  updatePlaces,
  getPlaceDetail,
  // getAreas,
  // getFloorsByArea,
  // getRoomsByFloor,
  // getRoomsByArea,
  // getAndFindRooms,
  // addNewArea,
  // updateArea,
  // addNewFloor,
  // updateFloor,
  // addNewRoom,
  // updateRoom,
};
export default areaController;

// const getAreas = async (req, res) => {
//   try {
//     const query = `
//     SELECT
//       p.id,
//       p.area_name,
//       (
//         SELECT COUNT(*)
//         FROM place f
//         WHERE f.parent_id = p.id AND f.level = 'floor'
//       ) AS total_floors,
//       (
//         SELECT COUNT(*)
//         FROM place r
//         JOIN place f ON r.parent_id = f.id
//         WHERE f.parent_id = p.id AND r.level = 'room'
//       ) AS total_rooms
//     FROM place p
//     WHERE p.parent_id IS NULL AND p.level = 'area';
//   `;
//     const [result] = await sequelize.query(query);
//     res.status(200).json(result);
//   } catch (error) {
//     console.log('Error to fetch area:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const getFloorsByArea = async (req, res) => {
//   try {
//     const { areaId } = req.query;
//     if (!areaId) {
//       return res.status(400).json({ error: 'floorId is required' });
//     }
//     const query = `
//             SELECT
//           f.id,
//           f.area_name AS floor_name,
//           (
//             SELECT COUNT(*)
//             FROM place r
//             WHERE r.parent_id = f.id
//               AND r.level = 'room'
//           ) AS total_rooms
//         FROM place f
//         WHERE f.level = 'floor'
//           AND f.parent_id = '${areaId}';
//     `;
//     const [result] = await sequelize.query(query);
//     res.status(200).json(result);
//   } catch (error) {
//     console.log('Error to fetch floor:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const getRoomsByFloor = async (req, res) => {
//   try {
//     const { floorId } = req.query;
//     if (!floorId) {
//       return res.status(400).json({ error: 'floorId is required' });
//     }
//     const rooms = await Place.findAll({
//       where: {
//         level: 'room',
//         parent_id: floorId,
//       },
//       include: [
//         {
//           model: RoomDetail,
//           as: 'room_detail',
//         },
//       ],
//     });
//     res.status(200).json(rooms);
//   } catch (error) {
//     console.log('Error to fetch room:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const getRoomsByArea = async (req, res) => {
//   const { areaId } = req.query;
//   if (!areaId) {
//     return res.status(400).json({ error: 'areaId is required' });
//   }
//   const rooms = await Place.findAll({
//     where: { level: 'room' },
//     include: [
//       {
//         model: Place,
//         as: 'ParentPlace',
//         where: { parent_id: areaId },
//         attributes: [],
//       },
//       {
//         model: RoomDetail,
//         as: 'room_detail',
//       },
//     ],
//   });
//   res.status(200).json(rooms);
// };
// const getAndFindRooms = async (req, res) => {
//   try {
//     try {
//       const { areaId, search, page, limit, status, gender } = req.query;
//       if (!areaId) {
//         return res.status(400).json({ error: 'areaId is required' });
//       }

//       const pageNum = parseInt(page, 10) || 1;
//       const pageSize = parseInt(limit, 10) || 10;
//       const offset = (pageNum - 1) * pageSize;

//       // Tạo điều kiện tìm kiếm nếu có search parameter (sử dụng LIKE)
//       const searchCondition = search
//         ? {
//             [Op.or]: [
//               { area_name: { [Op.eq]: search } },
//               { '$room_detail.room_number$': { [Op.eq]: search } },
//             ],
//           }
//         : {};
//       const roomDetailFilter = {};
//       if (gender) {
//         roomDetailFilter.gender = gender;
//       }
//       if (status) {
//         roomDetailFilter.status = status;
//       }
//       // Truy vấn: Lấy các phòng (Place.level = 'room')
//       // mà tầng chứa (ParentPlace) có parent_id = areaId.
//       // Include RoomDetail để lấy thông tin chi tiết của phòng.
//       const rooms = await Place.findAll({
//         where: {
//           level: 'room',
//           ...searchCondition,
//         },
//         include: [
//           {
//             model: Place,
//             as: 'ParentPlace',
//             where: { parent_id: areaId },
//             attributes: [], // Ẩn thông tin tầng nếu không cần thiết
//           },
//           {
//             model: RoomDetail,
//             as: 'room_detail',
//             where:
//               Object.keys(roomDetailFilter).length > 0
//                 ? roomDetailFilter
//                 : undefined,
//             required: true, // Chỉ trả về các phòng có record RoomDetail
//           },
//         ],
//         offset,
//         limit: pageSize,
//       });

//       res.status(200).json({
//         page: pageNum,
//         limit: pageSize,
//         data: rooms,
//       });
//     } catch (error) {
//       console.error('Error fetching rooms by area:', error);
//       res.status(500).json({ error: error.message });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const addNewArea = async (req, res) => {
//   try {
//     const { area_name } = req.body;
//     if (!area_name) {
//       return res.status(400).json({ error: 'area_name is required' });
//     }
//     const newArea = await Place.create({
//       id: uuidv4(),
//       area_name: area_name,
//       parent_id: null,
//       level: 'area',
//     });
//     res.status(200).json(newArea);
//   } catch (error) {
//     console.log('Error creating new area: ', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const updateArea = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { area_name } = req.body;
//     if (!area_name) {
//       return res.status(400).json({ error: 'area_name is required' });
//     }
//     const area = await Place.findOne({
//       where: { id, level: 'area' },
//     });
//     if (!area) {
//       return res.status(404).json({ error: 'Area not found' });
//     }
//     await area.update({ area_name: area_name });
//     return res.status(200).json(area);
//   } catch (error) {
//     console.log('Error updating area: ', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const addNewFloor = async (req, res) => {
//   try {
//     const { areaId, floor_name } = req.body;
//     if (!areaId || !floor_name) {
//       return res
//         .status(400)
//         .json({ error: 'areaId and floor_name is required' });
//     }
//     const area = await Place.findOne({
//       where: { id: areaId, level: 'area' },
//     });
//     if (!area) {
//       return res.status(404).json({ error: 'Area not found' });
//     }
//     const newFloor = await Place.create({
//       id: uuidv4(),
//       area_name: floor_name,
//       parent_id: areaId,
//       level: 'floor',
//     });
//     res.status(200).json(newFloor);
//   } catch (error) {
//     console.log('Error adding new floor: ', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const updateFloor = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { floor_name } = req.body;
//     if (!floor_name) {
//       return res.status(400).json({ error: 'floor name is required' });
//     }
//     const floor = await Place.findOne({
//       where: {
//         id: id,
//         level: 'floor',
//       },
//     });
//     if (!floor) {
//       return res.status(404).json({ error: 'Floor not found' });
//     }
//     await floor.update({ area_name: floor_name });
//     res.status(200).json(floor);
//   } catch (error) {
//     console.log('Error updating floor: ', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const addNewRoom = async (req, res) => {
//   const transaction = await Place.sequelize.transaction();
//   try {
//     const {
//       floorId,
//       room_name,
//       room_detailcol,
//       room_number,
//       capacity,
//       status,
//       leader,
//       gender,
//     } = req.body;
//     if (!floorId || !room_name) {
//       return res
//         .status(400)
//         .json({ error: 'floorId and room_name is required' });
//     }
//     // Add new record to Place
//     const roomId = uuidv4();
//     const newRoomPlace = await Place.create(
//       {
//         id: roomId,
//         area_name: room_name,
//         parent_id: floorId,
//         level: 'room',
//       },
//       { transaction },
//     );
//     // Add new record to RoomDetail
//     const newRoomDetail = await RoomDetail.create(
//       {
//         id: roomId,
//         room_detailcol: room_detailcol,
//         room_number: room_number,
//         capacity: capacity,
//         status: status,
//         leader: leader,
//         gender: gender,
//       },
//       { transaction },
//     );
//     await transaction.commit();
//     res.status(200).json({
//       room: newRoomPlace,
//       room_detail: newRoomDetail,
//     });
//   } catch (error) {
//     await transaction.rollback();
//     console.error('Error creating new room:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const updateRoom = async (req, res) => {
//   const transaction = await Place.sequelize.transaction();
//   try {
//     const { id } = req.params;
//     const {
//       room_name,
//       parent_id,
//       room_detailcol,
//       room_number,
//       capacity,
//       status,
//       leader,
//       gender,
//     } = req.body;
//     const roomPlace = await Place.findOne({
//       where: {
//         id: id,
//         level: 'room',
//       },
//       transaction,
//     });
//     if (!roomPlace) {
//       await transaction.rollback();
//       return res.status(404).json({ error: 'Room not found' });
//     }
//     const roomDetail = await RoomDetail.findOne({
//       where: {
//         id: id,
//       },
//       transaction,
//     });
//     if (!roomDetail) {
//       await transaction.rollback();
//       return res.status(404).json({ error: 'Room Detail not found' });
//     }
//     await roomPlace.update(
//       {
//         area_name: room_name || roomPlace.area_name,
//         parent_id: parent_id || roomPlace.parent_id,
//       },
//       { transaction },
//     );
//     await roomDetail.update(
//       {
//         room_detailcol:
//           room_detailcol !== undefined
//             ? room_detailcol
//             : roomDetail.room_detailcol,
//         room_number:
//           room_number !== undefined ? room_number : roomDetail.room_number,
//         capacity: capacity !== undefined ? capacity : roomDetail.capacity,
//         status: status !== undefined ? status : roomDetail.status,
//         leader: leader !== undefined ? leader : roomDetail.leader,
//         gender: gender !== undefined ? gender : roomDetail.gender,
//       },
//       { transaction },
//     );
//     await transaction.commit();
//     res.status(200).json({
//       room: roomPlace,
//       room_detail: roomDetail,
//     });
//   } catch (error) {
//     await transaction.rollback();
//     console.error('Error updating room:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
