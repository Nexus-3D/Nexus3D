import React, { useState, useEffect } from 'react';

const VectorInput = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">X</span>
            <input
              type="number"
              value={value[0]}
              onChange={(e) => onChange([parseFloat(e.target.value), value[1], value[2]])}
              className="shadow-sm border-gray-300 dark:border-gray-600 rounded-md w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              step="0.1"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Y</span>
            <input
              type="number"
              value={value[1]}
              onChange={(e) => onChange([value[0], parseFloat(e.target.value), value[2]])}
              className="shadow-sm border-gray-300 dark:border-gray-600 rounded-md w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              step="0.1"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Z</span>
            <input
              type="number"
              value={value[2]}
              onChange={(e) => onChange([value[0], value[1], parseFloat(e.target.value)])}
              className="shadow-sm border-gray-300 dark:border-gray-600 rounded-md w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorInput = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 shadow-sm border-gray-300 dark:border-gray-600 rounded-md w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

const RangeInput = ({ label, value, onChange, min = 0, max = 1, step = 0.01 }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

const ObjectProperties = ({ object, onUpdateObject, onRemoveObject }) => {
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1, 1, 1]);
  const [color, setColor] = useState('#ffffff');
  const [roughness, setRoughness] = useState(0.5);
  const [metalness, setMetalness] = useState(0.5);
  
  useEffect(() => {
    if (object) {
      setPosition(object.position || [0, 0, 0]);
      setRotation(object.rotation || [0, 0, 0]);
      setScale(object.scale || [1, 1, 1]);
      setColor(object.material?.color || '#ffffff');
      setRoughness(object.material?.roughness !== undefined ? object.material.roughness : 0.5);
      setMetalness(object.material?.metalness !== undefined ? object.material.metalness : 0.5);
    }
  }, [object]);
  
  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    onUpdateObject(object.id, { position: newPosition });
  };
  
  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
    onUpdateObject(object.id, { rotation: newRotation });
  };
  
  const handleScaleChange = (newScale) => {
    setScale(newScale);
    onUpdateObject(object.id, { scale: newScale });
  };
  
  const handleColorChange = (newColor) => {
    setColor(newColor);
    onUpdateObject(object.id, { 
      material: { 
        ...object.material, 
        color: newColor 
      } 
    });
  };
  
  const handleRoughnessChange = (newRoughness) => {
    setRoughness(newRoughness);
    onUpdateObject(object.id, { 
      material: { 
        ...object.material, 
        roughness: newRoughness 
      } 
    });
  };
  
  const handleMetalnessChange = (newMetalness) => {
    setMetalness(newMetalness);
    onUpdateObject(object.id, { 
      material: { 
        ...object.material, 
        metalness: newMetalness 
      } 
    });
  };
  
  const handleRemove = () => {
    onRemoveObject(object.id);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">对象属性</h3>
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <VectorInput label="位置" value={position} onChange={handlePositionChange} />
      <VectorInput label="旋转" value={rotation} onChange={handleRotationChange} />
      <VectorInput label="缩放" value={scale} onChange={handleScaleChange} />
      
      <div className="mt-6 mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">材质属性</h4>
        <ColorInput label="颜色" value={color} onChange={handleColorChange} />
        <RangeInput label="粗糙度" value={roughness} onChange={handleRoughnessChange} />
        <RangeInput label="金属度" value={metalness} onChange={handleMetalnessChange} />
      </div>
    </div>
  );
};

export default ObjectProperties; 