import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';
import { STATUS_COLORS } from '../data/mockRoomData';

export const GenderIcon = ({ position, gender }) => {
  const color = gender === 'male' ? '#3b82f6' : '#ec4899';
  return (
    <Text
      position={position}
      fontSize={0.6}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {gender === 'male' ? '♂' : '♀'}
    </Text>
  );
};

GenderIcon.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  gender: PropTypes.oneOf(['male', 'female']).isRequired
};

export const createRoom = (room, x, y, z, options) => {
  const {
    floorHeight,
    roomWidth,
    roomDepth,
    hoveredRoom,
    onRoomClick,
    onRoomHover,
    rotation = [0, 0, 0]
  } = options;

  const color = STATUS_COLORS[room.status];
  const isHovered = hoveredRoom?.id === room.id;
  const leader = room.occupants.find(o => o.isLeader);
  const roomGender = leader?.gender;
  
  const symbolZ = roomDepth * 0.5 + 0.1;
  
  // Extract floor and room number from room.id (e.g., "B1-404")
  const [, roomFull] = room.id.split('-');
  const floor = roomFull.charAt(0);
  const roomNum = roomFull.slice(1);

  return (
    <group key={room.id} position={[x, y, z]} rotation={rotation}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onRoomClick(room);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onRoomHover(room);
        }}
        onPointerOut={() => onRoomHover(null)}
      >
        <boxGeometry args={[roomWidth * 1, floorHeight * 1.1, roomDepth]} />
        <meshStandardMaterial 
          color={color}
          opacity={isHovered ? 0.8 : 1}
          transparent
        />
      </mesh>
      {/* Room Number */}
      <Text
        position={[0, 0.7, symbolZ]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`P.${floor}${roomNum}`}
      </Text>
      {roomGender && (
        <GenderIcon
          position={[0, 0, symbolZ]}
          gender={roomGender}
        />
      )}
    </group>
  );
};
