import { RouteProp } from '@react-navigation/native';

export type ComponenteId =
  // 🔹 MTB
  | 'marcoMtb'
  | 'ruedasMtb'
  | 'manubrioMtb'
  | 'suspensionMtb'
  | 'pedalesMtb'
  | 'pachaMtb'
  | 'sillinMtb'
  | 'frenosMtb'
  | 'cadenaMtb'
  | 'platoMtb'
  | 'pedalMtb'
  

  // 🔹 Ruta
  | 'marcoRuta'
  | 'ruedasRuta'
  | 'manubrioRuta'
  | 'horquillaRuta'
  | 'pedalesRuta'
  | 'pinonesRuta'
  | 'cadenaRuta'
  | 'platoRuta'
  | 'sillinRuta'
  | 'frenosRuta'
  | 'piñonRuta'

  // 🔹 Fixie
  | 'cuadroFixie'
  | 'ruedasFixie'
  | 'manubrioFixie'
  | 'pedalesFixie'
  | 'piñonFixie'
  | 'cadenaFixie'
  | 'platoFixie'
  | 'sillinFixie'
  | 'frenosFixie'
  | 'ruedas'
  ;
  
export type ComponenteData = {nombre: string; imagen: any; comoColocar: string[]; informacion: { utilidad: string; mantenimiento: string; }; herramientas: string[]; };
export type StackParamList = {
  
  Presentacion: undefined;
  Registro: undefined;
  InicioSesion: undefined;
  RestablecerContraseña: undefined;

  Carrusel: undefined;
  MTB: { tipoBicicleta: string };
  Ruta: { tipoBicicleta: string };
  Fija: { tipoBicicleta: string };
  
  Publicar: undefined;
  Carrito: undefined;
  Notificaciones: undefined;


  FiltroAdmin: undefined;
  Administrador: undefined;
  InformacionUsuarioAdmin: {usuario: Usuario};
  PublicacionesAdmin: {ID_usuario : number};
  DetallePublicacionAdmin: { publicacion: Publicacion; id: number; }
  
  DetallePublicacion: { publicacion: Publicacion, id_vendedor: number};
  ComponenteDetalle: { componenteId: ComponenteId, tipoBicicleta: string };
  ChatGPT: undefined;
  PublicacionesRelacionadasVendedor: {id_vendedor: number};
  
  
  Perfil: undefined;
  EditarPerfil: { usuario: Usuario }; 
  CambiarContrasena:  { usuario: Usuario }; 
  PublicacionesUsuarioLogueado: undefined;
  DetallePublicacionLogueado: { publicacion: Publicacion; id: number; };
  Contactenos:undefined;
};

export interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
  id_vendedor: number;
}
export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  foto: string;
}


export interface Publicacion {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  fotos: string[];
  nombre_vendedor: string;
  telefono: string
  foto:string;
  id_vendedor: number;

}

export type RegistroScreenNavigationProp =RouteProp<StackParamList, 'Registro'>;
export type InicioSesionScreenNavigationProp = RouteProp<StackParamList, 'InicioSesion'>;

export type CarruselScreenNavigationProp = RouteProp<StackParamList, 'Carrusel'>;
export type MTBScreenRouteProp = RouteProp<StackParamList, 'MTB'>;
export type RutaScreenRouteProp = RouteProp<StackParamList, 'Ruta'>;
export type FijaScreenRouteProp = RouteProp<StackParamList, 'Fija'>;

export type PublicarScreenNavigationProp = RouteProp<StackParamList, 'Publicar'>;
export type NotificacionesScreenNavigationProp = RouteProp<StackParamList, 'Notificaciones'>;
export type CarritoScreenNavigationProp = RouteProp<StackParamList, 'Carrito'>;

export type ChatGPTScreenNavigationProp = RouteProp<StackParamList, 'ChatGPT'>;
export type DetallePublicacionScreenNavigationProp = RouteProp<StackParamList, 'DetallePublicacion'>;
export type ComponenteDetalleScreenNavigationProp = RouteProp<StackParamList, 'ComponenteDetalle'>;

export type FiltroAdminScreenNavigationProp = RouteProp<StackParamList, 'FiltroAdmin'>
export type AdministradorScreenNavigationProp = RouteProp<StackParamList, 'Administrador'>;
export type InformacionUsuarioAdminScreenNavigationProp = RouteProp<StackParamList, 'InformacionUsuarioAdmin'>;
export type PublicacionesAdminScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesAdmin'>;
export type DetallePublicacionAdminScreenNavigationProp = RouteProp<StackParamList, 'DetallePublicacionAdmin'>;
export type PublicacionesRelacionadasVendedoScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesRelacionadasVendedor'>;

export type PerfilScreenNavigationProp = RouteProp<StackParamList, 'Perfil'>;
export type EditarPerfilScreenNavigationProp = RouteProp<StackParamList, 'EditarPerfil'>;
export type PublicacionesUsuarioLogueadoScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesUsuarioLogueado'>;
export type DetallePublicacionLogueadoScreenNavigationProp = RouteProp<StackParamList, 'DetallePublicacionLogueado'>;