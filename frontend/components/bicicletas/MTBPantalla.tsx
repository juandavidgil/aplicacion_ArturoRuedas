import React, { useState, useEffect, Suspense } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../types/types';
import type { StackNavigationProp } from '@react-navigation/stack';
import { URL } from '../../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modelo3D } from './Modelo3D';
import { cargarMTB } from './Modelos3D';
import CustomModal from '../detalle y publicaciones/CustomModal';


interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  fotos: string[];
  nombre_vendedor: string;
  telefono: string;
  foto: string;
  id_vendedor: number;
}

type RouteParams = {
  tipoBicicleta: string;
};

const { width, height } = Dimensions.get('window');

const MtbPantalla: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const route = useRoute();
  const { tipoBicicleta } = route.params as RouteParams;
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);
  
  const mostrarModal = (mensaje: string, exito: boolean) => {
    setModalMessage(mensaje);
    setModalSuccess(exito);
    setModalVisible(true);
  
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };
  

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
    setCargando(true);
    try {
      const response = await fetch(
        `${URL}/buscar?nombre=${encodeURIComponent(texto)}&tipo=${tipoBicicleta}`
      );
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      const resultados: Articulo[] = Array.isArray(data)
        ? data
        : Array.isArray(data.articulos)
        ? data.articulos
        : [];
      const articulosValidos = resultados.filter(
        (articulo) =>
          articulo.id &&
          articulo.tipo_bicicleta?.toLowerCase() === tipoBicicleta.toLowerCase()
      );
      setArticulos(articulosValidos);
    } catch (error) {
      console.error('Error al obtener artículos:', error);
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
      const response = await fetch(`${URL}/agregar-carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID_usuario, ID_publicacion: articulo.id }),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.error || 'Error al agregar al carrito');
      mostrarModal("Articulo agregado al carrito", true);
    } catch (error) {
      console.error('Error completo en AgregarCarrito:', error);
      mostrarModal("Tu articulo ya esta en el carrito", false);
    }
  };

  const enviarWhatsApp = (numero: string, mensaje: string) => {
    const numeroFormateado = numero.replace(/\D/g, '');
    const url = `whatsapp://send?phone=57${numeroFormateado}&text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url).catch(() => {
      const urlWeb = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;
      Linking.openURL(urlWeb).catch(() => {
        Alert.alert('Error', 'No se pudo abrir WhatsApp ni WhatsApp Web');
      });
    });
  };

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mountain Bike (MTB)</Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar artículos..."
              placeholderTextColor="#666"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
        </View>

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerMTB}>
            {cargando ? (
              <ActivityIndicator size="large" color="#00ffb3" style={{ marginTop: 20 }} />
            ) : (
              <>
                {articulos.length > 0 ? (
                  <FlatList
                    data={articulos}
                    keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                    contentContainerStyle={{ paddingBottom: 250, marginTop: 20 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetallePublicacion', {
                            publicacion: item,
                            id_vendedor: item.id_vendedor,
                          })
                        }
                      >
                        {/* TARJETA IGUAL QUE FIXIE */}
                        <View style={styles.cardMTB}>
                          <Image
                            source={{ uri: item.fotos?.[0] || '' }}
                            style={styles.imagenMTB}
                            resizeMode="cover"
                          />
                          <View style={styles.infoMTB}>
                            <Text style={styles.nombreMTB}>{item.nombre_articulo}</Text>
                            <Text style={styles.descripcionMTB} numberOfLines={2}>
                              Descripción: {item.descripcion}
                            </Text>
                             <Text style={styles.precioMTB}>
                                                      {new Intl.NumberFormat('es-CO', {
                                                        style: 'currency',
                                                        currency: 'COP',
                                                        minimumFractionDigits: 0
                                                      }).format(Number(item.precio))}
                                                    </Text>
                            <Text style={styles.tipoMTB}>Tipo: {item.tipo_bicicleta}</Text>
                            <Text style={styles.vendedorMTB}>Vendedor: {item.nombre_vendedor}</Text>

                            <TouchableOpacity
                              onPress={() => AgregarCarrito(item)}
                              style={styles.botonCarrito}
                            >
                              <Ionicons name="cart-outline" size={20} color="#fff" />
                              <Text style={styles.textoCarrito}>Agregar al carrito</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                enviarWhatsApp(
                                  item.telefono,
                                  `Hola ${item.nombre_vendedor}, estoy interesado en tu artículo: ${item.nombre_articulo}, ¿aún sigue disponible?`
                                )
                              }
                              style={styles.botonWhatsapp}
                            >
                              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                              <Text style={styles.textoWhatsapp}>Chatear por WhatsApp</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                ) : busqueda.trim() !== '' ? (
                  <Text style={{ marginTop: 20, textAlign: 'center', color: '#fff' }}>
                    No se encontraron artículos
                  </Text>
                ) : (
                  <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        lineHeight: 22,
                        color: '#fff',
                        fontWeight: '500',
                        paddingHorizontal: 16,
                      }}
                    >
                      La Mountain Bike (MTB) está diseñada para terrenos irregulares y
                      montañosos, con suspensión y resistencia para todo tipo de rutas.
                    </Text>
                    <View style={styles.screen}>
                      <View style={styles.card}>
                        <Suspense fallback={<ActivityIndicator size="large" color="#00ffb3" />}>
                          <Modelo3D cargar={cargarMTB} scale={7} position={[0, -3.5, 0]} />
                        </Suspense>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </SafeAreaView>

        {/* Barra inferior */}
        <View style={[styles.iconBar,  { paddingBottom: insets.bottom + 10 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
            <Ionicons name="storefront-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
            <Ionicons name="cart-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}
          >
            <Ionicons
              name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

         {/* Barra de componentes deslizable MTB */}
{mostrarBarraComponentes && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.barraComponentes}
    contentContainerStyle={{ paddingHorizontal: 10 }}
  >
    {/* Marco MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'marcoMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/marco.jpg')} />
    </TouchableOpacity>

    {/* Tenedor MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'tenedorMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/tenedor.avif')} />
    </TouchableOpacity>

    {/* Biela MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'bielaMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/biela.webp')} />
    </TouchableOpacity>

    {/* Piñón MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'pinonMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/pinon.jpg')} />
    </TouchableOpacity>

    {/* Desviador Trasero MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'desviadortraseroMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/desviadortrasero.jpg')} />
    </TouchableOpacity>

    {/* Mando de Cambio MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'mandodecambio', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/mandodecambio.jpg')} />
    </TouchableOpacity>

    {/* Frenos de Disco MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'frenosdiscoMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/frenosdisco.webp')} />
    </TouchableOpacity>

    {/* Rueda MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'ruedaMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/ruedas.webp')} />
    </TouchableOpacity>

    {/* Amortiguador Trasero MTB */}
    <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'amortiguadortraseroMtb', tipoBicicleta })}>
      <Image style={styles.iconoComponentes} source={require('../../img/MTB/amortiguadortrasero.jpg')} />
    </TouchableOpacity>

      {/* componentes en comun  */}
        
        {/* Caña */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'cana', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/cana.jpg')} />
        </TouchableOpacity>
    
        {/* Centro */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'centro', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/centro.jpg')} />
        </TouchableOpacity>
    
        {/* Manubrio */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'manubrio', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/manubrio.png')} />
        </TouchableOpacity>
    
        {/* Juego de Dirección */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'juegodedireccion', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/juegodedireccion.jpg')} />
        </TouchableOpacity>
    
        {/* Sillín */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'sillin', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/sillin.jpg')} />
        </TouchableOpacity>
    
        {/* Poste */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'poste', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/poste.jpg')} />
        </TouchableOpacity>
    
        {/* Pedales */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'pedales', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/pedales.jpg')} />
        </TouchableOpacity>
    
        {/* Neumático */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'neumatico', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/neumatico.jpg')} />
        </TouchableOpacity>
    
        {/* Cadena */}
        <TouchableOpacity onPress={() => navigation.navigate('ComponenteDetalle', { componenteId: 'cadena', tipoBicicleta })}>
          <Image style={styles.iconoComponentes} source={require('../../img/Comun/cadena.png')} />
        </TouchableOpacity>
      </ScrollView>
    )}

      </SafeAreaProvider>

       <CustomModal 
        visible={modalVisible}
        message={modalMessage}
        success={modalSuccess}
        onClose={() => setModalVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerMTB: { flex: 1, padding: 16, marginTop: 0 },
  headerWrapper: { width: '100%', paddingBottom: 20 },
  header: {
    backgroundColor: '#004f4d',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  headerTitle: { fontSize: width * 0.06, fontWeight: 'bold', color: '#fff', marginTop: 30 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.08,
    paddingHorizontal: width * 0.06,
    
    height: 55,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: { flex: 1, paddingHorizontal: 16, fontSize: 16, color: '#333' },
  cardMTB: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imagenMTB: { width: 110, height: 110, borderRadius: 10, backgroundColor: '#e0e0e0' },
  infoMTB: { flex: 1, marginLeft: 15, justifyContent: 'space-around' },

  nombreMTB: { fontSize: 18, fontWeight: 'bold', color: '#004f4d' },
  descripcionMTB: { fontSize: 14, color: '#444' },
  precioMTB: { fontSize: 16, fontWeight: '700', color: '#e63946' },
  tipoMTB: { fontSize: 14, color: '#006d77' },
  vendedorMTB: { fontSize: 13, fontWeight: '600', color: '#1d3557' },

  botonCarrito: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5bdaedff',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  textoCarrito: { color: '#fff', fontSize: 14, fontWeight: '600', marginLeft: 6 },

  botonWhatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  textoWhatsapp: { color: '#fff', fontSize: 14, fontWeight: '600', marginLeft: 6 },

  screen: { justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: {
    backgroundColor: '#fff',
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
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    
  },
  iconoComponentes: { width: 35, height: 35, marginHorizontal: 15 },
  barraComponentes: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#004f4d',
    borderRadius: 30,
    position: 'absolute',
    bottom: 110,
    left: 16,
    right: 16,
  },
});

export default MtbPantalla;
