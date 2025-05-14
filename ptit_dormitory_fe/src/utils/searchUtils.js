// Filter rooms based on search criteria
export const filterRooms = (rooms, searchQuery, selectedArea, selectedFloor) => {
  return rooms.filter(room => {
    // Extract floor number from room name (e.g., "P.501" -> "5")
    const roomFloorMatch = room.name.match(/P\.(\d)/);
    const roomFloor = roomFloorMatch ? roomFloorMatch[1] : null;
    
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === "Khu" || room.name.includes(selectedArea);
    const matchesFloor = selectedFloor === "Tầng" || 
      (roomFloor && roomFloor === selectedFloor.split(" ")[1]);
    
    return matchesSearch && matchesArea && matchesFloor;
  });
};

// Transform room data for money display
export const transformRoomMoneyData = (rooms) => {
  return rooms.map(room => ({
    id: room.id,
    name: `Khu ${room.building} - P.${room.floor}${room.roomNumber.padStart(2, '0')}`,
    amount: room.powerUsage.current * 3500,
    isPaid: Math.random() > 0.5
  }));
};

// Transform room data for electrical usage display
export const transformRoomElectricalData = (rooms) => {
  return rooms.map(room => {
    const currentUsage = room.powerUsage.current;
    const lastMonthUsage = room.powerUsage.history[0];
    const percentChange = ((currentUsage - lastMonthUsage) / lastMonthUsage * 100).toFixed(1);
    
    return {
      id: room.id,
      name: `Khu ${room.building} - P.${room.floor}${room.roomNumber.padStart(2, '0')}`,
      amount: currentUsage * 3500,
      percentChange: parseFloat(percentChange),
      power: currentUsage
    };
  });
};