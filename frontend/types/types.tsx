import { RouteProp } from '@react-navigation/native';


export type ComponenteId = 'ruedas' | 'frenos' | 'marco' | 'sillin' | 'manubrio' | 'pedal';


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
  PublicacionesAdmin: undefined;
  FiltroAdmin: undefined;
  ComponenteDetalle: { componenteId: ComponenteId };
  ComponenteDetallePantalla2: undefined;
  ComponenteDetallePantalla3: undefined;
  ComponenteDetallePantalla4: undefined;
  DetallePublicacion:undefined;
  
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
export interface Usuario {
ID_usuario: number;
nombre: string;
correo: string;
telefono: string
}

export interface Publicacion {
  ID_publicacion: number;
  nombre_Articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;

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
export type FiltroAdminScreenNavigationProp = RouteProp<StackParamList, 'FiltroAdmin'>
export type AdministradorScreenNavigationProp = RouteProp<StackParamList, 'Administrador'>;
export type PublicacionesAdminScreenNavigationProp = RouteProp<StackParamList, 'PublicacionesAdmin'>;
export type ComponenteDetalleScreenNavigationProp = RouteProp<StackParamList, 'ComponenteDetalle'>;
export type ComponenteDetalle2ScreenNavigationProp = RouteProp<StackParamList, 'ComponenteDetallePantalla2'>;
export type ComponenteDetalleS3creenNavigationProp = RouteProp<StackParamList, 'ComponenteDetallePantalla3'>;
export type ComponenteDetalleS4creenNavigationProp = RouteProp<StackParamList, 'ComponenteDetallePantalla4'>;
export type DetallePublicacioncreenNavigationProp = RouteProp<StackParamList, 'DetallePublicacion'>;