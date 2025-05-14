import React from 'react';
import PropTypes from 'prop-types';

const DoubleWinderStaircase = ({ position, height }) => {
  const stairColor = "#8B7355";
  const stairWidth = 1.5;
  const stairDepth = 5;
  const numSteps = 16;
  const stepHeight = height / numSteps;
  const stepDepth = stairDepth / (numSteps / 2);

  return (
    <group position={position}>
      {/* Main staircase structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[stairWidth, height, stairDepth]} />
        <meshStandardMaterial 
          color={stairColor} 
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* Steps - First half (going up) */}
      {Array.from({ length: numSteps/2 }).map((_, i) => (
        <mesh
          key={`step1-${i}`}
          position={[
            0,
            -height/2 + i * stepHeight,
            stairDepth/2 - i * stepDepth
          ]}
        >
          <boxGeometry args={[stairWidth * 0.8, stepHeight * 0.15, stepDepth]} />
          <meshStandardMaterial 
            color="#A0522D"
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Steps - Second half (going down) */}
      {Array.from({ length: numSteps/2 }).map((_, i) => (
        <mesh
          key={`step2-${i}`}
          position={[
            0,
            height/2 - i * stepHeight,
            -stairDepth/2 + i * stepDepth
          ]}
        >
          <boxGeometry args={[stairWidth * 0.8, stepHeight * 0.15, stepDepth]} />
          <meshStandardMaterial 
            color="#A0522D"
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Railings */}
      <mesh position={[stairWidth/2 - 0.1, 0, 0]}>
        <boxGeometry args={[0.1, height, stairDepth]} />
        <meshStandardMaterial 
          color="#4A4A4A"
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      <mesh position={[-stairWidth/2 + 0.1, 0, 0]}>
        <boxGeometry args={[0.1, height, stairDepth]} />
        <meshStandardMaterial 
          color="#4A4A4A"
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

DoubleWinderStaircase.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number.isRequired
};

export default DoubleWinderStaircase;