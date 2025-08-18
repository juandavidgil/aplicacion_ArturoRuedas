import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'
import { Asset } from 'expo-asset'
import { ComponentProps } from 'react'

// ✅ Tipado de props sin depender de JSX
type GroupProps = ComponentProps<'group'>

type GLTFResult = GLTF & {
  nodes: {
    pasted__model1: THREE.Mesh
    pasted__model2: THREE.Mesh
    pasted__model3: THREE.Mesh
    pasted__model4: THREE.Mesh
    pasted__model5: THREE.Mesh
    pasted__model6: THREE.Mesh
    pasted__model7: THREE.Mesh
  }
  materials: {
    koltuk: THREE.MeshStandardMaterial
    siyah: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
    altin: THREE.MeshStandardMaterial
  }
}

export default function Model(props: GroupProps) {
 
  const model = Asset.fromModule(
    require('../../assets/modelos/silla.glb') 
  ).uri

  const { nodes, materials } = useGLTF(model) as unknown as GLTFResult

  return (
    <group {...props} dispose={null} scale={7} position={[0, -1.4, 0]}>
      <mesh castShadow receiveShadow geometry={nodes.pasted__model1.geometry} material={materials.koltuk} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model2.geometry} material={materials.siyah} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model3.geometry} material={materials.metal} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model4.geometry} material={materials.siyah} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model5.geometry} material={materials.siyah} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model6.geometry} material={materials.altin} />
      <mesh castShadow receiveShadow geometry={nodes.pasted__model7.geometry} material={materials.koltuk} />
    </group>
  )
}

// ✅ Preload también con expo-asset
useGLTF.preload(Asset.fromModule(require('../../assets/modelos/silla.glb')).uri)
