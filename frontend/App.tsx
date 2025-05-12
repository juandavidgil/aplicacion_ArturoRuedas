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
        <Stack.Screen name="Carrusel" component={CarruselPantalla} />
        <Stack.Screen name="MTB" component={MTBPantalla} />
        <Stack.Screen name="Ruta" component={RutaPantalla} />
        <Stack.Screen name="Fija" component={FijaPantalla} />
        <Stack.Screen name="Publicar" component={PublicarPantalla} />
        <Stack.Screen name="Carrito" component={CarritoPantalla} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;