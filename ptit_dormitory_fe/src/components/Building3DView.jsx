import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Tooltip from './Tooltip';
import BuildingB1 from './BuildingB1';
import BuildingB2 from './BuildingB2';
import BuildingB5 from './BuildingB5';

const CoordinateGizmo = () => {
  return (
    <group>
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[4, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
    </group>
  );
};

const GroundPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -12]} receiveShadow>
      <planeGeometry args={[40, 50]} />
      <meshStandardMaterial color="#e5e5e5" />
    </mesh>
  );
};

const CameraController = ({ controlsRef, targetPosition, isAnimating, setIsAnimating }) => {
  useFrame(() => {
    if (!controlsRef.current || !isAnimating) return;

    const dampingFactor = 0.05;
    const currentPos = controlsRef.current.object.position;
    const currentTarget = controlsRef.current.target;
    const targetPos = targetPosition.position;
    const targetTargetPos = targetPosition.target;

    const positionDistance = Math.sqrt(
      Math.pow(currentPos.x - targetPos[0], 2) +
      Math.pow(currentPos.y - targetPos[1], 2) +
      Math.pow(currentPos.z - targetPos[2], 2)
    );

    const targetDistance = Math.sqrt(
      Math.pow(currentTarget.x - targetTargetPos[0], 2) +
      Math.pow(currentTarget.y - targetTargetPos[1], 2) +
      Math.pow(currentTarget.z - targetTargetPos[2], 2)
    );

    if (positionDistance < 0.1 && targetDistance < 0.1) {
      setIsAnimating(false);
      return;
    }

    controlsRef.current.object.position.lerp({
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2]
    }, dampingFactor);

    controlsRef.current.target.lerp({
      x: targetTargetPos[0],
      y: targetTargetPos[1],
      z: targetTargetPos[2]
    }, dampingFactor);

    controlsRef.current.update();
  });

  return null;
};

const Building3DView = ({ rooms, onRoomSelect }) => {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const containerRef = useRef();
  const controlsRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState({
    position: [30, 30, 30],
    target: [0, 5, 0]
  });

  const buildingRooms = {
    B1: Object.values(rooms).filter(room => room.building === 'B1'),
    B2: Object.values(rooms).filter(room => room.building === 'B2'),
    B5: Object.values(rooms).filter(room => room.building === 'B5')
  };

  const focusOnB1 = () => {
    setIsAnimating(true);
    setTargetPosition({
      position: [0, 5, 25],
      target: [0, 5, 0]
    });
  };

  const focusOnB2 = () => {
    setIsAnimating(true);
    setTargetPosition({
      position: [-32, 5, -17],
      target: [-11, 5, -17]
    });
  };

  const focusOnB5 = () => {
    setIsAnimating(true);
    setTargetPosition({
      position: [35, 5, -17],
      target: [13, 5, -17]
    });
  };

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(30, 30, 30);
      controlsRef.current.target.set(0, 5, 0);
      controlsRef.current.update();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        camera={{ position: [30, 30, 30], fov: 60 }}
        style={{ background: '#f5f5f5' }}
        shadows
      >
        <ambientLight intensity={0.7} />
        
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={0.8}
          castShadow
        />
        
        <pointLight 
          position={[0, 15, 0]} 
          intensity={0.5}
          color="#ffffff"
        />
        <pointLight 
          position={[-15, 10, -15]} 
          intensity={0.3}
          color="#ffe5b4"
        />
        <pointLight 
          position={[15, 10, -15]} 
          intensity={0.3}
          color="#ffe5b4"
        />

        <GroundPlane />
        <CoordinateGizmo />
        
        <group>
          <group position={[-11, 0, -18]} rotation={[0, -Math.PI / 2, 0]}>
            <BuildingB2
              position={[0, 0, 0]}
              buildingData={buildingRooms.B2}
              onRoomHover={setHoveredRoom}
              onRoomClick={onRoomSelect}
              hoveredRoom={hoveredRoom}
              onBuildingNameClick={focusOnB2}
            />
          </group>

          <BuildingB1
            position={[0, 0, 0]}
            buildingData={buildingRooms.B1}
            onRoomHover={setHoveredRoom}
            onRoomClick={onRoomSelect}
            hoveredRoom={hoveredRoom}
            onBuildingNameClick={focusOnB1}
          />

          <group position={[13, 0, -17]} rotation={[0, Math.PI / 2, 0]}>
            <BuildingB5
              position={[0, 0, 0]}
              buildingData={buildingRooms.B5}
              onRoomHover={setHoveredRoom}
              onRoomClick={onRoomSelect}
              hoveredRoom={hoveredRoom}
              onBuildingNameClick={focusOnB5}
            />
          </group>
        </group>

        <OrbitControls
          ref={controlsRef}
          enablePan={!isAnimating}
          enableZoom={!isAnimating}
          enableRotate={!isAnimating}
          target={[0, 5, 0]}
          maxPolarAngle={Math.PI / 2}
        />

        <CameraController
          controlsRef={controlsRef}
          targetPosition={targetPosition}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
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