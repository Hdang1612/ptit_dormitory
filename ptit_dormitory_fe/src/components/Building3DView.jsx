import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { STATUS_COLORS } from '../data/mockRoomData';
import * as THREE from 'three';
import Tooltip from './Tooltip';

const GenderIcon = ({ position, gender }) => {
  const color = gender === 'male' ? '#3b82f6' : '#ec4899';
  return (
    <Text
      position={position}
      fontSize={0.4}
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

const Building = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom, buildingName }) => {
  const floorHeight = 2;
  const roomWidth = 1;
  const roomDepth = 3;
  const buildingWidth = roomWidth * 10; // 10 rooms per floor

  return (
    <group position={position}>
      {/* Building structure */}
      {Object.values(buildingData).map((room) => {
        const x = (parseInt(room.roomNumber) - 1) * roomWidth - buildingWidth / 2;
        const y = (room.floor - 1) * floorHeight;
        const color = STATUS_COLORS[room.status];
        const isHovered = hoveredRoom?.id === room.id;
        
        // Get room leader's gender
        const leader = room.occupants.find(o => o.isLeader);
        const roomGender = leader?.gender;

        return (
          <group key={room.id}>
            <mesh
              position={[x, y, 0]}
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
              <boxGeometry args={[roomWidth * 0.9, floorHeight * 0.9, roomDepth]} />
              <meshStandardMaterial 
                color={color}
                opacity={isHovered ? 0.8 : 1}
                transparent
              />
            </mesh>
            {roomGender && (
              <GenderIcon
                position={[x, y, roomDepth * 0.5]}
                gender={roomGender}
              />
            )}
          </group>
        );
      })}

      {/* Building Label */}
      <Text
        position={[0, -2, 0]}
        fontSize={1.5}
        color="#a40000"
        anchorX="center"
        anchorY="middle"
      >
        {buildingName}
      </Text>
    </group>
  );
};

Building.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object,
  buildingName: PropTypes.string.isRequired
};

const Building3DView = ({ rooms, onRoomSelect }) => {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const containerRef = useRef();

  // Group rooms by building
  const buildingRooms = {
    B1: Object.values(rooms).filter(room => room.building === 'B1'),
    B2: Object.values(rooms).filter(room => room.building === 'B2'),
    B5: Object.values(rooms).filter(room => room.building === 'B5')
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        camera={{ position: [20, 10, 20], fov: 60 }}
        style={{ background: '#f5f5f5' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Building
          position={[-12, 0, 0]}
          buildingData={buildingRooms.B1}
          onRoomHover={setHoveredRoom}
          onRoomClick={onRoomSelect}
          hoveredRoom={hoveredRoom}
          buildingName="Khu B1"
        />
        <Building
          position={[0, 0, 0]}
          buildingData={buildingRooms.B2}
          onRoomHover={setHoveredRoom}
          onRoomClick={onRoomSelect}
          hoveredRoom={hoveredRoom}
          buildingName="Khu B2"
        />
        <Building
          position={[12, 0, 0]}
          buildingData={buildingRooms.B5}
          onRoomHover={setHoveredRoom}
          onRoomClick={onRoomSelect}
          hoveredRoom={hoveredRoom}
          buildingName="Khu B5"
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0, 5, 0]}
        />
      </Canvas>

      {hoveredRoom && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '20px',
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          <Tooltip room={hoveredRoom} />
        </div>
      )}
    </div>
  );
};

Building3DView.propTypes = {
  rooms: PropTypes.object.isRequired,
  onRoomSelect: PropTypes.func.isRequired
};

export default Building3DView;