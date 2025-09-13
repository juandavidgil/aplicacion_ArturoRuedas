// import React from 'react'
// import { useGLTF } from '@react-three/drei'
// import * as THREE from 'three'
// import { Object3D } from 'three'
// import { ComponentProps } from 'react'
// import { Asset } from 'expo-asset'

// type GroupProps = ComponentProps<'group'>

// interface GLTFResult {
//   nodes: {
//     [name: string]: Object3D & {
//       geometry: THREE.BufferGeometry
//       material?: THREE.Material | THREE.Material[]
//     }
//   }
//   materials: {
//     [name: string]: THREE.Material
//   }
// }

// export default function FixieBike(props: GroupProps) {
//   // Usar localUri en vez de uri
//   const asset = Asset.fromModule(require('../../assets/modelos/fija.glb'))
//   const modelPath = asset.localUri ?? asset.uri

//   const { nodes, materials } = useGLTF(modelPath) as unknown as GLTFResult

//   return (
//     <group {...props} dispose={null} scale={7} position={[0, -3.5, 0]}>
//       <group scale={0.01}>
//         {/* Rueda trasera */}
//         <group position={[0, 33.749, -49.028]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
//           <mesh 
//             geometry={nodes.Wheel_R_Material_0.geometry} 
//             material={materials.Material} 
//           />
//           <mesh 
//             geometry={nodes.Wheel_R_Material004_0.geometry} 
//             material={materials['Material.004']} 
//           />
//           <mesh 
//             geometry={nodes.Wheel_R_Material001_0.geometry} 
//             material={materials['Material.001']} 
//           />
//           <mesh 
//             geometry={nodes.Wheel_R_Material001_0_1.geometry} 
//             material={materials['Material.001']} 
//           />
//           <mesh 
//             geometry={nodes.Wheel_R_Material002_0.geometry} 
//             material={materials['Material.002']} 
//           />
//         </group>
//       </group>
//     </group>
//   )
// }

// // Preload usando require, no string
// useGLTF.preload(require('../../assets/modelos/fija.glb'))
