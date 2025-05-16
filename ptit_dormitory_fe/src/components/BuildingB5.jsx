import React from 'react';
import PropTypes from 'prop-types';
import { createRoom } from './Room';
import DoubleWinderStaircase from './DoubleWinderStaircase';
import Roof from './Roof';

const CoordinateGizmo = () => {
  return (
    <group>
      {/* X axis - Red */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[4, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      {/* Y axis - Green */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      
      {/* Z axis - Blue */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
    </group>
  );
};

const BuildingB5 = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom, onBuildingNameClick }) => {
  const floorHeight = 2;
  const roomWidth = 1.5;
  const roomDepth = 3;

  // Group rooms by floor
  const roomsByFloor = {};
  Object.values(buildingData).forEach(room => {
    if (!roomsByFloor[room.floor]) {
      roomsByFloor[room.floor] = [];
    }
    roomsByFloor[room.floor].push(room);
  });

  const roomOptions = {
    floorHeight,
    roomWidth,
    roomDepth,
    hoveredRoom,
    onRoomClick,
    onRoomHover
  };

  // Calculate building dimensions for roof
  const totalWidth = 15 * (roomWidth + 0.2); // Total width for all rooms
  const totalDepth = roomDepth; // Single row depth
  const maxFloorHeight = Math.max(...Object.keys(roomsByFloor).map(Number)) * floorHeight * 1.2;

  return (
    <group position={position}>
      {/* Add coordinate gizmo */}
      <CoordinateGizmo />

      {Object.entries(roomsByFloor).map(([floor, rooms]) => {
        const floorY = (parseInt(floor) - 1) * floorHeight * 1.2;
        
        return (
          <group key={floor}>
            {rooms.map((room) => {
              const roomIndex = parseInt(room.roomNumber);
              let x = 0;
              
              // Calculate new room number based on position relative to staircase
              let newRoomNumber;
              if (roomIndex <= 7) {
                // Left side of staircase (1,3,5,7,9,11,13)
                x = -(8 - roomIndex) * (roomWidth + 0.2);
                newRoomNumber = ((7 - roomIndex) * 2) + 1;
              } else {
                // Right side of staircase (2,4,6,8,10,12,14,16)
                x = (roomIndex - 7) * (roomWidth + 0.2);
                newRoomNumber = (roomIndex - 7) * 2;
              }

              // Update room.id with new room number
              const [building, roomFull] = room.id.split('-');
              const newRoomId = `${building}-${roomFull[0]}${newRoomNumber.toString().padStart(2, '0')}`;
              room.id = newRoomId;
              
              return createRoom(room, x, floorY, 0, roomOptions);
            })}
            
            <DoubleWinderStaircase 
              position={[0, floorY, -roomDepth/2]}
              height={floorHeight * 1.2}
            />
          </group>
        );
      })}

      {/* Add roof */}
      <Roof
        width={totalWidth + 2}
        depth={totalDepth + 2}
        position={[0, maxFloorHeight, 0]}
        buildingName="Khu B5"
        onBuildingNameClick={onBuildingNameClick}
      />
    </group>
  );
};

BuildingB5.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object,
  onBuildingNameClick: PropTypes.func.isRequired
};

export default BuildingB5;