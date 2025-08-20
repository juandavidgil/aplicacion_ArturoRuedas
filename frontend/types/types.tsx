import { RouteProp } from '@react-navigation/native';



export type ComponenteId = 'ruedas' | 'suspension' |'frenos' | 'marco' | 'sillin' | 'manubrio' | 'pedal';

export type ComponenteData = {
  nombre: string;
  imagen: any; // o ImageSourcePropType si usas React Native y quieres mayor control
  comoColocar: string[];
  informacion: {
    utilidad: string;
    mantenimiento: string;
  };
  herramientas: string[]; // ✅ importante para solucionar tu error
};


export type StackParamList = {
  Presentacion: undefined;
  Registro: undefined;
  InicioSesion: undefined;
  Carrusel: undefined;
  MTB: { tipoBicicleta: string };
  Ruta: { tipoBicicleta: string };
  Fija: { tipoBicicleta: string };
  Publicar: undefined;
  Carrito: undefined;
  DetalleArticulo: { articulo: Articulo };
  Notificaciones: undefined;
   Chat: undefined;
/*  ChatPrivado: {
    chatId: number | null;
    idOtroUsuario: number;
    nombreOtroUsuario: string;
  }; */
  RestablecerContraseña: undefined;
  Administrador: undefined;
  PublicacionesAdmin: {ID_usuario : number};
  FiltroAdmin: undefined;
  ComponenteDetalle: { componenteId: ComponenteId };
  DetallePublicacion: { publicacion: Publicacion };
  Perfil: undefined
  PublicacionesUsuarioLogueado: undefined;
};

export interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
  ID_usuario: number;
}
export interface Usuario {
ID_usuario: number;
nombre: string;
correo: string;
telefono: string
}

export interface Publicacion {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;
  telefono: string

}





// Tipos para las rutas
export type MTBScreenRouteProp = RouteProp<StackParamList, 'MTB'>;
export type RutaScreenRouteProp = RouteProp<StackParamList, 'Ruta'>;
export type FijaScreenRouteProp = RouteProp<StackParamList, 'Fija'>;
export type DetalleArticuloRouteProp = RouteProp<StackParamList, 'DetalleArticulo'>;
export type RegistroScreenNavigationProp =RouteProp<StackParamList, 'Registro'>;
export type InicioSesionScreenNavigationProp = RouteProp<StackParamList, 'InicioSesion'>;
export type CarruselScreenNavigationProp = RouteProp<StackParamList, 'Carrusel'>;
export type PublicarScreenNavigationProp = RouteProp<StackParamList, 'Publicar'>;
export type NotificacionesScreenNavigationProp = RouteProp<StackParamList, 'Notificaciones'>;
export type ChatScreenNavigationProp = RouteProp<StackParamList, 'Chat'>;
/* export type ChatPrivadoScreenNavigationProp = RouteProp<StackParamList, 'ChatPrivado'>; */
export type CarritoScreenNavigationProp = RouteProp<StackParamList, 'Carrito'>;
export type FiltroAdminScreenNavigationProp = RouteProp<StackParamList, 'FiltroAdmin'>
export type AdministradorScreenNavigationProp = RouteProp<StackParamList, 'Administrador'>;
export type PublicacionesAdminScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesAdmin'>;
export type ComponenteDetalleScreenNavigationProp = RouteProp<StackParamList, 'ComponenteDetalle'>;
export type DetallePublicacioncreenNavigationProp = RouteProp<StackParamList, 'DetallePublicacion'>;
export type PerfilScreenNavigationProp = RouteProp<StackParamList, 'Perfil'>;
export type PublicacionesUsuarioLogueadoScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesUsuarioLogueado'>;
