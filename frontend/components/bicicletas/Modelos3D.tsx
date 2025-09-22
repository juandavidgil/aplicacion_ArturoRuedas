// Modelos3D.ts
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';

let escenaFixie: THREE.Group | null = null;
let escenaMTB: THREE.Group | null = null;
let escenaRuta: THREE.Group | null = null;

const cargarModelo = async (assetModule: any, escenaGuardada: THREE.Group | null) => {
  if (escenaGuardada) return escenaGuardada;

  const asset = Asset.fromModule(assetModule);
  await asset.downloadAsync();

  return new Promise<THREE.Group>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      asset.localUri || asset.uri,
      (gltf) => resolve(gltf.scene),
      undefined,
      (err) => reject(err)
    );
  });
};

export const cargarFixie = async (): Promise<THREE.Group> => {
  if (escenaFixie) return escenaFixie;
  escenaFixie = await cargarModelo(require('../../../assets/modelos/fija.glb'), escenaFixie);
  return escenaFixie;
};

export const cargarMTB = async (): Promise<THREE.Group> => {
  if (escenaMTB) return escenaMTB;
  escenaMTB = await cargarModelo(require('../../../assets/modelos/mtb.glb'), escenaMTB);
  return escenaMTB;
};

export const cargarRuta = async (): Promise<THREE.Group> => {
  if (escenaRuta) return escenaRuta;
  escenaRuta = await cargarModelo(require('../../../assets/modelos/ruta.glb'), escenaRuta);
  return escenaRuta;
};
