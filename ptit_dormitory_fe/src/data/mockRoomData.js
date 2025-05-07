export const ROOM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  FULL: 'FULL',
  MAINTENANCE: 'MAINTENANCE'
};

export const STATUS_COLORS = {
  [ROOM_STATUS.AVAILABLE]: '#22c55e',  // Green
  [ROOM_STATUS.FULL]: '#ef4444',       // Red
  [ROOM_STATUS.MAINTENANCE]: '#6b7280'  // Gray
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
    case ROOM_STATUS.FULL:
      return '8/8';
    case ROOM_STATUS.AVAILABLE:
      return `${room.occupants.length}/8`;
    case ROOM_STATUS.MAINTENANCE:
      return 'Bảo trì';
    default:
      return 'Không xác định';
  }
};

const generateMockRoomData = () => {
  const buildingConfig = {
    'B1': { floors: 4, roomsPerFloor: 19 },
    'B2': { floors: 5, roomsPerFloor: 15 },
    'B5': { floors: 5, roomsPerFloor: 15 }
  };
  
  const allRooms = {};

  Object.entries(buildingConfig).forEach(([building, config]) => {
    for (let floor = 1; floor <= config.floors; floor++) {
      for (let room = 1; room <= config.roomsPerFloor; room++) {
        const roomNumber = `${room}`.padStart(2, '0');
        const roomId = `${building}-${floor}${roomNumber}`;
        
        const statuses = Object.values(ROOM_STATUS);
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const isMaleRoom = Math.random() > 0.5;
        const nameList = isMaleRoom ? MALE_NAMES : FEMALE_NAMES;
        
        const occupants = [];
        if (randomStatus === ROOM_STATUS.FULL) {
          // Fill all 8 spots for full rooms
          for (let i = 0; i < MAX_OCCUPANTS; i++) {
            occupants.push({
              id: `${roomId}-${i}`,
              name: nameList[i],
              gender: isMaleRoom ? 'male' : 'female',
              isLeader: i === 0,
              joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            });
          }
        } else if (randomStatus === ROOM_STATUS.AVAILABLE) {
          // Random number of occupants between 1 and 7 for available rooms
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
    }
  });

  return allRooms;
};

export const mockRooms = generateMockRoomData();