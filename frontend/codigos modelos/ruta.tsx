import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Object3D } from 'three'
import { ComponentProps } from 'react'
import { Asset } from 'expo-asset'

type GroupProps = ComponentProps<'group'>

interface GLTFResult {
  nodes: {
    [name: string]: Object3D & {
      geometry: THREE.BufferGeometry
      material?: THREE.Material | THREE.Material[]
    }
  }
  materials: {
    [name: string]: THREE.Material
  }
}

export default function RoadBike(props: GroupProps) {
  const model = Asset.fromModule(
    require('../../assets/modelos/ruta.glb')
  ).uri

  const { nodes, materials } = useGLTF(model) as unknown as GLTFResult

  return (
    <group {...props} dispose={null} scale={7} position={[0, -7, 0]}>
      <group scale={0.01}>
        {/* ---------------------- CUADRO PRINCIPAL ---------------------- */}
        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <mesh
            geometry={nodes.Circle003_rama_0.geometry}
            material={materials.rama}
            position={[67.381, 199.255, 0]}
            rotation={[-Math.PI / 2, -0.296, 0]}
            scale={8.546}
          />
          <mesh
            geometry={nodes.Circle004_rama_0.geometry}
            material={materials.rama}
            position={[96.11, 125.146, 0]}
            rotation={[-Math.PI / 2, -0.296, 0]}
            scale={8.546}
          />
          <mesh
            geometry={nodes.Circle050_rama_0.geometry}
            material={materials.rama}
            position={[1.554, 171.576, 0]}
            rotation={[-Math.PI / 2, 1.372, Math.PI / 2]}
            scale={1.676}
          />
          <mesh
            geometry={nodes.Circle022_rama_0.geometry}
            material={materials.rama}
            position={[-21.757, 63.216, 0]}
            scale={6.026}
          />
        </group>

        {/* ---------------------- RUEDA TRASERA ---------------------- */}
        <group
          position={[122.115, 83.986, -0.003]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.516}
        >
          <group
            position={[0.068, 11.511, -7.582]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[193.736, 129.51, 193.736]}
          >
            <mesh
              geometry={nodes.wheel_left001_wheelblack_0.geometry}
              material={materials['wheel.black']}
            />
            <mesh
              geometry={nodes.wheel_left001_wheelorange_0.geometry}
              material={materials['wheel.orange']}
            />
            <mesh
              geometry={nodes.wheel_left001_metalblack_0.geometry}
              material={materials['metal.black']}
            />
          </group>
        </group>

        {/* ---------------------- RUEDA DELANTERA ---------------------- */}
        <group
          position={[-115.56, 80.073, -0.047]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 66.849, 100]}
        >
          <mesh
            geometry={nodes.wheel_left_wheelblack_0.geometry}
            material={materials['wheel.black']}
          />
          <mesh
            geometry={nodes.wheel_left_wheelorange_0.geometry}
            material={materials['wheel.orange']}
          />
          <mesh
            geometry={nodes.wheel_left_metalblack_0.geometry}
            material={materials['metal.black']}
          />
        </group>

        {/* ---------------------- SILLÍN Y TIJERA ---------------------- */}
        <group position={[-41.643, 120.46, -0.166]} scale={6.026}>
          <mesh
            geometry={nodes['1_orangemetal_0'].geometry}
            material={materials['orange.metal']}
          />
          <mesh
            geometry={nodes['1_rama_0'].geometry}
            material={materials.rama}
          />
          <mesh
            geometry={nodes['1_seatplastic_0'].geometry}
            material={materials['seat.plastic']}
          />
        </group>

        <mesh
          geometry={nodes.Plane008_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[-65.731, 209.988, -0.266]}
          rotation={[0, 0, -0.729]}
          scale={5.303}
        />

        {/* ---------------------- MANILLAR Y POTENCIA ---------------------- */}
        <mesh
          geometry={nodes.Circle007_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[85.193, 204.683, 0.076]}
          rotation={[-Math.PI / 2, -0.296, 0]}
          scale={8.546}
        />

        <mesh
          geometry={nodes.Circle010_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[68.241, 195.013, 0.016]}
          rotation={[-Math.PI / 2, -0.296, 0]}
          scale={8.546}
        />

        {/* ---------------------- FRENOS ---------------------- */}
        <mesh
          geometry={nodes.Circle002_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[116.265, 79.568, -0.147]}
          rotation={[-Math.PI / 2, -0.296, 0]}
          scale={8.546}
        />

        <mesh
          geometry={nodes.Circle020_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[-115.468, 79.568, -0.147]}
          rotation={[-Math.PI / 2, -0.296, 0]}
          scale={8.546}
        />

        {/* ---------------------- PEDALES Y BIELAS ---------------------- */}
        <group position={[103.522, 148.383, -0.6]} rotation={[-2.858, 0, -Math.PI]} scale={0.925}>
          <mesh
            geometry={nodes.Circle008_metalsilver_0.geometry}
            material={materials['metal.silver']}
          />
          <mesh
            geometry={nodes.Circle008_metalblack_0.geometry}
            material={materials['metal.black']}
          />
          <mesh
            geometry={nodes.Circle008_seatskin_0.geometry}
            material={materials['seat.skin']}
          />
        </group>

        <group
          position={[-85.751, 142.742, -0.439]}
          rotation={[-2.873, 0.094, -2.814]}
          scale={[-0.925, 0.925, 0.925]}
        >
          <mesh
            geometry={nodes.Circle035_metalsilver_0.geometry}
            material={materials['metal.silver']}
          />
          <mesh
            geometry={nodes.Circle035_metalblack_0.geometry}
            material={materials['metal.black']}
          />
          <mesh
            geometry={nodes.Circle035_seatskin_0.geometry}
            material={materials['seat.skin']}
          />
        </group>

        {/* ---------------------- TRANSMISIÓN ---------------------- */}
        <mesh
          geometry={nodes.NurbsPath_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[-69.788, 219.014, -3.934]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[99.106, 111.148, 111.148]}
        />

        {/* ---------------------- COMPONENTES VARIOS ---------------------- */}
        <mesh
          geometry={nodes.Circle011_seatplastic_0.geometry}
          material={materials['seat.plastic']}
          position={[90.765, 205.745, 0]}
          scale={4.127}
        />

        <mesh
          geometry={nodes.Circle012_seatskin_0.geometry}
          material={materials['seat.skin']}
          position={[95.687, 191.183, 0]}
          scale={4.127}
        />

        <mesh
          geometry={nodes.Circle013_seatskin_0.geometry}
          material={materials['seat.skin']}
          position={[120.403, 212.835, 0]}
          rotation={[0, 0, 1.145]}
          scale={4.127}
        />

        <mesh
          geometry={nodes.Circle014_metalblack_0.geometry}
          material={materials['metal.black']}
          position={[124.038, 209.81, 0]}
          rotation={[0, 0, 1.145]}
          scale={4.127}
        />

        <mesh
          geometry={nodes.Circle015_metalsilver2_0.geometry}
          material={materials['metal.silver2']}
          position={[131.461, 215.95, 0]}
          rotation={[0, 0, 1.145]}
          scale={4.127}
        />

        <mesh
          geometry={nodes.Circle016_Blue_0.geometry}
          material={materials.Blue}
          position={[127.246, 200.066, 0]}
          rotation={[0, 0, 1.145]}
          scale={4.127}
        />

        {/* ---------------------- PROTECTORES Y ACCESORIOS ---------------------- */}
        <group
          position={[88.676, 23.589, 0.024]}
          rotation={[-Math.PI / 2, -0.016, 0]}
          scale={[-100, 100, 100]}
        >
          <mesh
            geometry={nodes.Circle052_metalsilver2_0.geometry}
            material={materials['metal.silver2']}
          />
          <mesh
            geometry={nodes.Circle052_seatskin_0.geometry}
            material={materials['seat.skin']}
          />
        </group>

        <group
          position={[-109.618, 83.986, -0.003]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.516}
        >
          <mesh
            geometry={nodes.protector_seatskin_0.geometry}
            material={materials['seat.skin']}
          />
          <mesh
            geometry={nodes.protector_seatskin_0_1.geometry}
            material={materials['seat.skin']}
          />
          <mesh
            geometry={nodes.protector_seatskin_0_2.geometry}
            material={materials['seat.skin']}
          />
        </group>

        {/* ---------------------- COMPONENTES ADICIONALES ---------------------- */}
        <mesh
          geometry={nodes.Circle030_metalsilver_0.geometry}
          material={materials['metal.silver']}
          position={[60.947, 203.37, 0.091]}
          scale={0.575}
        />

        <mesh
          geometry={nodes.Circle031_metalsilver_0.geometry}
          material={materials['metal.silver']}
          position={[63.11, 196.916, 0.091]}
          scale={0.575}
        />

        <mesh
          geometry={nodes.Circle033_metalsilver_0.geometry}
          material={materials['metal.silver']}
          position={[90.765, 205.623, 0.001]}
          rotation={[-Math.PI, -Math.PI / 2, 0]}
          scale={0.575}
        />

        {/* ---------------------- TODOS LOS DEMÁS COMPONENTES ---------------------- */}
        {/* (Agrega aquí cualquier otro componente del modelo que no esté incluido) */}
        
      </group>
    </group>
  )
}

useGLTF.preload('../../assets/modelos/ruta.glb')