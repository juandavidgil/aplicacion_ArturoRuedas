// import React, { useEffect } from 'react';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { Object3D } from 'three';
// import { ComponentProps } from 'react';
// import { Asset } from 'expo-asset';

// type GroupProps = ComponentProps<'group'>;

// interface GLTFResult {
//   nodes: {
//     [name: string]: Object3D & {
//       geometry?: THREE.BufferGeometry;
//       material?: THREE.Material | THREE.Material[];
//     };
//   };
//   materials: {
//     [name: string]: THREE.Material;
//   };
// }

// // Función auxiliar para obtener geometrías de forma segura
// function getSafeGeometry(nodes: GLTFResult['nodes'], name: string) {
//   const node = nodes[name];
//   if (!node || !node.geometry) {

//     return new THREE.BufferGeometry(); // Geometría vacía como fallback
//   }
//   return node.geometry;
// }

// export default function RoadBike(props: GroupProps) {
//   const model = Asset.fromModule(require('../../assets/modelos/ruta.glb')).uri;
//   const { nodes, materials } = useGLTF(model) as unknown as GLTFResult;

//   // Efecto para depuración
//   useEffect(() => {
//     console.log('Available nodes:', Object.keys(nodes));
//     console.log('Available materials:', Object.keys(materials));
//   }, [nodes, materials]);

//   return (
//     <group {...props} dispose={null} scale={7} position={[0, -7, 0]}>
//       <group scale={0.01}>
//         {/* ---------------------- MAIN FRAME ---------------------- */}
//         <group>
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle003_rama_0')}
//             material={materials.rama}
//             position={[67.381, 199.255, 0]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle004_rama_0')}
//             material={materials.rama}
//             position={[96.11, 125.146, 0]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle050_rama_0')}
//             material={materials.rama}
//             position={[1.554, 171.576, 0]}
//             rotation={[-Math.PI / 2, 1.372, Math.PI / 2]}
//             scale={1.676}
//           />
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle022_rama_0')}
//             material={materials.rama}
//             position={[-21.757, 63.216, 0]}
//             scale={6.026}
//           />
//         </group>

//         {/* ---------------------- REAR WHEEL ---------------------- */}
//         <group
//           position={[122.115, 83.986, -0.003]}
//           rotation={[-Math.PI / 2, 0, Math.PI / 2]}
//           scale={0.516}
//         >
//           <group
//             position={[0.068, 11.511, -7.582]}
//             rotation={[0, 0, -Math.PI / 2]}
//             scale={[193.736, 129.51, 193.736]}
//           >
//             <mesh
//               geometry={getSafeGeometry(nodes, 'wheel_left001_wheelblack_0')}
//               material={materials['wheel.black']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'wheel_left001_wheelorange_0')}
//               material={materials['wheel.orange']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'wheel_left001_metalblack_0')}
//               material={materials['metal.black']}
//             />
//           </group>
//         </group>

//         {/* ---------------------- FRONT WHEEL ---------------------- */}
//         <group
//           position={[-115.56, 80.073, -0.047]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           scale={[100, 66.849, 100]}
//         >
//           <mesh
//             geometry={getSafeGeometry(nodes, 'wheel_left_wheelblack_0')}
//             material={materials['wheel.black']}
//           />
//           <mesh
//             geometry={getSafeGeometry(nodes, 'wheel_left_wheelorange_0')}
//             material={materials['wheel.orange']}
//           />
//           <mesh
//             geometry={getSafeGeometry(nodes, 'wheel_left_metalblack_0')}
//             material={materials['metal.black']}
//           />
//         </group>

//         {/* ---------------------- SEAT AND POST ---------------------- */}
//         {nodes['1_orangemetal_0'] && nodes['1_rama_0'] && nodes['1_seatplastic_0'] && (
//           <group position={[-41.643, 120.46, -0.166]} scale={6.026}>
//             <mesh
//               geometry={getSafeGeometry(nodes, '1_orangemetal_0')}
//               material={materials['orange.metal']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, '1_rama_0')}
//               material={materials.rama}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, '1_seatplastic_0')}
//               material={materials['seat.plastic']}
//             />
//           </group>
//         )}

//         {nodes.Plane008_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Plane008_metalblack_0')}
//             material={materials['metal.black']}
//             position={[-65.731, 209.988, -0.266]}
//             rotation={[0, 0, -0.729]}
//             scale={5.303}
//           />
//         )}

//         {/* ---------------------- HANDLEBARS AND STEM ---------------------- */}
//         {nodes.Circle007_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle007_metalblack_0')}
//             material={materials['metal.black']}
//             position={[85.193, 204.683, 0.076]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {nodes.Circle010_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle010_metalblack_0')}
//             material={materials['metal.black']}
//             position={[68.241, 195.013, 0.016]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {/* ---------------------- BRAKES ---------------------- */}
//         {nodes.Circle002_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle002_metalblack_0')}
//             material={materials['metal.black']}
//             position={[116.265, 79.568, -0.147]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {nodes.Circle020_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle020_metalblack_0')}
//             material={materials['metal.black']}
//             position={[-115.468, 79.568, -0.147]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {/* ---------------------- PEDALS AND CRANKSET ---------------------- */}
//         {nodes.Circle008_metalsilver_0 && (
//           <group position={[103.522, 148.383, -0.6]} rotation={[-2.858, 0, -Math.PI]} scale={0.925}>
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle008_metalsilver_0')}
//               material={materials['metal.silver']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle008_metalblack_0')}
//               material={materials['metal.black']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle008_seatskin_0')}
//               material={materials['seat.skin']}
//             />
//           </group>
//         )}

//         {nodes.Circle035_metalsilver_0 && (
//           <group
//             position={[-85.751, 142.742, -0.439]}
//             rotation={[-2.873, 0.094, -2.814]}
//             scale={[-0.925, 0.925, 0.925]}
//           >
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle035_metalsilver_0')}
//               material={materials['metal.silver']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle035_metalblack_0')}
//               material={materials['metal.black']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle035_seatskin_0')}
//               material={materials['seat.skin']}
//             />
//           </group>
//         )}

//         {/* ---------------------- CHAIN AND DRIVETRAIN ---------------------- */}
//         {nodes.NurbsPath_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'NurbsPath_metalblack_0')}
//             material={materials['metal.black']}
//             position={[-69.788, 219.014, -3.934]}
//             rotation={[-Math.PI / 2, 0, 0]}
//             scale={[99.106, 111.148, 111.148]}
//           />
//         )}

//         {/* ---------------------- SEAT COMPONENTS ---------------------- */}
//         {nodes.Circle011_seatplastic_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle011_seatplastic_0')}
//             material={materials['seat.plastic']}
//             position={[90.765, 205.745, 0]}
//             scale={4.127}
//           />
//         )}

//         {nodes.Circle012_seatskin_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle012_seatskin_0')}
//             material={materials['seat.skin']}
//             position={[95.687, 191.183, 0]}
//             scale={4.127}
//           />
//         )}

//         {nodes.Circle013_seatskin_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle013_seatskin_0')}
//             material={materials['seat.skin']}
//             position={[120.403, 212.835, 0]}
//             rotation={[0, 0, 1.145]}
//             scale={4.127}
//           />
//         )}

//         {/* ---------------------- HANDLEBAR COMPONENTS ---------------------- */}
//         {nodes.Circle014_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle014_metalblack_0')}
//             material={materials['metal.black']}
//             position={[124.038, 209.81, 0]}
//             rotation={[0, 0, 1.145]}
//             scale={4.127}
//           />
//         )}

//         {nodes.Circle015_metalsilver2_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle015_metalsilver2_0')}
//             material={materials['metal.silver2']}
//             position={[131.461, 215.95, 0]}
//             rotation={[0, 0, 1.145]}
//             scale={4.127}
//           />
//         )}

//         {nodes.Circle016_Blue_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle016_Blue_0')}
//             material={materials.Blue}
//             position={[127.246, 200.066, 0]}
//             rotation={[0, 0, 1.145]}
//             scale={4.127}
//           />
//         )}

//         {nodes.Circle017_seatskin_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle017_seatskin_0')}
//             material={materials['seat.skin']}
//             position={[122.237, 191.705, 0]}
//             rotation={[0, 0, 1.145]}
//             scale={4.127}
//           />
//         )}

//         {/* ---------------------- SMALL PARTS AND DETAILS ---------------------- */}
//         {nodes.Circle030_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle030_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[60.947, 203.37, 0.091]}
//             scale={0.575}
//           />
//         )}

//         {nodes.Circle031_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle031_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[63.11, 196.916, 0.091]}
//             scale={0.575}
//           />
//         )}

//         {nodes.Circle033_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle033_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[90.765, 205.623, 0.001]}
//             rotation={[-Math.PI, -Math.PI / 2, 0]}
//             scale={0.575}
//           />
//         )}

//         {/* ---------------------- PROTECTORS AND ACCESSORIES ---------------------- */}
//         {nodes.Circle052_metalsilver2_0 && (
//           <group
//             position={[88.676, 23.589, 0.024]}
//             rotation={[-Math.PI / 2, -0.016, 0]}
//             scale={[-100, 100, 100]}
//           >
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle052_metalsilver2_0')}
//               material={materials['metal.silver2']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'Circle052_seatskin_0')}
//               material={materials['seat.skin']}
//             />
//           </group>
//         )}

//         {nodes.protector_seatskin_0 && (
//           <group
//             position={[-109.618, 83.986, -0.003]}
//             rotation={[-Math.PI / 2, 0, Math.PI / 2]}
//             scale={0.516}
//           >
//             <mesh
//               geometry={getSafeGeometry(nodes, 'protector_seatskin_0')}
//               material={materials['seat.skin']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'protector_seatskin_0_1')}
//               material={materials['seat.skin']}
//             />
//             <mesh
//               geometry={getSafeGeometry(nodes, 'protector_seatskin_0_2')}
//               material={materials['seat.skin']}
//             />
//           </group>
//         )}

//         {/* ---------------------- ALL REMAINING COMPONENTS ---------------------- */}
//         {nodes.Circle034_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle034_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[124.08, 211.29, 0]}
//             rotation={[-3.057, -0.155, -0.011]}
//             scale={[-0.422, 0.422, 0.422]}
//           />
//         )}

//         {nodes.Circle036_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle036_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[124.08, 211.29, 0]}
//             rotation={[-3.057, -0.155, -0.011]}
//             scale={[-0.422, 0.422, 0.422]}
//           />
//         )}

//         {nodes.Circle027_metalsilver2_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle027_metalsilver2_0')}
//             material={materials['metal.silver2']}
//             position={[-115.468, 79.564, 0]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {nodes.Circle019_metalsilver_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Circle019_metalsilver_0')}
//             material={materials['metal.silver']}
//             position={[-115.468, 79.564, 0]}
//             rotation={[-Math.PI / 2, -0.296, 0]}
//             scale={8.546}
//           />
//         )}

//         {/* ---------------------- SPOKES AND SMALL DETAILS ---------------------- */}
       

//         {/* ---------------------- ADDITIONAL FRAME PARTS ---------------------- */}
//         {nodes.NurbsPath002_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'NurbsPath002_metalblack_0')}
//             material={materials['metal.black']}
//             position={[-69.689, 219.066, 3.305]}
//             rotation={[-Math.PI / 2, 0, 0]}
//             scale={[99.106, 111.148, 111.148]}
//           />
//         )}

//         {nodes.Plane004_seatplastic_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Plane004_seatplastic_0')}
//             material={materials['seat.plastic']}
//             position={[-67.229, 223.948, -0.001]}
//             rotation={[-Math.PI / 2, 0.121, 0]}
//             scale={[30.659, 31.196, 30.15]}
//           />
//         )}

//         {nodes.Plane005_seatplastic_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Plane005_seatplastic_0')}
//             material={materials['seat.plastic']}
//             position={[-92.459, 224.58, -4.196]}
//             rotation={[-Math.PI / 2, 0.121, 0]}
//             scale={[30.659, 31.196, 30.15]}
//           />
//         )}

//         {/* ---------------------- FINAL DETAILS ---------------------- */}
//         {nodes.Plane022_metalblack_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Plane022_metalblack_0')}
//             material={materials['metal.black']}
//             position={[-56.788, 69.726, 9.463]}
//             scale={[10.179, 10.179, 4.005]}
//           />
//         )}

//         {nodes.Plane006_metalsilver2_0 && (
//           <mesh
//             geometry={getSafeGeometry(nodes, 'Plane006_metalsilver2_0')}
//             material={materials['metal.silver2']}
//             position={[-21.686, 63.508, 9.894]}
//             rotation={[0, 0, -1.096]}
//             scale={1.106}
//           />
//         )}
//       </group>
//     </group>
//   );
// }

// useGLTF.preload('../../assets/modelos/ruta.glb');