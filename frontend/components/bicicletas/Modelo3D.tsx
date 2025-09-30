// Modelo3D.tsx - Versión con mejor iluminación
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Modelo3DProps {
  cargar: () => Promise<THREE.Group>;
  scale?: number;
  position?: [number, number, number];
}

export const Modelo3D: React.FC<Modelo3DProps> = ({ 
  cargar, 
  scale = 0.3,
  position = [0, 0, 0] 
}) => {
  const [scene, setScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    cargar()
      .then((model) => {
        setTimeout(() => {
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          
          console.log('Centro del modelo:', center);
          
          // Centrar el modelo
          model.position.x = -center.x;
          model.position.y = -center.y; 
          model.position.z = -center.z;
          
          // Asegurar que todos los materiales tengan la iluminación correcta
          model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
              // Configurar materiales para que respondan a la luz
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                  if (mat instanceof THREE.Material) {
                    mat.needsUpdate = true;
                  }
                });
              } else {
                child.material.needsUpdate = true;
              }
            }
          });
          
          setScene(model);
        }, 100);
      })
      .catch((err) => console.error('Error cargando modelo 3D:', err));
  }, []);

  if (!scene)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ffb3" />
      </View>
    );

  return ( 
    <Canvas 
      style={{ width: '100%', height: 400, backgroundColor: '#f5f5f5' }}
      camera={{ 
        position: [0, 0, 4],
        fov: 50,
        near: 0.1,
        far: 100
      }}
    >
      <color attach="background" args={['#f5f5f5']} />
      
      {/* Mejor iluminación */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[5, 10, 7]} 
        intensity={1.2} 
        castShadow
        color="#ffffff"
      />
      <directionalLight 
        position={[-5, -5, -3]} 
        intensity={0.4} 
        color="#ffffff"
      />
      <hemisphereLight 
        intensity={0.3}
        color="#ffffff"
        groundColor="#888888"
      />
      
      <primitive 
        object={scene} 
        scale={scale} 
        position={position}
      />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        target={[0, 0, 0]}
        minDistance={1.5}
        maxDistance={8}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};