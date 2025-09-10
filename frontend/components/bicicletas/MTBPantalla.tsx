import React, { Suspense, useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert, ScrollView, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../types/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Canvas } from '@react-three/fiber';
import Model from '../../codigos modelos/mtb';
import useControls from 'r3f-native-orbitcontrols';
import { OrbitControls } from '@react-three/drei';
import { URL } from '../../config/UrlApi';

interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;
  telefono: string;
}

type RouteParams = {
  tipoBicicleta: string;
};

const { width, height } = Dimensions.get('window');

const MTBPantalla: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const route = useRoute();
  const { tipoBicicleta } = route.params as RouteParams;

  // 🔹 Búsqueda automática en tiempo real con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (busqueda.trim() !== '') {
        buscarArticulos(busqueda);
      } else {
        setArticulos([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [busqueda]);

  const buscarArticulos = async (texto: string) => {
    if (texto.trim() === '') return;
    setCargando(true);
    try {
      const response = await fetch(
        `${URL}buscar?nombre=${encodeURIComponent(texto)}&tipo=${tipoBicicleta}`
      );

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      console.log('Respuesta backend buscar:', data);

      const resultados: Articulo[] = Array.isArray(data)
        ? data
        : Array.isArray(data.articulos)
        ? data.articulos
        : [];

      const articulosValidos = resultados.filter(
        (articulo) =>
          articulo.id &&
          articulo.tipo_bicicleta.toLowerCase() === tipoBicicleta.toLowerCase()
      );

      setArticulos(articulosValidos);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
      setArticulos([]);
    } finally {
      setCargando(false);
    }
  };

  const AgregarCarrito = async (articulo: Articulo) => {
    try {
      const usuarioStr = await AsyncStorage.getItem('usuario');
      if (!usuarioStr) {
        Alert.alert('Error', 'Debes iniciar sesión primero');
        navigation.navigate('InicioSesion');
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario;

      if (!ID_usuario) throw new Error('No se pudo obtener el ID de usuario');
      if (!articulo.id) throw new Error('El artículo no tiene ID definido');

      const response = await fetch(`${URL}agregar-carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ID_usuario: ID_usuario,
          ID_publicacion: articulo.id,
        }),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.error || 'Error al agregar al carrito');

      Alert.alert('Éxito', 'Artículo agregado al carrito');
    } catch (error) {
      console.error('Error completo en AgregarCarrito:', error);
      Alert.alert('Error al agregar al carrito');
    }
  };

  const [OrbitControlsCmp, events] = useControls();

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <View style={styles.headerWrapper}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>MTB (Mountain Bike)</Text>
          </View>

          {/* 🔹 Barra de búsqueda */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar artículos..."
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <TouchableOpacity
              onPress={() => buscarArticulos(busqueda)}
              style={styles.searchButton}
            >
              <Ionicons name="search-outline" size={22} color="#000000ff" />
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerMTB}>
            {cargando ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ marginTop: 20 }}
              />
            ) : (
              <>
                {articulos.length > 0 ? (
                  <FlatList
                    data={articulos}
                    keyExtractor={(item, index) =>
                      item?.id?.toString() || index.toString()
                    }
                    contentContainerStyle={{ paddingBottom: 250, marginTop: 20 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetallePublicacion', {
                            publicacion: item,
                          })
                        }
                      >
                        <View style={styles.cardMTB}>
                          <Image
                            source={{ uri: item.foto }}
                            style={styles.imagenMTB}
                            resizeMode="cover"
                          />
                          <View style={styles.infoMTB}>
                            <Text style={styles.nombreMTB}>
                              {item.nombre_articulo}
                            </Text>
                            <Text style={styles.descripcionMTB}>
                              {item.descripcion}
                            </Text>
                            <Text style={styles.precioMTB}>
                              Precio: ${item.precio}
                            </Text>
                            <Text>Tipo: {item.tipo_bicicleta}</Text>
                            <Text style={styles.descripcionMTB}>
                              Vendedor: {item.nombre_vendedor}
                            </Text>
                            <TouchableOpacity
                              onPress={() => AgregarCarrito(item)}
                            >
                              <Ionicons name="cart-outline" size={25} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                ) : busqueda.trim() !== '' ? (
                  <Text style={{ marginTop: 20, textAlign: 'center' }}>
                    No se encontraron artículos
                  </Text>
                ) : (
                  <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 80 }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginBottom: 10,
                        fontSize: 16,
                        lineHeight: 22,
                        color: '#ffffffff',
                        fontWeight: '500',
                        paddingHorizontal: 16,
                      }}
                    >
                      Es un tipo de bicicleta diseñada para ser utilizada en
                      terrenos accidentados y sin pavimentar, como senderos,
                      caminos de tierra, colinas y montañas.
                    </Text>

                    <View style={styles.screen}>
                      <View
                        style={styles.card}
                        {...events}
                        onStartShouldSetResponder={() => {
                          setScrollEnabled(false);
                          return true;
                        }}
                        onResponderRelease={() => {
                          setScrollEnabled(true);
                        }}
                        pointerEvents="box-none"
                      >
                        <Canvas>
                          <OrbitControlsCmp enablePan={false} />
                          <ambientLight intensity={0.6} />
                          <directionalLight position={[1, 0, 0]} intensity={1.5} />
                          <directionalLight position={[-1, 0, 0]} intensity={1.5} />
                          <directionalLight position={[0, 1, 0]} intensity={1.5} />
                          <directionalLight position={[0, -1, 0]} intensity={1.5} />
                          <directionalLight position={[0, 0, 1]} intensity={1.5} />
                          <directionalLight position={[0, 0, -1]} intensity={1.5} />
                          <Suspense fallback={null}>
                            <Model />
                          </Suspense>
                        </Canvas>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </SafeAreaView>

        {/* 🔹 Barra inferior e iconos de navegación */}
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
            <Ionicons name="storefront-outline" size={28} color="#ffffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
            <Ionicons name="cart-outline" size={28} color="#ffffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Ionicons name="notifications-outline" size={28} color="#ffffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="#f3ffffff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}
          >
            <Ionicons
              name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'}
              size={28}
              color="#ffffffff"
            />
          </TouchableOpacity>
        </View>

        {/* 🔹 Barra de componentes */}
        {mostrarBarraComponentes && (
          <View style={styles.barraComponentes}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'ruedas',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/rueda.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'manubrio',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/manubrio.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'suspension',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/suspension.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'marco',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/marco.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'cadena',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/cadena.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'piñon',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/piñon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'plato',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/plato.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ComponenteDetalle', {
                    componenteId: 'pedal',
                    tipoBicicleta,
                  })
                }
              >
                <Image
                  style={styles.iconoComponentes}
                  resizeMode="cover"
                  source={require('../../iconos/pedal.png')}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </SafeAreaProvider>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerMTB: {
    flex: 1,
    padding: 16,
    marginTop: 0,
  },
  headerWrapper: {
    width: '100%',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#004f4d',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingBottom: height * 0.02,
    marginBottom: height * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 5,
    marginTop: height * 0.02,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.08,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  searchButton: {
    backgroundColor: '#20eb4ca4',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMTB: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffffff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imagenMTB: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  infoMTB: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  nombreMTB: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcionMTB: {
    fontSize: 14,
    color: '#666',
  },
  precioMTB: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c7a7b',
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    maxWidth: 350,
    aspectRatio: 10 / 12,
    overflow: 'hidden',
    marginTop: 15,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.015,
    backgroundColor: '#004f4d',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    paddingBottom: '7%',
  },
  iconoComponentes: {
    width: 35,
    height: 35,
    marginHorizontal: 15,
  },
  barraComponentes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: '#004f4d',
    borderRadius: 30,
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
});

export default MTBPantalla;
