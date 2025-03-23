import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';

const Model = ({ url }) => {
  const gltf = useGLTF(url);
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 4) / 4;
  });
  
  return (
    <primitive 
      ref={ref}
      object={gltf.scene} 
      position={[0, 0, 0]} 
      scale={1.5} 
    />
  );
};

const HeroCanvas = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Suspense fallback={null}>
        <Float
          speed={2} // 动画速度
          rotationIntensity={0.5} // 旋转强度
          floatIntensity={0.5} // 浮动强度
        >
          {/* 在未来可以从IPFS或其他源加载模型 */}
          <Model url="/models/example_scene.glb" />
        </Float>
        <Environment preset={isDarkMode ? "night" : "sunset"} />
      </Suspense>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </Canvas>
  );
};

export default HeroCanvas; 