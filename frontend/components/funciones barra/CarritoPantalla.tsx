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
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';



interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;
  id_vendedor:number;
  telefono: string;
}

const { width, height } = Dimensions.get('window');
const CarritoPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false); 
  const [cargando, setCargando] = useState(true);
  const [total, setTotal] = useState(0);
  
const obtenerCarrito = async () => {
  try {
    setCargando(true);
    
    // 1. Obtener usuario de AsyncStorage
    const usuarioStr = await AsyncStorage.getItem('usuario');
    if (!usuarioStr) {
      Alert.alert('Error', 'Debes iniciar sesión primero');
      return;
    }

    // 2. Parsear datos del usuario
    const usuario = JSON.parse(usuarioStr);
    const ID_usuario = usuario.ID_usuario;
    
    if (!ID_usuario) {
      throw new Error('No se pudo obtener el ID de usuario');
    }

    console.log(`🔄 Obteniendo carrito para usuario: ${ID_usuario}`);
    
    // 3. Hacer la petición al backend
    const apiUrl = `${URL}carrito/${ID_usuario}`;
    console.log(`🌐 URL de la solicitud: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // 4. Verificar la respuesta
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Respuesta no OK:', {
        status: response.status,
        statusText: response.statusText,
        responseText: errorText
      });
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // 5. Procesar la respuesta JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('⚠️ Respuesta no es JSON:', text);
      throw new Error('La respuesta no es JSON válido');
    }

    const data = await response.json();
    console.log('📦 Datos recibidos:', data);
    
    // 6. Actualizar el estado
    setArticulos(data);
    
    // 7. Calcular el total
    const suma = data.reduce((acc: number, item: any) => {
      const precio = parseFloat(item.precio) || 0;
      return acc + precio;
    }, 0);
    setTotal(suma);
    
  } catch (error) {
    console.error('🚨 Error completo en obtenerCarrito:', {
    
    });
    Alert.alert('Error', 'No se pudo cargar el carrito. Verifica tu conexión.');
  } finally {
    setCargando(false);
  }
};

  const eliminarArticulo = async (id: number) => {
  try {
    // 1. Obtener usuario de AsyncStorage
    const usuarioStr = await AsyncStorage.getItem('usuario');
    if (!usuarioStr) {
      Alert.alert('Error', 'Debes iniciar sesión primero');
      return;
    }

    // 2. Parsear datos del usuario
    const usuario = JSON.parse(usuarioStr);
    const ID_usuario = usuario.ID_usuario || usuario.id_usuario || usuario.id;
    
    if (!ID_usuario) {
      throw new Error('No se pudo obtener el ID de usuario');
    }

    console.log(`🗑️ Intentando eliminar artículo ID: ${id} del usuario ID: ${ID_usuario}`);
    
    // 3. Configurar la solicitud
    const apiUrl = `${URL}eliminar-carrito`;
    const body = JSON.stringify({ 
      ID_usuario: ID_usuario, 
      ID_publicacion: id 
    });

    console.log(`🌐 URL: ${apiUrl}, Body: ${body}`);
    
    // 4. Hacer la petición
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    });

    // 5. Verificar la respuesta
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error en la respuesta:', {
        status: response.status,
        errorData
      });
      throw new Error(errorData.error || 'Error al eliminar el artículo');
    }

    // 6. Procesar la respuesta exitosa
    const result = await response.json();
    console.log('✅ Artículo eliminado:', result);
    
    // 7. Actualizar el carrito
    await obtenerCarrito();
    Alert.alert('Éxito', 'Artículo eliminado del carrito');
    
  } catch (error) {
    console.error('🚨 Error completo en eliminarArticulo:', {
      
    });
    Alert.alert('No se pudo eliminar el artículo');
  }
};

const enviarWhatsApp = (numero: string, mensaje: string) => {
  const numeroFormateado = numero.replace(/\D/g, ''); // Elimina cualquier carácter que no sea número
  const url = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;

  Linking.canOpenURL(url)
    .then((soporta) => {
      if (!soporta) {
        Alert.alert('Error', 'Parece que WhatsApp no está instalado');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('❌ Error al abrir WhatsApp:', err));
};
 

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const renderItem = ({ item }: { item: Articulo }) => (
      <TouchableOpacity onPress={()=>navigation.navigate('DetallePublicacion', { publicacion: item })}>
    <View style={styles.card}>
      <Image 
        source={{ uri: item.foto }} 
        style={styles.imagen} 
        resizeMode="cover" 
        onError={() => console.log("Error cargando imagen")}
      />

      <View style={styles.info}>
        
        <Text style={styles.nombre}>{item.nombre_articulo}</Text>
        <Text style={styles.descripcion}>Descripcion: {item.descripcion}</Text>
        <Text style={styles.precio}>Precio: ${item.precio}</Text>
        <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
        <Text style={styles.descripcion}>Vendedor: {item.nombre_vendedor}</Text>
        <TouchableOpacity 
          onPress={() => eliminarArticulo(item.id)}
          style={styles.botonEliminar}
          >
          <Ionicons name="trash-outline" size={20} color="#e63946" />
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  onPress={() => enviarWhatsApp(item.telefono, `Hola ${item.nombre_vendedor}, estoy interesado en tu artículo: ${item.nombre_articulo}`)}
  style={styles.botonMensajeAlVendedor}
>
  <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
  <Text style={styles.textoMensajeAlVendedor}>Chatear por WhatsApp</Text>
</TouchableOpacity> 
       {/*  <TouchableOpacity 
  onPress={() => navigation.navigate('ChatPrivado', { 
    chatId: null, 
    idOtroUsuario: item.id_vendedor,
    nombreOtroUsuario: item.nombre_vendedor 
  })}
  style={styles.botonMensajeAlVendedor}
>
  <Ionicons name="chatbubble-ellipses-outline" size={20} color="#51AFF7" />
  <Text style={styles.textoMensajeAlVendedor}>Mensaje al vendedor</Text>
</TouchableOpacity>  */}
      </View>
    </View>
  </TouchableOpacity>
  );

  return (
    <LinearGradient
                          colors={['#0c2b2aff', '#000000']} // azul petróleo → negro
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={{ flex: 1 }}
                        >
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons name="chevron-back" size={28} color="white" />
  </TouchableOpacity>

  <Text style={styles.titulo}>Tu Carrito de Compras</Text>

  {/* Espaciador para balancear */}
  <View style={{ width: 28 }} />
</View>

      
      
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
       <View style={styles.iconBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
        <Ionicons name='storefront-outline' size={28} color="#ffffffff" />
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
        <Ionicons name='cart-outline' size={28} color="#ffffffff" />
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
        <Ionicons name='notifications-outline' size={28} color="#ffffffff" />
      </TouchableOpacity>
    
      <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
              <Ionicons name="person-circle-outline" size={28} color="#f3ffffff"></Ionicons>
      </TouchableOpacity>
      {/* Botón de componentes */}
      
      <TouchableOpacity onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}>
        <Ionicons name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'} size={28} color="#ffffffff" />
      </TouchableOpacity> 
    </View>
        </>
      )}
     
    </SafeAreaView>
   </LinearGradient>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between", // distribuye entre icono, texto, espacio
  marginBottom: 10,
  paddingHorizontal: 10,
  marginTop: Platform.OS === "android" ? 10 : 0,
},

backButton: {
   marginTop: Platform.OS === "android" ? 40 : 0,
  marginLeft: Platform.OS === "android" ? 10 : 5, // un poco de espacio en Android
  padding: Platform.OS === "android" ? 5 : 5,     // más área de toque
  justifyContent: "center",
  alignItems: "center",
},

  titulo: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 2,
    marginTop: Platform.OS === "android" ? 40 : 0,
    textAlign: 'center',
    
  },
  loader: {
    marginTop: 50,
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
  paddingBottom:"7%",
},
  vacio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  card: {
  
  flexDirection: 'row',
  alignItems: 'center', // 👈 centra verticalmente el contenido
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
  imagen: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c7a7b',
  },
  tipo: {
    fontSize: 14,
    color: '#666',
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botonMensajeAlVendedor :{
     flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textoMensajeAlVendedor:{
color:"#51AFF7"
  },
  textoEliminar: {
    color: '#e63946',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fffdfdff',
  },
  totalPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#56e639ff',
    marginHorizontal: 20,
  },
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
  textoComprar: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  contenidoBoton: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarritoPantalla;