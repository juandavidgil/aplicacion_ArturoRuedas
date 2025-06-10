import { RouteProp } from '@react-navigation/native';

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
 ChatPrivado: {
    chatId: number | null;
    idOtroUsuario: number;
    nombreOtroUsuario: string;
  };
  RestablecerContraseña: undefined;
  MODELO3d: undefined
  Administrador: undefined;
  PublicacionesAdmin: undefined
};

export interface Articulo {
  ID_publicacion: number;
  nombre_Articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
  ID_usuario: number;
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
export type ChatPrivadoScreenNavigationProp = RouteProp<StackParamList, 'ChatPrivado'>;
export type CarritoScreenNavigationProp = RouteProp<StackParamList, 'Carrito'>;
export type ProductVideoCardScreenNavigationProp = RouteProp<StackParamList, 'MODELO3d'>;
export type AdministradorScreenNavigationProp = RouteProp<StackParamList, 'Administrador'>;
export type PublicacionesAdminScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesAdmin'>;