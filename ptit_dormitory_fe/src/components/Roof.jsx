import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

const Roof = ({ width, depth, position, buildingName, isUShape, onBuildingNameClick }) => {
  const roofHeight = 1.5;
  const overhang = .5;
  const roofColor = "#8B4649";

  const handleTextClick = (e) => {
    e.stopPropagation();
    if (onBuildingNameClick) {
      onBuildingNameClick();
    }
  };

  if (isUShape) {
    return (
      <group position={position}>
        {/* Left wing */}
        <mesh position={[-width/3 - width/6 - 0.375, roofHeight/2-0.8, depth-6]}>
          <boxGeometry args={[width/5 + overhang, roofHeight, depth - 4 + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
        
        {/* Right wing */}
        <mesh position={[width/3 + width/6 + 0.375, roofHeight/2-0.8, depth-6]}>
          <boxGeometry args={[width/5 + overhang, roofHeight, depth - 4 + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
        
        {/* Back connection */}
        <mesh position={[0, roofHeight/2-0.8, 0]}>
          <boxGeometry args={[width*1.225 + overhang, roofHeight, depth/2 + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>

        {/* Building name text */}
        <Text
          position={[0, roofHeight-0.7, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={2.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
          material-metalness={0.8}
          material-roughness={0.1}
          onClick={handleTextClick}
          onPointerOver={(e) => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'default';
          }}
        >
          {buildingName}
        </Text>
      </group>
    );
  }

  return (
    <group position={position}>
      {/* Main roof structure */}
      <mesh position={[0, roofHeight/2-0.8, 0]}>
        <boxGeometry args={[width + overhang*2, roofHeight, depth + overhang*2]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Building name text */}
      <Text
        position={[0, roofHeight-0.7, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={2.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
        material-metalness={0.8}
        material-roughness={0.1}
        onClick={handleTextClick}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'default';
        }}
      >
        {buildingName}
      </Text>
    </group>
  );
};

Roof.propTypes = {
  width: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingName: PropTypes.string.isRequired,
  isUShape: PropTypes.bool,
  onBuildingNameClick: PropTypes.func
};

export default Roof;