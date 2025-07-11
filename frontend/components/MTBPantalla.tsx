 import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert, ScrollView,
  Touchable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Video, ResizeMode } from 'expo-av';
import { constants } from 'buffer';

interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;
}

const MTBPantalla: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(false);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const buscarArticulos = async () => {
    if (busqueda.trim() === '') return;
    setCargando(true);
    try {
      const response = await fetch(`http://10.0.2.2:3001/buscar?nombre=${encodeURIComponent(busqueda)}`);
      const data: Articulo[] = await response.json();
      setArticulos(data);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
    } finally {
      setCargando(false);
    }
  };

  const AgregarCarrito = async (articulo: Articulo) => {
  try {
    console.log('Artículo recibido:', articulo); // Verifica que el artículo tenga el ID
    
    const usuarioStr = await AsyncStorage.getItem('usuario');
    if (!usuarioStr) {
      Alert.alert('Error', 'Debes iniciar sesión primero');
      navigation.navigate('InicioSesion');
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    const ID_usuario = usuario.ID_usuario;

    if (!ID_usuario) {
      throw new Error('No se pudo obtener el ID de usuario');
    }

    if (!articulo.id) {
      throw new Error('El artículo no tiene ID definido');
    }

    const response = await fetch('http://10.0.2.2:3001/agregar-carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ID_usuario: ID_usuario, 
        ID_publicacion: articulo.id ,
      
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || 'Error al agregar al carrito');
    }

    Alert.alert('Éxito', 'Artículo agregado al carrito');
  } catch (error) {
    console.error('Error completo en AgregarCarrito:', error);
    Alert.alert('Error al agregar al carrito');
  }
};
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containerMTB}>
          {/* Buscador */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.inputMTB, { flex: 1 }]}
              placeholder="Buscar artículos..."
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <TouchableOpacity onPress={buscarArticulos} style={{ marginTop: 50, marginLeft: 10 }}>
              <Ionicons name="search-outline" size={28} />
            </TouchableOpacity>
          </View>

          {/* Cargando */}
          {cargando ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
          ) : (
            <>
              {/* Solo mostrar la lista si se han encontrado artículos */}
              {articulos.length > 0 && (
                <FlatList
                  data={articulos}
                   keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                  contentContainerStyle={{ paddingBottom: 250, marginTop: 20 }} // Aquí agregamos el marginTop
                  renderItem={({ item }) => (
                   
                    <View style={styles.cardMTB}>
                      <Image source={{ uri: item.foto }} style={styles.imagenMTB} resizeMode="cover" />
                      <View style={styles.infoMTB}>
                        <Text style={styles.nombreMTB}>{item.nombre_articulo}</Text>
                        <Text style={styles.descripcionMTB}>{item.descripcion}</Text>
                        <Text style={styles.precioMTB}>Precio: ${item.precio}</Text>
                        <Text>Tipo: {item.tipo_bicicleta}</Text>
                        <Text style={styles.descripcionMTB}>vendedor: {item.nombre_vendedor}</Text>
                        
                        <TouchableOpacity onPress={() => AgregarCarrito(item)}>
                          <Ionicons name='cart-outline' size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  ListEmptyComponent={
                    <Text style={{ marginTop: 20, textAlign: 'center' }}>
                      No se encontraron artículos
                    </Text>
                  }
                />
              )}
              

              {/* Mostrar el video y descripción solo si no hay búsqueda activa */}
              {busqueda.trim() === '' && (
                <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ paddingBottom: 100 }}>
                  <Text style={styles.tituloMTB}>MTB (Mountain Bike)</Text>
                  <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                    Una bicicleta MTB es ideal para terrenos difíciles como montaña o tierra.
                  </Text>

                  <View style={styles.screen}>
                    <View style={styles.card}>
                      <Video
                        source={require('../videos/mtbp.mp4')}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        isLooping
                        style={styles.video}
                      />
                    </View>
                  </View>
                </ScrollView>
              )}
            </>
          )}
          {/* barra informacion de componentes */}
              <View style={styles.barraComponentes}>
              <TouchableOpacity 
              onPress={() => navigation.navigate('ComponenteDetalle')}>
                <Image style={styles.iconoComponentes} resizeMode={ResizeMode.COVER}   source={require('../iconos/rueda.jpeg')} />
              </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('ComponenteDetallePantalla2')}>
                <Image style={styles.iconoComponentes} resizeMode={ResizeMode.COVER} source={require('../iconos/manubrio.jpeg')} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('ComponenteDetallePantalla3')}>
                <Image style={styles.iconoComponentes} resizeMode={ResizeMode.COVER} source={require('../iconos/suspension.jpeg')} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('ComponenteDetallePantalla4')}>
                  <Image style={styles.iconoComponentes} resizeMode={ResizeMode.COVER} source={require('../iconos/pedal.jpeg')} />
            </TouchableOpacity>
              </View>

          {/* Barra de iconos */}
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
              <Ionicons name='storefront-outline' size={30} color="#2c7a7b" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
              <Ionicons name='cart-outline' size={26} color="#2c7a7b" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
              <Ionicons name='notifications-outline' size={28} color="#2c7a7b" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Ionicons name='chatbubbles-outline' size={26} color="#2c7a7b" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  containerMTB: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  inputMTB: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginTop: 40,
  },
  cardMTB: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
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
  tituloMTB: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 5,
    marginTop:50,
    textAlign: 'center',
  },
  screen: {
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
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
    marginTop:30,
  },
  barraComponentes:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
 },
  iconoComponentes:{
  width: 35,
  height: 35
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
  },
});

export default MTBPantalla; 