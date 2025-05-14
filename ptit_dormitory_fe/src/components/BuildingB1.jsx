import React from 'react';
import PropTypes from 'prop-types';
import { createRoom } from './Room';
import DoubleWinderStaircase from './DoubleWinderStaircase';
import Roof from './Roof';

const BuildingB1 = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom, onBuildingNameClick }) => {
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
  const totalWidth = 17 * (roomWidth + 0.2); // Total width of the U-shaped building
  const totalDepth = 3 * (roomDepth + 0.2); // Total depth including the U shape
  const maxFloorHeight = Math.max(...Object.keys(roomsByFloor).map(Number)) * floorHeight * 1.2;

  return (
    <group position={position}>
      {Object.entries(roomsByFloor).map(([floor, rooms]) => {
        const floorY = (parseInt(floor) - 1) * floorHeight * 1.2;
        
        return (
          <group key={floor}>
            {rooms.map((room) => {
              let x = 0, z = 0;
              let rotation = [0, 0, 0];
              const roomIndex = parseInt(room.roomNumber);
              const spacing = 0.2; // Consistent spacing between rooms
              const zOffset = 1; // Additional Z offset for wing rooms
              const xOffset = 2; // X offset for wing rooms
              
              let newRoomNumber;
              if (roomIndex <= 15) {
                // Front rooms (1,3,5,7,9,11,13 on left, 2,4,6,8,10,12,14 on right)
                if (roomIndex <= 7) {
                  // Left side of staircase
                  x = -(8 - roomIndex) * (roomWidth + spacing);
                  newRoomNumber = ((7 - roomIndex) * 2) + 1;
                } else {
                  // Right side of staircase
                  x = (roomIndex - 7) * (roomWidth + spacing);
                  newRoomNumber = (roomIndex - 7) * 2;
                }
                z = 0;
              } else if (roomIndex <= 17) {
                // Right wing (18,20)
                x = (8 * (roomWidth + spacing)) + xOffset;
                z = ((roomIndex - 15) * (roomWidth + spacing)) + zOffset;
                rotation = [0, -Math.PI / 2, 0];
                newRoomNumber = roomIndex === 16 ? 18 : 20;
              } else {
                // Left wing (15,17)
                x = (-7 * (roomWidth + spacing)) - xOffset;
                z = ((roomIndex - 17) * (roomWidth + spacing)) + zOffset;
                rotation = [0, Math.PI / 2, 0];
                newRoomNumber = roomIndex === 18 ? 15 : 17;
              }

              // Update room.id with new room number
              const [building, roomFull] = room.id.split('-');
              const newRoomId = `${building}-${roomFull[0]}${newRoomNumber.toString().padStart(2, '0')}`;
              room.id = newRoomId;
              
              return createRoom(room, x, floorY, z, {...roomOptions, rotation});
            })}
            
            <DoubleWinderStaircase 
              position={[0, floorY, -roomDepth/2]}
              height={floorHeight * 1.2}
            />
          </group>
        );
      })}

      {/* Add U-shaped roof */}
      <Roof
        width={totalWidth}
        depth={totalDepth}
        position={[0, maxFloorHeight, 0]}
        buildingName="Khu B1"
        isUShape={true}
        onBuildingNameClick={onBuildingNameClick}
      />
    </group>
  );
};

BuildingB1.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object,
  onBuildingNameClick: PropTypes.func.isRequired
};

export default BuildingB1;