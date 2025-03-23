import React, { useState } from 'react';

// 预定义的模板对象
const templates = [
  {
    id: 'cube',
    name: '立方体',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="1" />
      </svg>
    ),
    object: {
      id: `cube-${Date.now()}`,
      type: 'mesh',
      geometry: 'box',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: '#4F46E5',
        roughness: 0.5,
        metalness: 0.5
      }
    }
  },
  {
    id: 'sphere',
    name: '球体',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    object: {
      id: `sphere-${Date.now()}`,
      type: 'mesh',
      geometry: 'sphere',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: '#EF4444',
        roughness: 0.3,
        metalness: 0.7
      }
    }
  },
  {
    id: 'cylinder',
    name: '圆柱体',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12,22 C7.58172,22 4,20.209 4,18 L4,6 C4,3.791 7.58172,2 12,2 C16.4183,2 20,3.791 20,6 L20,18 C20,20.209 16.4183,22 12,22 Z" />
        <ellipse cx="12" cy="6" rx="8" ry="4" />
      </svg>
    ),
    object: {
      id: `cylinder-${Date.now()}`,
      type: 'mesh',
      geometry: 'cylinder',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: '#10B981',
        roughness: 0.4,
        metalness: 0.6
      }
    }
  },
  {
    id: 'plane',
    name: '平面',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4,4 L20,4 L20,20 L4,20 L4,4 Z" />
      </svg>
    ),
    object: {
      id: `plane-${Date.now()}`,
      type: 'mesh',
      geometry: 'plane',
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [5, 5, 1],
      args: [5, 5],
      material: {
        color: '#F59E0B',
        roughness: 0.8,
        metalness: 0.2
      }
    }
  },
];

// 场景模板分类
const sceneTemplates = [
  {
    id: 'room',
    name: '室内场景',
    thumbnail: 'https://via.placeholder.com/100?text=Room',
    description: '基础室内场景模板，包含墙壁、地板和基本家具布局。'
  },
  {
    id: 'outdoor',
    name: '户外场景',
    thumbnail: 'https://via.placeholder.com/100?text=Outdoor',
    description: '自然户外环境模板，包含地形、树木和基本景观元素。'
  },
  {
    id: 'gallery',
    name: '展览馆',
    thumbnail: 'https://via.placeholder.com/100?text=Gallery',
    description: '虚拟展览馆模板，适合艺术品展示和虚拟展览。'
  }
];

const TemplateLibrary = ({ onAddObject }) => {
  const [activeTab, setActiveTab] = useState('basic'); // basic, scenes
  
  const handleAddTemplate = (template) => {
    // 为每个新添加的对象生成唯一ID
    const newObject = {
      ...template.object,
      id: `${template.id}-${Date.now()}`
    };
    
    onAddObject(newObject);
  };
  
  const handleAddSceneTemplate = (template) => {
    // 场景模板实际上会添加多个对象
    // 在MVP中简化为一个提示消息
    alert(`在完整版中，这将加载完整的${template.name}模板。当前MVP版本中未实现此功能。`);
  };
  
  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('basic')}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'basic'
              ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          基础形状
        </button>
        <button
          onClick={() => setActiveTab('scenes')}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'scenes'
              ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          场景模板
        </button>
      </div>
      
      {activeTab === 'basic' ? (
        <div className="grid grid-cols-2 gap-3">
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => handleAddTemplate(template)}
              className="flex flex-col items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition duration-150"
            >
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                {template.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {template.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sceneTemplates.map(template => (
            <div
              key={template.id}
              onClick={() => handleAddSceneTemplate(template)}
              className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition duration-150"
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary; 