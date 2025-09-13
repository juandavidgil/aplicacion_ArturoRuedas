// import React from 'react'
// import { useGLTF } from '@react-three/drei'
// import * as THREE from 'three'
// import { Object3D } from 'three'
// import { ComponentProps } from 'react'
// import { Asset } from 'expo-asset'

// // ✅ Tipado de props sin depender de JSX
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

// export default function Model (props: GroupProps) {
//  const model = Asset.fromModule(
//      require('../../assets/modelos/mtb.glb') 
//    ).uri
 
//    const { nodes, materials } = useGLTF(model) as unknown as GLTFResult

//   return (
//     <group {...props} dispose={null} scale={7} position={[0, -3.5, 0]}>
//       <group rotation={[-Math.PI / 2, 0, 0]} scale={1.036}>
//         <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
//           {/* Grupo de la cassette */}
//           <group position={[2.803, -19.731, 64.107]} rotation={[-Math.PI / 2, 0, 0]} scale={9.217}>
//             <mesh geometry={nodes['1Circle028_M_Cassette_0'].geometry} material={materials.M_Cassette} />
//             <mesh geometry={nodes['1Circle028_M_Cassette_0_1'].geometry} material={materials.M_Cassette} />
//           </group>

//           {/* Suspensión trasera */}
//           <mesh geometry={nodes.Cylinder_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, -1.803, 11.189]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Cylinder001_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, -1.803, 11.189]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Cylinder003_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, -6.35, 19.334]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Cylinder004_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, 0.267, 7.483]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Cylinder005_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, 6.339, 6.524]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Circle_M_FoxDHX2_0.geometry} material={materials.M_FoxDHX2} position={[0, 6.22, 6.426]} rotation={[-2.632, 0, 0]} scale={38.853} />
//           <mesh geometry={nodes.Circle002_MetalOrange_0.geometry} material={materials.MetalOrange} position={[0, -7.31, 21.053]} rotation={[-2.632, 0, 0]} scale={38.853} />

//           {/* Marco principal */}
//           <mesh geometry={nodes.Cube_M_Frame_0.geometry} material={materials.M_Frame} position={[0, 14.062, -12.327]} rotation={[-2.216, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Cube001_M_Frame_0.geometry} material={materials.M_Frame} position={[0, -5.455, 30.977]} rotation={[-1.205, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Cube002_M_Frame_0.geometry} material={materials.M_Frame} position={[0, 6.798, 14.162]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Cube003_M_Frame_0.geometry} material={materials.M_Frame} position={[0, -9.464, 23.191]} rotation={[-1.762, 0, 0]} scale={100} />
//           <mesh geometry={nodes.cableHoles_M_Frame_0.geometry} material={materials.M_Frame} position={[-2.373, 39.229, -31.669]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />

//           {/* Logotipo Santa Cruz */}
//           <mesh geometry={nodes.santacruz_badge_M_SantaCruzBadge_0.geometry} material={materials.M_SantaCruzBadge} position={[-0.012, 41.246, -34.686]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />

//           {/* Cableado */}
//           <mesh geometry={nodes.cable_Cable_0.geometry} material={materials.Cable} position={[-10.628, 18.393, -42.748]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.cable001_Cable_0.geometry} material={materials.Cable} position={[6.069, 44.902, -31.561]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.cable002_Cable_0.geometry} material={materials.Cable} position={[8.83, 45.332, -31.896]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.cable003_Cable_0.geometry} material={materials.Cable} position={[5.775, -19.862, 61.853]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.cable004_Cable_0.geometry} material={materials.Cable} position={[-3.701, -13.628, 50.198]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />

//           {/* Suspensión delantera Fox 40 */}
//           <mesh geometry={nodes['1Circle003_M_Fox40_1_0'].geometry} material={materials.M_Fox40_1} position={[0, 11.939, -47.251]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes['1Circle004_M_Fox40_1_0'].geometry} material={materials.M_Fox40_1} position={[0, 11.939, -47.251]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes['1Circle005_M_Fox40_1_0'].geometry} material={materials.M_Fox40_1} position={[0, 11.469, -47.497]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle007_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-0.033, -18.298, -66.815]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle008_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-5.985, -19.173, -68.75]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes['1Circle009_M_Fox40_1_0'].geometry} material={materials.M_Fox40_1} position={[0, 14.997, -45.65]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle010_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-6.586, 46.995, -28.904]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Plane_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-6.62, 47.267, -28.762]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle006_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-5.658, 34.487, -37.906]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle011_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[-5.757, 46.586, -31.165]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Circle012_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[0, 11.939, -47.251]} rotation={[-1.089, 0, -Math.PI / 2]} scale={44.601} />
//           <mesh geometry={nodes.Cylinder002_M_Fox40_2_0.geometry} material={materials.M_Fox40_2} position={[0, 33.348, -36.047]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />

//           {/* Rueda delantera */}
//           <mesh geometry={nodes['1WheelMiddleStud001_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.041, -18.043, -66.747]} rotation={[-1.273, 0, 0]} scale={100} />
//           <mesh geometry={nodes['1Cube007_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.019, -18.277, -66.804]} rotation={[-1.273, 0, 0]} scale={100} />
//           <mesh geometry={nodes['1Cube008_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.041, -18.277, -66.804]} rotation={[-1.273, 0, 0]} scale={95.824} />
//           <mesh geometry={nodes['1Cube009_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.841, -18.309, -66.814]} rotation={[-1.195, 0, 0]} scale={100} />
//           <mesh geometry={nodes['1Circle140_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.033, -18.284, -66.809]} rotation={[-1.273, Math.PI / 2, 0]} scale={100} />
//           <mesh geometry={nodes.Cylinder046_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.011, -18.284, -66.809]} rotation={[-1.273, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Cylinder047_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.011, -18.284, -66.809]} rotation={[-1.273, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Circle141_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.033, -18.284, -66.809]} rotation={[-1.273, Math.PI / 2, 0]} scale={100} />

//           {/* Rueda trasera */}
//           <mesh geometry={nodes['1WheelMiddleStud002_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.041, -20.123, 64.418]} rotation={[0.501, 0, 0]} scale={95.043} />
//           <mesh geometry={nodes['1Cube001_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.02, -20.024, 64.211]} rotation={[0.501, 0, 0]} scale={95.043} />
//           <mesh geometry={nodes['1Cube002_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.041, -20.024, 64.211]} rotation={[0.501, 0, 0]} scale={91.074} />
//           <mesh geometry={nodes['1Cube003_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.801, -20.009, 64.184]} rotation={[0.58, 0, 0]} scale={95.043} />
//           <mesh geometry={nodes['1Circle001_M_Wheel_2_0'].geometry} material={materials.M_Wheel_2} position={[-0.033, -20.019, 64.205]} rotation={[0.501, Math.PI / 2, 0]} scale={95.043} />
//           <mesh geometry={nodes.Cylinder006_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.012, -20.019, 64.205]} rotation={[0.501, 0, 0]} scale={95.043} />
//           <mesh geometry={nodes.Cylinder007_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.012, -20.019, 64.205]} rotation={[0.501, 0, 0]} scale={95.043} />
//           <mesh geometry={nodes.Circle003_M_Wheel_1_0.geometry} material={materials.M_Wheel_1} position={[-0.033, -20.019, 64.205]} rotation={[0.501, Math.PI / 2, 0]} scale={95.043} />

//           {/* Frenos Shimano */}
//           <mesh geometry={nodes.Circle013_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -18.285, -66.811]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes['1Circle014_M_ShimanoBrake_1_0'].geometry} material={materials.M_ShimanoBrake_1} position={[-3.232, -18.285, -66.811]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes.Circle142_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -18.285, -66.811]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes.Plane056_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -18.285, -66.811]} rotation={[-Math.PI / 2, 0, 0]} scale={154.918} />
//           <mesh geometry={nodes.Circle004_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -20.111, 64.007]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes['1Circle002_M_ShimanoBrake_1_0'].geometry} material={materials.M_ShimanoBrake_1} position={[-3.232, -20.111, 64.007]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes.Circle005_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -20.111, 64.007]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={154.918} />
//           <mesh geometry={nodes.Plane003_M_ShimanoBrake_2_0.geometry} material={materials.M_ShimanoBrake_2} position={[-3.207, -20.111, 64.007]} rotation={[-Math.PI / 2, 0, 0]} scale={154.918} />

//           {/* Manillar y potencia */}
//           <mesh geometry={nodes.Handlebar_M_HandleBars_0.geometry} material={materials.M_HandleBars} position={[0, 51.305, -29.946]} rotation={[-1.027, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Grips_M_HandleBars_0.geometry} material={materials.M_HandleBars} position={[-27.57, 54.366, -28.095]} rotation={[2.115, 1.421, Math.PI]} scale={100} />
//           <mesh geometry={nodes['1Cylinder011_M_Stem_0'].geometry} material={materials.M_Stem} position={[1.837, 53.331, -29.127]} rotation={[0.737, 0, Math.PI]} scale={100} />
//           <mesh geometry={nodes['1Cylinder012_M_Stem_0'].geometry} material={materials.M_Stem} position={[0.986, 49.7, -25.317]} rotation={[1.587, -Math.PI / 2, 0]} scale={100} />
//           <mesh geometry={nodes['1Plane003_M_Stem_0'].geometry} material={materials.M_Stem} position={[0.084, 50.49, -28.497]} rotation={[-1.027, 0, -Math.PI]} scale={100} />
//           <mesh geometry={nodes['1Plane004_M_Stem_0'].geometry} material={materials.M_Stem} position={[0.084, 50.49, -28.497]} rotation={[-1.027, 0, -Math.PI]} scale={100} />

//           {/* Asiento */}
//           <mesh geometry={nodes.Cylinder013_M_Seat_0.geometry} material={materials.M_Seat} position={[0, 17.4, 20.234]} rotation={[-1.102, 0, 0]} scale={43.302} />
//           <mesh geometry={nodes.Plane005_M_Seat_0.geometry} material={materials.M_Seat} position={[0, 24.14, 26.894]} rotation={[-1.411, 0, 0]} scale={43.302} />
//           <mesh geometry={nodes.Cylinder014_M_Seat_0.geometry} material={materials.M_Seat} position={[0, 34.464, 30.542]} rotation={[-1.441, 0, 0]} scale={43.302} />
//           <mesh geometry={nodes.Cylinder015_M_Seat_0.geometry} material={materials.M_Seat} position={[0, 35.776, 27.668]} rotation={[-0.946, -0.004, -0.025]} scale={43.302} />
//           <mesh geometry={nodes.Plane006_M_Seat_0.geometry} material={materials.M_Seat} position={[0.031, 36.177, 29.085]} rotation={[-1.15, 0, 0]} scale={43.302} />
//           <mesh geometry={nodes.Plane007_M_Seat_0.geometry} material={materials.M_Seat} position={[0.031, 36.498, 29.229]} rotation={[-1.15, 0, 0]} scale={43.302} />
//           <mesh geometry={nodes.Cylinder016_M_Seat_0.geometry} material={materials.M_Seat} position={[0.031, 33.206, 29.456]} rotation={[0.421, 0, 0]} scale={43.302} />

//           {/* Transmisión */}
//           <mesh geometry={nodes.Plane008_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[4.998, -19.465, 18.465]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={99.727} />
//           <mesh geometry={nodes.Cylinder010_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[4.215, -19.465, 18.465]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={99.727} />
//           <mesh geometry={nodes.Circle001_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[5.496, -20.295, 0.042]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={99.727} />
//           <mesh geometry={nodes['1Circle023_M_Crankset1_0'].geometry} material={materials.M_Crankset1} position={[4.915, -19.465, 18.465]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={99.727} />
//           <mesh geometry={nodes['1Cube010_M_Crankset1_0'].geometry} material={materials.M_Crankset1} position={[4.915, -19.465, 18.465]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={99.727} />
//           <mesh geometry={nodes.Circle025_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[-5.618, -19.465, 18.465]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={99.727} />
//           <mesh geometry={nodes.Plane009_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[-4.703, -19.465, 18.415]} rotation={[-Math.PI / 2, 0, 0]} scale={99.727} />
//           <mesh geometry={nodes.Circle026_M_Crankset2_0.geometry} material={materials.M_Crankset2} position={[-5.303, -20.295, 36.838]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={99.727} />
//           <mesh geometry={nodes.Plane010_M_Chain_0.geometry} material={materials.M_Chain} position={[4.555, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
//           <mesh geometry={nodes.Circle024_M_Chainguide_0.geometry} material={materials.M_Chainguide} position={[4.305, -18.572, 18.9]} rotation={[-1.567, 0, 0]} scale={43.679} />
//           <mesh geometry={nodes.Plane011_M_Chainguide_0.geometry} material={materials.M_Chainguide} position={[4.305, -18.741, 18.602]} rotation={[-1.567, 0, 0]} scale={43.679} />
//           <mesh geometry={nodes.Plane012_M_Chainguide_0.geometry} material={materials.M_Chainguide} position={[4.981, -18.572, 18.9]} rotation={[-1.567, 0, 0]} scale={43.679} />
//           <mesh geometry={nodes.Plane013_M_Chainguide_0.geometry} material={materials.M_Chainguide} position={[4.68, -18.572, 18.9]} rotation={[-1.567, 0, 0]} scale={43.679} />

//           {/* Grupo de la cassette trasera */}
//           <mesh geometry={nodes.Circle027_M_Cassette_1_0.geometry} material={materials.M_Cassette_1} position={[2.647, -19.731, 64.107]} rotation={[-Math.PI / 2, 0, 0]} scale={9.217} />
//           <mesh geometry={nodes.Circle029_M_Cassette_1_0.geometry} material={materials.M_Cassette_1} position={[2.803, -19.731, 64.107]} rotation={[-Math.PI / 2, 0, 0]} scale={9.217} />
//           <mesh geometry={nodes.Circle059_M_Cassette_1_0.geometry} material={materials.M_Cassette_1} position={[-4.378, -19.731, 64.107]} rotation={[-Math.PI / 2, 0, 0]} scale={9.217} />

//           {/* Desviador trasero */}
//           <mesh geometry={nodes.Plane014_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[4.588, -27.64, 63.984]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Plane015_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[5.289, -27.64, 63.984]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Gear_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[4.784, -32.794, 66.373]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes['1Plane016_M_RearDerailleur_1_0'].geometry} material={materials.M_RearDerailleur_1} position={[5.083, -27.64, 63.984]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes['1Plane017_M_RearDerailleur_1_0'].geometry} material={materials.M_RearDerailleur_1} position={[5.083, -26.343, 60.771]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes['1Plane018_M_RearDerailleur_1_0'].geometry} material={materials.M_RearDerailleur_1} position={[5.083, -26.343, 60.771]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Circle030_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[5.933, -25.834, 58.839]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Circle031_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[5.083, -19.917, 64.15]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Circle032_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[5.083, -22.266, 66.864]} rotation={[-1.73, 0, 0]} scale={14.854} />
//           <mesh geometry={nodes.Gear004_M_RearDerailleur_2_0.geometry} material={materials.M_RearDerailleur_2} position={[4.784, -24.029, 63.307]} rotation={[-1.73, 0, 0]} scale={14.854} />

//           {/* Pedales */}
//           <mesh geometry={nodes.Plane019_M_Pedals_0.geometry} material={materials.M_Pedals} position={[11.524, -19.402, 0.041]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={14.135} />
//           <mesh geometry={nodes.Circle033_M_Pedals_0.geometry} material={materials.M_Pedals} position={[6.875, -19.402, 0.041]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={14.135} />
//           <mesh geometry={nodes.Plane002_M_Pedals_0.geometry} material={materials.M_Pedals} position={[-11.233, -19.402, 36.849]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={14.135} />
//           <mesh geometry={nodes.Circle009_M_Pedals_0.geometry} material={materials.M_Pedals} position={[-6.584, -19.402, 36.849]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={14.135} />

//           {/* Cambios y controles */}
//           <mesh geometry={nodes.Plane021_M_Shifter_0.geometry} material={materials.M_Shifter} position={[21.979, 51.733, -29.867]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />
//           <mesh geometry={nodes.Cube015_M_Shifter_0.geometry} material={materials.M_Shifter} position={[22.278, 51.428, -30.29]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />
//           <mesh geometry={nodes.Cube016_M_Shifter_0.geometry} material={materials.M_Shifter} position={[21.188, 51.488, -28.106]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />
//           <mesh geometry={nodes.Cylinder017_M_Shifter_0.geometry} material={materials.M_Shifter} position={[14.731, 50.297, -32.025]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />
//           <mesh geometry={nodes.Cylinder018_M_Shifter_0.geometry} material={materials.M_Shifter} position={[19.725, 53.178, -28.922]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />
//           <mesh geometry={nodes.Circle035_M_Shifter_0.geometry} material={materials.M_Shifter} position={[19.768, 53.689, -30.385]} rotation={[-0.391, -0.087, 1.648]} scale={8.905} />

//           {/* Frenos delanteros */}
//           <mesh geometry={nodes['1Plane022_M_BrakeCaliper_1_0'].geometry} material={materials.M_BrakeCaliper_1} position={[-3.361, -16.613, -56.437]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes['1Plane023_M_BrakeCaliper_1_0'].geometry} material={materials.M_BrakeCaliper_1} position={[-3.15, -15.747, -54.017]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle037_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.337, -15.82, -54.041]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle038_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.316, -14.608, -54.028]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle039_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.313, -14.455, -53.724]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Plane024_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.494, -14.302, -53.411]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle041_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-2.796, -17.187, -56.398]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle040_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.311, -14.411, -53.639]} rotation={[1.498, -0.016, -0.006]} scale={8.642} />

//           {/* Frenos traseros */}
//           <mesh geometry={nodes['1Plane020_M_BrakeCaliper_1_0'].geometry} material={materials.M_BrakeCaliper_1} position={[-3.052, -10.265, 59.883]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes['1Plane057_M_BrakeCaliper_1_0'].geometry} material={materials.M_BrakeCaliper_1} position={[-2.841, -8.02, 58.632]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle017_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.028, -8.031, 58.709]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle034_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.007, -8.217, 57.511]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle143_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.003, -7.943, 57.31]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Plane058_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.185, -7.659, 57.108]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle144_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-2.487, -10.133, 60.443]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />
//           <mesh geometry={nodes.Circle145_M_BrakeCaliper_2_0.geometry} material={materials.M_BrakeCaliper_2} position={[-3.002, -7.866, 57.253]} rotation={[-0.238, -0.016, -0.006]} scale={8.642} />

//           {/* Adaptador de freno trasero */}
//           <mesh geometry={nodes.Cube017_M_RearBrakeAdapter_0.geometry} material={materials.M_RearBrakeAdapter} position={[-4.568, -14.39, 62.692]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />

//           {/* Palancas de freno derecha */}
//           <mesh geometry={nodes.Circle048_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[25.398, 52.757, -30.33]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Cube018_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[28.692, 53.308, -31.867]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle049_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[25.45, 52.603, -31.849]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle051_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[23.409, 54.48, -27.757]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle052_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[22.921, 54.106, -28.446]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle053_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[23.62, 54.065, -29.412]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle054_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[23.597, 54.189, -29.482]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle050_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[23.235, 55.717, -29.321]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle056_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[25.611, 52.214, -30.612]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle055_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[26.234, 52.419, -30.679]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle057_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[26.606, 53.138, -29.275]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />
//           <mesh geometry={nodes.Circle058_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[22.819, 51.718, -30.682]} rotation={[-0.091, -0.091, -1.356]} scale={10.014} />

//           {/* Palancas de freno izquierda */}
//           <mesh geometry={nodes.Circle042_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-23.542, 53.09, -31.323]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Cube036_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-26.904, 52.33, -32.599]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle043_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-23.613, 51.981, -32.371]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle044_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-22.103, 53.707, -27.992]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle045_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-21.554, 53.255, -28.58]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle046_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-22.247, 52.672, -29.359]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle047_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-22.269, 52.543, -29.301]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle146_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-22.418, 51.731, -27.956]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle147_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-23.579, 53.22, -31.958]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle148_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-24.237, 53.198, -31.986]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle149_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-24.756, 53.999, -30.676]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//           <mesh geometry={nodes.Circle150_M_BrakeLever_0.geometry} material={materials.M_BrakeLever} position={[-20.785, 52.79, -31.728]} rotation={[-0.805, 0.104, 1.448]} scale={10.014} />
//         </group>
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('../../assets/modelos/mtb.glb')