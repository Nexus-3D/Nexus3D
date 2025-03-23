import React, { useState } from 'react';

const AIGenerationPanel = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedType, setSelectedType] = useState('object'); // object, scene, texture
  
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('请输入生成提示词');
      return;
    }
    
    onGenerate(prompt, selectedType);
  };
  
  // 示例提示词
  const examplePrompts = {
    object: [
      '一把古代中式靠背椅',
      '未来风格的悬浮桌子',
      '藤蔓缠绕的花瓶'
    ],
    scene: [
      '微缩的日式小庭院',
      '赛博朋克风格的巷道场景',
      '古代中国乡村集市'
    ],
    texture: [
      '锈迹斑斑的金属表面',
      '发光的霓虹质感',
      '古老的石头墙面'
    ]
  };
  
  const handleSelectExample = (example) => {
    setPrompt(example);
  };
  
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="generation-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          生成类型
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setSelectedType('object')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              selectedType === 'object'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            3D对象
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('scene')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              selectedType === 'scene'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            场景
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('texture')}
            className={`px-3 py-1 text-xs font-medium rounded-md ${
              selectedType === 'texture'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                : 'text-gray-700 bg-white dark:text-gray-300 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            材质
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          提示词
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          rows={4}
          className="shadow-sm border-gray-300 dark:border-gray-600 rounded-md w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          placeholder={`描述你想生成的${selectedType === 'object' ? '3D对象' : selectedType === 'scene' ? '场景' : '材质'}...`}
          disabled={isGenerating}
        />
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">示例提示词:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts[selectedType].map((example, index) => (
            <button
              key={index}
              onClick={() => handleSelectExample(example)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </>
        ) : (
          '生成'
        )}
      </button>
      
      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-md">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          MVP版本中，AI生成功能仅模拟了生成过程，将添加一个预定义的3D对象到场景中。完整版将支持真实的AI生成功能。
        </p>
      </div>
    </div>
  );
};

export default AIGenerationPanel; 