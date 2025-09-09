import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types/types';

import PresentacionPantalla from './components/inicio de sesion/PresentacionPantalla';
import RegistroPantalla from './components/inicio de sesion/RegistroPantalla';
import InicioSesionPantalla from './components/inicio de sesion/InicioSesionPantalla';
import RestablecerContraseñaPantalla from './components/inicio de sesion/RestablecerContraseñaPantalla';

import CarruselPantalla from './components/bicicletas/CarruselPantalla';
import MTBPantalla from './components/bicicletas/MTBPantalla';
import RutaPantalla from './components/bicicletas/RutaPantalla';
import FijaPantalla from './components/bicicletas/FijaPantalla';

import PublicarPantalla from './components/funciones barra/PublicarPantalla';
import CarritoPantalla from './components/funciones barra/CarritoPantalla';
import NotificacionesPantalla from './components/funciones barra/NotificacionesPantalla';

import FiltroAdminPantalla from './components/administrador/FiltroAdmin';
import Administrador from './components/administrador/Administrador';
import InformacionUsuarioAdmin from './components/administrador/InformacionUsuarioAdmin';
import PublicacionesAdmin from './components/administrador/PublicacionesAdmin';
import DetallePublicacionAdmin from './components/administrador/DetallePublicacionAdmin';

import PerfilPantalla from './components/funciones barra/perfil';
import PublicacionesUsuarioLogueado from './components/perfil/PublicacionesUsuarioLogueadoPantalla';
import DetallePublicacionLogueado from './components/perfil/DetallePublicacionLogueado';

import ChatGPT from './components/detalle y publicaciones/ChatgptPantalla';
import DetallePublicacion from './components/detalle y publicaciones/DetallePublicacion';
import ComponenteDetallePantalla from './components/detalle y publicaciones/ComponenteDetalladoPantalla';


const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Presentacion" 
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Presentacion" component={PresentacionPantalla} />
        <Stack.Screen name="Registro" component={RegistroPantalla} />
        <Stack.Screen name="InicioSesion" component={InicioSesionPantalla} />
        <Stack.Screen name="RestablecerContraseña" component={RestablecerContraseñaPantalla} />

        <Stack.Screen name="Carrusel" component={CarruselPantalla} />
        <Stack.Screen name="MTB" component={MTBPantalla} />
        <Stack.Screen name="Ruta" component={RutaPantalla} />
        <Stack.Screen name="Fija" component={FijaPantalla} />

        <Stack.Screen name="Publicar" component={PublicarPantalla} />
        <Stack.Screen name="Carrito" component={CarritoPantalla} />
        <Stack.Screen name= "Notificaciones" component={NotificacionesPantalla}/>

        <Stack.Screen name='ChatGPT' component={ChatGPT}/>
        <Stack.Screen name='DetallePublicacion' component={DetallePublicacion}/>
        <Stack.Screen name="ComponenteDetalle" component={ComponenteDetallePantalla}/>

        <Stack.Screen name='FiltroAdmin' component={FiltroAdminPantalla}/>
        <Stack.Screen name='Administrador' component={Administrador}/>
        <Stack.Screen name='InformacionUsuarioAdmin' component={InformacionUsuarioAdmin}/>
        <Stack.Screen name='PublicacionesAdmin' component={PublicacionesAdmin}/>
        <Stack.Screen name='DetallePublicacionAdmin' component={DetallePublicacionAdmin}/>
        
        <Stack.Screen name='Perfil' component={PerfilPantalla}/>
        <Stack.Screen name='PublicacionesUsuarioLogueado' component={PublicacionesUsuarioLogueado}/>
        <Stack.Screen name='DetallePublicacionLogueado' component={DetallePublicacionLogueado}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


