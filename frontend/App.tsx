import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types/types';

import PresentacionPantalla from './components/PresentacionPantalla';
import RegistroPantalla from './components/RegistroPantalla';
import InicioSesionPantalla from './components/InicioSesionPantalla';
import RestablecerContraseñaPantalla from './components/RestablecerContraseñaPantalla';

import CarruselPantalla from './components/CarruselPantalla';
import MTBPantalla from './components/MTBPantalla';
import RutaPantalla from './components/RutaPantalla';
import FijaPantalla from './components/FijaPantalla';

import PublicarPantalla from './components/PublicarPantalla';
import CarritoPantalla from './components/CarritoPantalla';
import NotificacionesPantalla from './components/NotificacionesPantalla';

import FiltroAdminPantalla from './components/FiltroAdmin';
import Administrador from './components/Administrador';
import PublicacionesAdmin from './components/PublicacionesAdmin';
import DetallePublicacionAdmin from './components/DetallePublicacionAdmin';

import PerfilPantalla from './components/perfil';
import PublicacionesUsuarioLogueado from './components/PublicacionesUsuarioLogueadoPantalla';
import DetallePublicacionLogueado from './components/DetallePublicacionLogueado';

import ChatGPT from './components/ChatgptPantalla';
import DetallePublicacion from './components/DetallePublicacion';
import ComponenteDetallePantalla from './components/ComponenteDetalladoPantalla';

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

        <Stack.Screen name='Administrador' component={Administrador}/>
        <Stack.Screen name='FiltroAdmin' component={FiltroAdminPantalla}/>
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


