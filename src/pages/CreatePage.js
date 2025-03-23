import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useWallet } from '../contexts/WalletContext';
import EditorToolbar from '../components/editor/EditorToolbar';
import SceneObjects from '../components/editor/SceneObjects';
import ObjectProperties from '../components/editor/ObjectProperties';
import TemplateLibrary from '../components/editor/TemplateLibrary';
import AIGenerationPanel from '../components/editor/AIGenerationPanel';
import LoginPrompt from '../components/shared/LoginPrompt';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const CreatePage = () => {
  const { account } = useWallet();
  const [sceneObjects, setSceneObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [activePanel, setActivePanel] = useState('templates'); // templates, ai, properties
  const [sceneData, setSceneData] = useState({
    name: '未命名场景',
    description: '',
    tags: [],
    isPublic: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleAddObject = (object) => {
    setSceneObjects([...sceneObjects, object]);
  };
  
  const handleUpdateObject = (id, updatedProps) => {
    setSceneObjects(
      sceneObjects.map(obj => 
        obj.id === id ? { ...obj, ...updatedProps } : obj
      )
    );
  };
  
  const handleRemoveObject = (id) => {
    setSceneObjects(sceneObjects.filter(obj => obj.id !== id));
    if (selectedObject && selectedObject.id === id) {
      setSelectedObject(null);
    }
  };
  
  const handleSelectObject = (object) => {
    setSelectedObject(object);
    setActivePanel('properties');
  };
  
  const handleSceneDataChange = (key, value) => {
    setSceneData({
      ...sceneData,
      [key]: value
    });
  };
  
  const handleGenerateWithAI = async (prompt) => {
    try {
      setIsGenerating(true);
      // 模拟AI生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 模拟生成结果
      const newObject = {
        id: `obj-${Date.now()}`,
        type: 'mesh',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        geometry: 'box',
        material: {
          color: '#ff0000',
          roughness: 0.5,
          metalness: 0.5
        }
      };
      
      handleAddObject(newObject);
      setIsGenerating(false);
    } catch (error) {
      console.error('AI生成失败:', error);
      setIsGenerating(false);
    }
  };
  
  const handleSaveScene = () => {
    const sceneDataToSave = {
      ...sceneData,
      objects: sceneObjects,
      createdAt: new Date().toISOString(),
      createdBy: account
    };
    
    localStorage.setItem(`scene-${Date.now()}`, JSON.stringify(sceneDataToSave));
    alert('场景已保存至本地。在完整版中，这将上传至IPFS并支持铸造为NFT。');
  };
  
  if (!account) {
    return <LoginPrompt message="请连接您的钱包以使用创作工具" />;
  }
  
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <EditorToolbar 
        sceneName={sceneData.name}
        onSceneNameChange={(name) => handleSceneDataChange('name', name)}
        onSave={handleSaveScene}
      />
      
      <div className="flex-grow flex">
        {/* 左侧面板 */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
          <div className="p-4">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActivePanel('templates')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activePanel === 'templates' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                    : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                模板
              </button>
              <button
                onClick={() => setActivePanel('ai')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activePanel === 'ai' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                    : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                AI生成
              </button>
            </div>
            
            {activePanel === 'templates' && (
              <TemplateLibrary onAddObject={handleAddObject} />
            )}
            
            {activePanel === 'ai' && (
              <AIGenerationPanel 
                onGenerate={handleGenerateWithAI}
                isGenerating={isGenerating}
              />
            )}
            
            {activePanel === 'properties' && selectedObject && (
              <ObjectProperties 
                object={selectedObject}
                onUpdateObject={handleUpdateObject}
                onRemoveObject={handleRemoveObject}
              />
            )}
          </div>
        </div>
        
        {/* 主编辑区 */}
        <div className="flex-grow relative">
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <Suspense fallback={null}>
              <SceneObjects 
                objects={sceneObjects}
                selectedObject={selectedObject}
                onSelectObject={handleSelectObject}
              />
              <Environment preset="sunset" />
              <gridHelper args={[20, 20, 0x888888, 0x444444]} />
            </Suspense>
            
            <OrbitControls />
          </Canvas>
          
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <LoadingSpinner size="lg" color="indigo" text="AI生成中..." />
            </div>
          )}
        </div>
        
        {/* 右侧面板 - 场景对象列表 */}
        <div className="w-64 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">场景对象</h3>
            <div className="space-y-2">
              {sceneObjects.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  场景中还没有对象。从左侧选择模板或使用AI生成来添加对象。
                </p>
              ) : (
                sceneObjects.map(obj => (
                  <div
                    key={obj.id}
                    onClick={() => handleSelectObject(obj)}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedObject && selectedObject.id === obj.id 
                        ? 'bg-indigo-100 dark:bg-indigo-900' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: obj.material?.color || '#cccccc' }} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {obj.type} {obj.id.split('-')[1]}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage; 