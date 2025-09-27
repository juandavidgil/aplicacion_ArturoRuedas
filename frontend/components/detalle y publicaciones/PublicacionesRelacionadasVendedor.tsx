import React, { useState, useEffect } from 'react';
import { 
  View, SafeAreaView, Text, Image, StyleSheet, Platform,
  ActivityIndicator, Alert, TouchableOpacity, Dimensions, FlatList, Linking
} from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { URL } from '@frontend/config/UrlApi';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Publicacion {
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

type PublicacionesRelacionadasVendedorRouteProp = RouteProp<
  StackParamList,
  'PublicacionesRelacionadasVendedor'
>;

interface Props {
  route: PublicacionesRelacionadasVendedorRouteProp;
}
const { height } = Dimensions.get('window');

const PublicacionesRelacionadasVendedor: React.FC<Props> = ({ route }) => {
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false);
  const { id_vendedor } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [articulos, setArticulos] = useState<Publicacion[]>([]);
  const [cargando, setCargando] = useState(true);

  const ID_usuario = id_vendedor;

  const AgregarCarrito = async (articulo: Publicacion) => {
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
      Alert.alert('Éxito', 'Artículo agregado al carrito');
    } catch (error) {
      console.error('Error completo en AgregarCarrito:', error);
      Alert.alert('Error al agregar al carrito');
    }
  };

  const obtenerCarrito = async () => {
    try {
      setCargando(true);
      const response = await fetch(`${URL}/PublicacionesRelacionadasVendedor/${ID_usuario}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      setArticulos(data);

      if (data.length > 0) {
        navigation.setOptions({
          title: `Publicaciones relacionadas al vendedor: ${data[0].nombre_vendedor}`,
        });
      }
    } catch (error) {
      console.error('🚨 Error en obtener publicaciones del vendedor:', error);
      Alert.alert('Error', 'No se pudo cargar las publicaciones del vendedor. Verifica tu conexión.');
    } finally {
      setCargando(false);
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

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const renderItem = ({ item }: { item: Publicacion }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetallePublicacion', { publicacion: item, id_vendedor })}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.fotos && item.fotos.length > 0 ? item.fotos[0] : 'https://via.placeholder.com/120' }}
          style={styles.imagen}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre_articulo}</Text>
          <Text style={styles.descripcion}>Descripción: {item.descripcion}</Text>
          <Text style={styles.precio}>Precio: ${item.precio}</Text>
          <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
          <Text style={styles.vendedor}>Vendedor: {item.nombre_vendedor}</Text>
          
          {/* Botón Agregar al carrito */}
          <TouchableOpacity
            onPress={() => AgregarCarrito(item)}
            style={styles.botonCarrito}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.textoCarrito}>Agregar al carrito</Text>
          </TouchableOpacity>

          {/* Botón WhatsApp */}
          <TouchableOpacity
            onPress={() =>
              enviarWhatsApp(item.telefono, `Hola ${item.nombre_vendedor}, estoy interesado en tu artículo: ${item.nombre_articulo}, ¿aun sigue disponible?`)
            }
            style={styles.botonWhatsapp}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.textoWhatsapp}>Chatear por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => {
    if (articulos.length === 0) return null;
    const vendedor = articulos[0];
    return (
      <View style={styles.vendedorContainer}>
        <Image source={{ uri: vendedor.foto || 'https://via.placeholder.com/150' }} style={styles.vendedorFoto} />
        <Text style={styles.vendedorNombre}>{vendedor.nombre_vendedor}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0c2b2aff', '#000000']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {cargando ? (
          <ActivityIndicator size="large" color="#4d82bc" style={styles.loader} />
        ) : articulos.length === 0 ? (
          <Text style={styles.vacio}>No hay publicaciones de este vendedor</Text>
        ) : (
          <>
            <FlatList
              data={articulos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.lista}
              ListHeaderComponent={renderHeader}
            />

            {/* Barra inferior */}
            <View style={styles.iconBar}>
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
              <TouchableOpacity onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}>
                <Ionicons name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'} size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { marginTop: 50 },
  vacio: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#666' },

  vendedorContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 80,
  },
  vendedorFoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  vendedorNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  imagen: { width: 110, height: 110, borderRadius: 10, backgroundColor: '#e0e0e0' },
  info: { flex: 1, marginLeft: 15, justifyContent: 'space-around' },

  // 🎨 Textos con mejor contraste
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#004f4d' }, // verde oscuro elegante
  descripcion: { fontSize: 14, color: '#444' }, // gris legible
  precio: { fontSize: 16, fontWeight: '700', color: '#e63946' }, // rojo fuerte
  tipo: { fontSize: 14, color: '#006d77' }, // azul verdoso
  vendedor: { fontSize: 13, fontWeight: '600', color: '#1d3557' }, // azul fuerte

  // Botón carrito
  botonCarrito: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5bdaedff", // Lila
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  textoCarrito: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  // Botón WhatsApp
  botonWhatsapp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366", // Verde oficial
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  textoWhatsapp: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  lista: { paddingBottom: 20 },

  botonComprar: {
    backgroundColor: '#00c774',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === 'android' ? 90 : 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginHorizontal: 20,
  },
  textoComprar: { color: '#fff', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
  contenidoBoton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

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
    paddingBottom: '7%',
  },
});

export default PublicacionesRelacionadasVendedor;
