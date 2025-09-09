import React, { useRef } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  Dimensions, Animated, SafeAreaView, StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/types';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

type TipoBicicleta = 'Mtb' | 'Ruta' | 'Fija';
type RutasBicicletas = 'MTB' | 'Ruta' | 'Fija';

type ImagenItem = {
  id: number;
  url: any;
  titulo: string;
  destino: RutasBicicletas;
  tipoBicicleta: TipoBicicleta;
};

const imagenes: ImagenItem[] = [
  { id: 1, url: require('../../img/carruselMTB.png'), titulo: 'MTB', destino: 'MTB', tipoBicicleta: 'Mtb' },
  { id: 2, url: require('../../img/carruselRUTA.png'), titulo: 'Ruta', destino: 'Ruta', tipoBicicleta: 'Ruta' },
  { id: 3, url: require('../../img/carruselFIJA.png'), titulo: 'Fija', destino: 'Fija', tipoBicicleta: 'Fija' },
];

const BackDrop: React.FC<{ scrollX: Animated.Value }> = ({ scrollX }) => {
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
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const manejarPresion = (destino: RutasBicicletas, tipoBicicleta: TipoBicicleta) => {
    navigation.navigate(destino, { tipoBicicleta });
  };

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
                  backgroundColor: "#006D77",
                  alignItems: "center",
                  transform: [{ translateY }],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <TouchableOpacity onPress={() => manejarPresion(item.destino, item.tipoBicicleta)} activeOpacity={0.9}>
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

const styles = StyleSheet.create({
  ContenedorCarrusel: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  elige_tipo: {
    fontSize: 35,
    fontWeight: '900',
    marginTop: 100,
    marginBottom: 10,
    color: '#ffffffff',
  },
  posterImage: {
    width: ANCHO_CONTENEDOR * 0.9,
    height: ANCHO_CONTENEDOR * 1.2,
    borderRadius: 40,
    margin: 0,
  },
});

export default CarruselPantalla;