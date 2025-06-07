import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PresentacionPantalla from './components/PresentacionPantalla';
import RegistroPantalla from './components/RegistroPantalla';
import InicioSesionPantalla from './components/InicioSesionPantalla';
import CarruselPantalla from './components/CarruselPantalla';
import MTBPantalla from './components/MTBPantalla';
import RutaPantalla from './components/RutaPantalla';
import FijaPantalla from './components/FijaPantalla';
import PublicarPantalla from './components/PublicarPantalla';
import CarritoPantalla from './components/CarritoPantalla';
import { StackParamList } from './types/types';
import RestablecerContraseñaPantalla from './components/RestablecerContraseñaPantalla';
import ChatPantalla from './components/ChatPantalla';
import NotificacionesPantalla from './components/NotificacionesPantalla';
import ProductVideoCard from './components/MODELO3d';
import ChatPrivadoPantalla from './components/ChatPrivadoPantalla';
import Administrador from './components/Administrador';



const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Administrador" 
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
        <Stack.Screen name= "Chat" component={ChatPantalla}/>
        <Stack.Screen name='ChatPrivado' component={ChatPrivadoPantalla}/>
        <Stack.Screen name= "Notificaciones" component={NotificacionesPantalla}/>
        <Stack.Screen name= "MODELO3d" component={ProductVideoCard}/>
       
        <Stack.Screen name='Administrador' component={Administrador}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;