import React from 'react';
import { useThree } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Plane } from '@react-three/drei';

// 几何体映射
const geometryMap = {
  box: Box,
  sphere: Sphere,
  cylinder: Cylinder,
  plane: Plane
};

const SceneObject = ({ object, isSelected, onClick }) => {
  const { id, type, position, rotation, scale, geometry, material = {} } = object;
  
  // 确定使用哪种几何体组件
  const GeometryComponent = geometryMap[geometry] || Box;
  
  const materialProps = {
    color: material.color || '#ffffff',
    roughness: material.roughness !== undefined ? material.roughness : 0.5,
    metalness: material.metalness !== undefined ? material.metalness : 0.5,
    transparent: material.transparent || false,
    opacity: material.opacity !== undefined ? material.opacity : 1,
  };
  
  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick(object);
      }}
    >
      <GeometryComponent args={object.args}>
        <meshStandardMaterial
          {...materialProps}
          emissive={isSelected ? "#ffffff" : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </GeometryComponent>
    </group>
  );
};

const SceneObjects = ({ objects, selectedObject, onSelectObject }) => {
  const { gl, scene, camera } = useThree();
  
  // 点击3D场景背景部分取消选择
  const handleClick = (e) => {
    // 确保点击的是场景背景而不是对象
    if (e.object === scene || !e.object) {
      onSelectObject(null);
    }
  };
  
  return (
    <group onClick={handleClick}>
      {objects.map((obj) => (
        <SceneObject
          key={obj.id}
          object={obj}
          isSelected={selectedObject && selectedObject.id === obj.id}
          onClick={onSelectObject}
        />
      ))}
    </group>
  );
};

export default SceneObjects; 