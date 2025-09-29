import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, 
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert, Linking,  Dimensions, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { URL } from '../../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';

interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  fotos: string[];  
  nombre_vendedor: string;
  id_vendedor: number;
  telefono: string;
  foto:string;
}

const { width, height } = Dimensions.get('window');

const CarritoPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false); 
  const [cargando, setCargando] = useState(true);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [modalSuccess, setModalSuccess] = useState(true); // true = éxito, false = error


  
  const obtenerCarrito = async () => {
    try {
      setCargando(true);
      
      const usuarioStr = await AsyncStorage.getItem('usuario');
      if (!usuarioStr) {
        Alert.alert('Error', 'Debes iniciar sesión primero');
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario;
      if (!ID_usuario) throw new Error('No se pudo obtener el ID de usuario');

      const response = await fetch(`${URL}/carrito/${ID_usuario}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      setArticulos(data);

      const suma = data.reduce((acc: number, item: any) => {
        const precio = parseFloat(item.precio) || 0;
        return acc + precio;
      }, 0);
      setTotal(suma);
    } catch (error) {
      console.error('🚨 Error en obtenerCarrito:', error);
      Alert.alert('Error', 'No se pudo cargar el carrito. Verifica tu conexión.');
    } finally {
      setCargando(false);
    }
  };

  const eliminarArticulo = async (id: number) => {
    try {
      const usuarioStr = await AsyncStorage.getItem('usuario');
      if (!usuarioStr) {
        Alert.alert('Error', 'Debes iniciar sesión primero');
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario || usuario.id_usuario || usuario.id;
      if (!ID_usuario) throw new Error('No se pudo obtener el ID de usuario');

      const response = await fetch(`${URL}/eliminar-carrito`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID_usuario, ID_publicacion: id }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al eliminar el artículo');
      }

      await obtenerCarrito();
     mostrarModal("Artículo eliminado del carrito ✅", true);
    } catch (error) {
      console.error('🚨 Error en eliminarArticulo:', error);
      mostrarModal("No se pudo eliminar el artículo ❌", false);

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
  const mostrarModal = (mensaje: string, exito: boolean) => {
  setModalMessage(mensaje);
  setModalSuccess(exito);
  setModalVisible(true);

  setTimeout(() => {
    setModalVisible(false);
  }, 2000); // se oculta solo después de 2s
};


  useEffect(() => {
    obtenerCarrito();
  }, []);

  const renderItem = ({ item }: { item: Articulo }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('DetallePublicacion', { publicacion: item, id_vendedor : item.id_vendedor })}
    >
      <View style={styles.card}>
        {/* ✅ Mostrar solo la primera foto */}
        <Image 
          source={{ uri: item.fotos && item.fotos.length > 0 ? item.fotos[0] : 'https://via.placeholder.com/120' }} 
          style={styles.imagen} 
          resizeMode="cover" 
        />

        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre_articulo}</Text>
          <Text style={styles.descripcion}>Descripción: {item.descripcion}</Text>
           <Text style={styles.precio}>
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(Number(item.precio))}
          </Text>
          <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
          <Text style={styles.vendedor}>Vendedor: {item.nombre_vendedor}</Text>

          <TouchableOpacity onPress={() => eliminarArticulo(item.id)} style={styles.botonEliminar}>
            <Ionicons name="trash-outline" size={20} color="#e63946" />
            <Text style={styles.textoEliminar}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => enviarWhatsApp(item.telefono, `Hola ${item.nombre_vendedor}, estoy interesado en tu artículo: ${item.nombre_articulo}, ¿aun sigue disponible?`)}
            style={styles.botonMensajeAlVendedor}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.textoMensajeAlVendedor}>Chatear por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0c2b2aff', '#000000']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Tu Carrito de Compras</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Contenido */}
        {cargando ? (
          <ActivityIndicator size="large" color="#4d82bc" style={styles.loader} />
        ) : articulos.length === 0 ? (
          <Text style={styles.vacio}>Tu carrito está vacío</Text>
        ) : (
          <>
            <FlatList
              data={articulos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.lista}
            />
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalTexto}>Total:</Text>
              <Text style={styles.totalPrecio}>${total.toFixed(0)}</Text>
            </View>
            
            <TouchableOpacity style={styles.botonComprar}>
              <View style={styles.contenidoBoton}>
                <Ionicons name="cart-outline" size={22} color="white" />
                <Text style={styles.textoComprar}>PAGAR</Text>
              </View>
            </TouchableOpacity>

            {/* Barra inferior */}
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
                <Ionicons name='storefront-outline' size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
                <Ionicons name='cart-outline' size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
                <Ionicons name='notifications-outline' size={28} color="#fff" />
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
      {modalVisible && (
  <View style={styles.modalOverlay}>
    <View style={[styles.modalBox, modalSuccess ? styles.modalSuccess : styles.modalError]}>
      <Ionicons 
        name={modalSuccess ? "checkmark-circle-outline" : "close-circle-outline"} 
        size={50} 
        color={modalSuccess ? "#22c55e" : "#ef4444"} 
      />
      <Text style={styles.modalText}>{modalMessage}</Text>
    </View>
  </View>
)}

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: Platform.OS === "android" ? 10 : 0,
  },
  // modales 
  modalOverlay: {
  position: "absolute",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},
modalBox: {
  width: "75%",
  padding: 20,
  borderRadius: 15,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 5,
},
modalSuccess: { backgroundColor: "#ecfdf5" },
modalError: { backgroundColor: "#fef2f2" },
modalText: { marginTop: 10, fontSize: 16, fontWeight: "600", textAlign: "center", color: "#111" },


  backButton: {
    marginTop: Platform.OS === "android" ? 40 : 0,
    marginLeft: Platform.OS === "android" ? 10 : 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    marginTop: Platform.OS === "android" ? 40 : 0,
    textAlign: 'center',
  },
  loader: { marginTop: 50 },
  vacio: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#666' },
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
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  descripcion: { fontSize: 14, color: '#444', marginTop: 2 },
  precio: { fontSize: 16, fontWeight: '700', color: '#e63946', marginTop: 4 },
  tipo: { fontSize: 14, fontWeight: '600', color: '#006d77', marginTop: 2 },
  vendedor: { fontSize: 14, fontWeight: '500', color: '#0e0e0eff', marginTop: 2 },
  botonEliminar: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  textoEliminar: { color: '#e63946', marginLeft: 5, fontWeight: 'bold' },
  botonMensajeAlVendedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#25D366',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textoMensajeAlVendedor: { color:"#fff", marginLeft: 6, fontWeight: '600' },
  lista: { paddingBottom: 20 },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  totalTexto: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  totalPrecio: { fontSize: 18, fontWeight: 'bold', color: '#56e639', marginHorizontal: 20 },
  botonComprar: {
    backgroundColor: '#00c774',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === "android" ? 90 : 70,
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
    paddingBottom:"7%",
  },
});

export default CarritoPantalla;
