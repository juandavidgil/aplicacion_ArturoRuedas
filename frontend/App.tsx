
import React, { useRef, useState } from 'react';
import {
  ImageBackground, View, TextInput, Text, StyleSheet,
  TouchableOpacity, FlatList, Image, Dimensions, Animated
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

//------------------------------------ TIPOS ----------------------------------------//
type StackParamList = {
  Presentacion: undefined;
  Registro: undefined;
  InicioSesion: undefined;
  Carrusel: undefined;
  MTB: undefined;
  Ruta: undefined;
  Fija: undefined;
};

type Navigation = NativeStackNavigationProp<StackParamList>;

type ImagenItem = {
  id: number;
  url: any; // o ImageSourcePropType
  title: string;
  destino: keyof StackParamList;
};

type BackDropProps = {
  scrollX: Animated.Value;
};

//------------------------------------ CONSTANTES ----------------------------------------//
const { width, height } = Dimensions.get("window");
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

const imagenes: ImagenItem[] = [
  { id: 1, url: require('./img/carruselMTB.jpg'), title: 'MTB', destino: 'MTB' },
  { id: 2, url: require('./img/carruselRuta.jpg'), title: 'Ruta', destino: 'Ruta' },
  { id: 3, url: require('./img/carruselFIJA.jpg'), title: 'Fija', destino: 'Fija' },
];

//------------------------------------ PRESENTACION ----------------------------------------//

const PresentacionPantalla: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const image = { uri: 'https://cdn.leonardo.ai/users/ec93ea68-428d-4597-b04a-4c97d668081f/generations/a39d4587-7a1c-4782-81d8-f71744017f3a/Leonardo_Phoenix_Four_distinct_bicycle_wheels_a_sleek_narrow_3.jpg?w=512'};

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
};
//-------------------------------------------REGISTRARSE---------------------------------------------------------------------//
const RegistroPantalla: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');

  const presionarBotonRegistro = async () => {
    console.log({ nombre, correo, contraseña, telefono });
  
    try {
      const response = await fetch('http://192.168.101.85:3001/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre,correo, contraseña, telefono }),
      });
  
      const data = await response.json();
      console.log(data);
      alert(data.mensaje || 'Registro completado');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema al registrar');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>REGISTRARSE</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={contraseña} onChangeText={setContraseña} />
      <TextInput style={styles.input} placeholder="Telefono" value={telefono} onChangeText={setTelefono} />
      <TouchableOpacity style={styles.BotonSesion} onPress={presionarBotonRegistro}>
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};
//------------------------------------------------INICIAR SESION-----------------------------------------------------------------//
const InicioSesionPantalla: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const presionarBotonSesion = () => {
    console.log({ correo, contraseña });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>INICIAR SESION</Text>
      <TextInput style={styles.input} placeholder="Correo Electronico" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={contraseña} onChangeText={setContraseña} />
      <TouchableOpacity style={styles.BotonSesion} onPress={presionarBotonSesion}>
        <Text>Iniciar Sesion</Text>
      </TouchableOpacity>
    </View>
  );
};
//-----------------------------------------------CARRUSEL------------------------------------------------------------------------------
const BackDrop: React.FC<BackDropProps> = ({ scrollX }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { height: ALTURA_BACKDROP, width, top: 0 }]}>
      {imagenes.map((imagen, index) => {
        const inputRange = [(index - 1) * ANCHO_CONTENEDOR, index * ANCHO_CONTENEDOR, (index + 1) * ANCHO_CONTENEDOR];
        const opacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0] });

        return (
          <Animated.Image
            key={imagen.id.toString()}
            source={imagen.url}
            blurRadius={10}
            style={[StyleSheet.absoluteFillObject, { height: ALTURA_BACKDROP, width, opacity }]}
          />
        );
      })}
      <LinearGradient colors={["transparent", "white"]} style={{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }} />
    </View>
  );
};

const CarruselPantalla: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<Navigation>();

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
        contentContainerStyle={{ paddingTop: 250, paddingHorizontal: ESPACIO_LATERAL, paddingBottom: 40 }}
        snapToInterval={ANCHO_CONTENEDOR + ESPACIO}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * ANCHO_CONTENEDOR, index * ANCHO_CONTENEDOR, (index + 1) * ANCHO_CONTENEDOR];
          const translateY = scrollX.interpolate({ inputRange, outputRange: [0, -75, 0] });

          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: 5,
                  borderRadius: 50,
                  backgroundColor: "white",
                  alignItems: "center",
                  transform: [{ translateY }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate(item.destino)} activeOpacity={0.9}>
                  <Image source={item.url} style={styles.posterImage} resizeMode="cover" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const MTBPantalla: React.FC = () => <Text>soy la pantalla de mtb</Text>;
const RutaPantalla: React.FC = () => <Text>soy la pantalla de Ruta</Text>;
const FijaPantalla: React.FC = () => <Text>soy la pantalla de Fija</Text>;

//------------------------------------ DEFINICION DE PANTALLAS ----------------------------------------//
const Stack = createNativeStackNavigator<StackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Presentacion">
      <Stack.Screen name="Presentacion" component={PresentacionPantalla} />
      <Stack.Screen name="Registro" component={RegistroPantalla} />
      <Stack.Screen name="InicioSesion" component={InicioSesionPantalla} />
      <Stack.Screen name="Carrusel" component={CarruselPantalla} />
      <Stack.Screen name="MTB" component={MTBPantalla} />
      <Stack.Screen name="Ruta" component={RutaPantalla} />
      <Stack.Screen name="Fija" component={FijaPantalla} />
    </Stack.Navigator>
  );
};

//------------------------------------ FUNCION QUE MUESTRA LAS PANTALLAS----------------------------------------//
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


