export const ROOM_STATUS = {
  EMPTY: 'EMPTY',
  OCCUPIED: 'OCCUPIED',
  PENDING: 'PENDING',
  MAINTENANCE: 'MAINTENANCE',
  LOCKED: 'LOCKED'
};

export const STATUS_COLORS = {
  [ROOM_STATUS.EMPTY]: '#22c55e',
  [ROOM_STATUS.OCCUPIED]: '#ef4444',
  [ROOM_STATUS.PENDING]: '#eab308',
  [ROOM_STATUS.MAINTENANCE]: '#6b7280',
  [ROOM_STATUS.LOCKED]: '#1e1e1e'
};

const MAX_OCCUPANTS = 8;

const MALE_NAMES = [
  'Nguyễn Văn An', 'Trần Văn Bình', 'Lê Văn Cường', 'Phạm Văn Dũng',
  'Hoàng Văn Em', 'Vũ Văn Phong', 'Đặng Văn Giáp', 'Bùi Văn Hùng'
];

const FEMALE_NAMES = [
  'Nguyễn Thị Anh', 'Trần Thị Bích', 'Lê Thị Cúc', 'Phạm Thị Diệp',
  'Hoàng Thị Em', 'Vũ Thị Phương', 'Đặng Thị Giang', 'Bùi Thị Hương'
];

export const getStatusLabel = (room) => {
  switch (room.status) {
    case ROOM_STATUS.OCCUPIED:
      return room.occupants.length >= MAX_OCCUPANTS ? '8/8' : `${room.occupants.length}/8`;
    case ROOM_STATUS.EMPTY:
      return room.occupants.length === 0 ? '0/8' : `${room.occupants.length}/8`;
    case ROOM_STATUS.PENDING:
      return 'Chờ duyệt';
    case ROOM_STATUS.MAINTENANCE:
      return 'Bảo trì';
    case ROOM_STATUS.LOCKED:
      return 'Tạm khóa';
    default:
      return 'Không xác định';
  }
};

const generateMockRoomData = () => {
  const buildings = ['B1', 'B2', 'B5'];
  const floors = [1, 2, 3, 4, 5];
  const roomsPerFloor = 10;
  const allRooms = {};

  buildings.forEach(building => {
    floors.forEach(floor => {
      for (let room = 1; room <= roomsPerFloor; room++) {
        const roomNumber = `${room}`.padStart(2, '0');
        const roomId = `${building}-${floor}${roomNumber}`;
        
        const statuses = Object.values(ROOM_STATUS);
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const isMaleRoom = Math.random() > 0.5;
        const nameList = isMaleRoom ? MALE_NAMES : FEMALE_NAMES;
        
        const occupants = [];
        if (randomStatus === ROOM_STATUS.OCCUPIED) {
          const numOccupants = MAX_OCCUPANTS;
          for (let i = 0; i < numOccupants; i++) {
            occupants.push({
              id: `${roomId}-${i}`,
              name: nameList[i],
              gender: isMaleRoom ? 'male' : 'female',
              isLeader: i === 0,
              joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            });
          }
        } else if (randomStatus === ROOM_STATUS.EMPTY && Math.random() > 0.5) {
          const numOccupants = Math.floor(Math.random() * (MAX_OCCUPANTS - 1)) + 1;
          for (let i = 0; i < numOccupants; i++) {
            occupants.push({
              id: `${roomId}-${i}`,
              name: nameList[i],
              gender: isMaleRoom ? 'male' : 'female',
              isLeader: i === 0,
              joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            });
          }
        }

        allRooms[roomId] = {
          id: roomId,
          building,
          floor,
          roomNumber: `${roomNumber}`,
          status: randomStatus,
          gender: occupants.length > 0 ? occupants[0].gender : null,
          occupants,
          powerUsage: {
            current: Math.floor(Math.random() * 300) + 100,
            history: Array.from({ length: 6 }, () => Math.floor(Math.random() * 300) + 100)
          },
          violations: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0,
          maintenanceHistory: randomStatus === ROOM_STATUS.MAINTENANCE ? [{
            date: new Date(),
            issue: 'Sửa chữa điện nước',
            status: 'Đang tiến hành'
          }] : []
        };
      }
    });
  });

  return allRooms;
};

export const mockRooms = generateMockRoomData();