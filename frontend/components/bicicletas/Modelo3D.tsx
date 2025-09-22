import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Modelo3DProps {
  cargar: () => Promise<THREE.Group>;
  scale?: number;
  position?: [number, number, number];
}

export const Modelo3D: React.FC<Modelo3DProps> = ({ cargar, scale = 1, position = [0, 0, 0] }) => {
  const [scene, setScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    cargar()
      .then((model) => setScene(model))
      .catch((err) => console.error('Error cargando modelo 3D:', err));
  }, []);

  if (!scene)
    return <ActivityIndicator size="large" color="#00ffb3" style={{ marginTop: 20 }} />;

  return (
    <Canvas style={{ width: '100%', height: 400 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <primitive object={scene.clone()} scale={scale} position={position} />
      <OrbitControls enableZoom enablePan enableRotate />
    </Canvas>
  );
};
