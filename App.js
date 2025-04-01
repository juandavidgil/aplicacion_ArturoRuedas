import { ImageBackground, View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Animated } from 'react-native';
import {LinearGradient} from "expo-linear-gradient"
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Background } from '@react-navigation/elements';



//-----------------------------CONSTANTES---------------------------------------------------------------//


//-----------------------------FUNCIONES Y PANTALLAS---------------------------------------------------------------//

//-----------------------------PANTALLA PRESENTACION-----------------------------------------------//
const image = { uri: 'https://cdn.leonardo.ai/users/ec93ea68-428d-4597-b04a-4c97d668081f/generations/a39d4587-7a1c-4782-81d8-f71744017f3a/Leonardo_Phoenix_Four_distinct_bicycle_wheels_a_sleek_narrow_3.jpg?w=512' };

function PresentacionPantalla() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerPresentacion} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.tituloPresentacion}>ARTURO RUEDAS</Text>
          <View style={styles.containerBotonesPresenatacion}>
            <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate('InicioSesion')}>
              <Text>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate('Registro')}>
              <Text>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//------------------------PANTALLA REGISTRO--------------------------------------------------------//
function RegistroPantalla() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const presionarBotonRegistro = () => {
    console.log('Nombre:', nombre);
    console.log('Telefono:', telefono);
    console.log('Correo:', correo);
    console.log('Contraseña:', contraseña);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>REGISTRARSE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TouchableOpacity style={styles.BotonSesion} title="Registrarse" onPress={presionarBotonRegistro}>
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

//-----------------------------------PANTALLA INICIO SESION--------------------------------------------//
function InicioSesionPantalla() {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const presionarBotonSesion = () => {
    console.log('Correo:', correo);
    console.log('Contraseña:', contraseña);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>INICIAR SESION</Text>
      <TextInput
        style={styles.input}
        placeholder='Correo Electronico'
        keyboardType='email-address'
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TouchableOpacity style={styles.BotonSesion} onPress={presionarBotonSesion}>
        <Text>Iniciar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
}


//-----------------------------------PANTALLA CARRUSEL-----------------------------------------------------------//
const { width, height } = Dimensions.get("window");
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

// Asegúrate de que las rutas de las imágenes son correctas
const imagenes = [
  {id: 1, url: require('./img/carruselMTB.jpg'), title: 'MTB', destino: 'MTB'},
  {id: 2, url: require('./img/carruselRuta.jpg'), title: 'Ruta', destino: 'Ruta'},
  {id: 3, url: require('./img/carruselFIJA.jpg'), title: 'Fija', destino: 'Fija'},
];

function BackDrop({ scrollX }) {
  return (
    <View style={[StyleSheet.absoluteFillObject, { height: ALTURA_BACKDROP, width, top: 0 }]}>
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.Image
            key={imagen.id.toString()}
            source={imagen.url}  
            blurRadius={10} //opacidad de la imagen de fondo pa que miremos como queda mejor
            style={[
              StyleSheet.absoluteFillObject,
              { height: ALTURA_BACKDROP, width, opacity },
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }}
      />
    </View>
  );
}

function CarruselPantalla() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.ContenedorCarrusel}>
      <BackDrop scrollX={scrollX} />
      <StatusBar hidden />
      <Text style={styles.elige_tipo}>ELIGE TU ESTILO</Text>
      <Animated.FlatList
        data={imagenes}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingTop: 250, 
          paddingHorizontal: ESPACIO_LATERAL,
          paddingBottom: 40 
        }}
        snapToInterval={ANCHO_CONTENEDOR + ESPACIO}
        decelerationRate="fast" //si lo ven muy rapido lo podemos quitar
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -75, 0],
          });

          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 55,
                  backgroundColor: "white",
                  alignItems: "center",
                  transform: [{ translateY }],
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <TouchableOpacity 
                  onPress={() => navigation.navigate(item.destino)}
                  activeOpacity={0.9}
                  style={{width: '100%', alignItems: 'center'}}
                >
                  <Image 
                    source={item.url} 
                    style={styles.posterImage} 
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
//----------------------------------MTB PANTALLA-------------------------------------------------------//
function MTBPantalla(){
  return(
    <Text>
      soy la pantalla de mtb
    </Text>
  )
}
//----------------------------------Ruta PANTALLA-------------------------------------------------------//
function RutaPantalla(){
  return(
    <Text>
      soy la pantalla de Ruta
    </Text>
  )
}
//----------------------------------Fija PANTALLA-------------------------------------------------------//
function FijaPantalla(){
  return(
    <Text>
      soy la pantalla de Fija
    </Text>
  )
}

//-----------------------------------FUNCION PARA MOSTRAR PANTALLAS-------------------------------------//
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Carrusel">
      <Stack.Screen name="Presentacion" component={PresentacionPantalla} options={{ title: "Presentacion" }} />
      <Stack.Screen name="Registro" component={RegistroPantalla} options={{ title: "Registro" }} />
      <Stack.Screen name="InicioSesion" component={InicioSesionPantalla} options={{ title: 'inicio sesion' }} />
      <Stack.Screen name='Carrusel' component={CarruselPantalla} options={{ title: 'Carrusel' }} />
      <Stack.Screen name='MTB' component={MTBPantalla} options={{title: 'MTB'}}/>
      <Stack.Screen name='Ruta' component={RutaPantalla} options={{title: 'Ruta'}}/>
      <Stack.Screen name='Fija' component={FijaPantalla} options={{title: 'Fija'}}/>
    </Stack.Navigator>
  );
}

//--------------------ESTO VEMOS EN PANTALLA---------------------------------------------------------------//
export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

//-------------------  ESTILOS-------------------------------------------------------------------------------//    
const styles = StyleSheet.create({
  //pantalla presentacion
  containerPresentacion: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D0D0D0'
  },
  image: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
  },
  tituloPresentacion: {
    fontSize: 30,
    color: 'white',
    marginBottom: 80,
    marginTop: 30,
    marginLeft: 80,
    fontWeight: '900',
  },
  containerBotonesPresenatacion: {
    padding: 50,
    marginTop: 400,
    marginLeft: 40,
  },

  //pantalla registro e inicio de sesion
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#D0D0D0'
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 15,
    paddingBottom: 50,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 30,
    color: 'white',
    marginBottom: 80,
    marginTop: 20,
    marginLeft: 60,
    fontWeight: '900',
  },
  Boton: {
    alignItems: 'center',
    margin: 10,
    width: 210,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  BotonSesion: {
    alignItems: 'center',
    margin: 10,
    marginLeft: 70,
    width: 210,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },

  //carrusel
  ContenedorCarrusel: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  elige_tipo: {
    fontSize: 35,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  posterImage: {
    width: ANCHO_CONTENEDOR * 0.9,
    height: ANCHO_CONTENEDOR * 1.2,
    borderRadius: 40,
    margin: 0,
  },

});


