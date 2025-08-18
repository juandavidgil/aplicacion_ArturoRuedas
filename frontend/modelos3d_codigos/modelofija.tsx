import React, { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
type GLTFResult = {
  nodes: {
    Wheel_R_0: THREE.Mesh;
    Wheel_R004_0: THREE.Mesh;
    Wheel_R_Material001_0: THREE.Mesh;
    Wheel_R_Material001_0_1: THREE.Mesh;
    Wheel_R_Material002_0: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    'Material.004': THREE.MeshStandardMaterial;
    'Material.001': THREE.MeshStandardMaterial;
    'Material.002': THREE.MeshStandardMaterial;
  };
};
export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    require('../modelos3d/fixie.glb'),
) as GLTFResult;/* acomodar la ruta  */
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, 33.749, -49.028]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wheel_R_0.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wheel_R004_0.geometry}
            material={materials['Material.004']}
          />
          <mesh
             castShadow
            receiveShadow
            geometry={nodes.Wheel_R_Material001_0_1.geometry}
            material={materials['Material.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wheel_R_Material002_0.geometry}
            material={materials['Material.002']}
          />
        </group>
      </group>
    </group>
  );
}
useGLTF.preload castShadow
            receiveShadow
            geometry={nodes.Wheel_R_Material001_0_1.geometry}
            material={materials['Material.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wheel_R_Material002_0.geometry}
            material={materials['Material.002']}
          />
        </group>
      </group>
    </group>
  );
}
useGLTF.preload(require('../components/modelos3d/fixie.glb '));
