import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Stage, 
  PerspectiveCamera 
} from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../shared/LoadingSpinner';

// Render 3D scene content
const SceneContent = ({ sceneData }) => {
  const { objects = [] } = sceneData || {};
  
  return (
    <Stage 
      environment={false}
      intensity={0.5}
      shadows={true}
      adjustCamera={false}
    >
      {/* In a real application, this would render 3D objects based on scene data */}
      {/* Currently using some basic shapes as examples */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4F46E5" />
      </mesh>
      
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#EF4444" metalness={0.5} />
      </mesh>
      
      <mesh position={[-2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d4d4d8" />
      </mesh>
    </Stage>
  );
};

const ScenePreview = ({ 
  sceneData, 
  height = '300px',
  enableControls = true,
  enableZoom = true,
  autoRotate = false
}) => {
  const canvasRef = useRef();
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      style={{ height, position: 'relative' }}
      className="w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]} // Dynamically adjust DPR to balance performance and quality
        shadows
        gl={{ preserveDrawingBuffer: true }} // Allow screenshots
      >
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Scene content with Suspense for loading state */}
        <Suspense fallback={null}>
          <SceneContent sceneData={sceneData} />
          <Environment preset={isDarkMode ? "night" : "sunset"} />
        </Suspense>
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={enableZoom}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
      
      {/* Loading state */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Suspense fallback={<LoadingSpinner size="lg" message="Loading scene..." />}>
          <span></span>
        </Suspense>
      </div>
    </div>
  );
};

export default ScenePreview; 