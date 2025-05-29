import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, 
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Articulo {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
  nombre:string;
}

const CarritoPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
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
    const apiUrl = `http://10.0.2.2:3001/carrito/${ID_usuario}`;
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
    const apiUrl = 'http://10.0.2.2:3001/eliminar-carrito';
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



  useEffect(() => {
    obtenerCarrito();
  }, []);

  const renderItem = ({ item }: { item: Articulo }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.foto }} 
        style={styles.imagen} 
        resizeMode="cover" 
        onError={() => console.log("Error cargando imagen")}
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre_articulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
        <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
        <Text style={styles.descripcion}>Vendedor: {item.nombre}</Text>
        <TouchableOpacity 
          onPress={() => eliminarArticulo(item.id)}
          style={styles.botonEliminar}
        >
          <Ionicons name="trash-outline" size={20} color="#e63946" />
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Chat')}
          style={styles.botonMensajeAlVendedor}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#51AFF7" />
          <Text style={styles.textoMensajeAlVendedor}>Mensaje al vendedor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Tu Carrito de Compras</Text>
      
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
            <Text style={styles.totalPrecio}>${total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.botonComprar}
            onPress={() => Alert.alert('Compra', 'Proceder al pago')}
          >
            <Ionicons name="card-outline" size={20} color="#fff" />
            <Text style={styles.textoComprar}>Proceder al Pago</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

// Estilos (se mantienen igual que en tu código original)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  loader: {
    marginTop: 50,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  card: {
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
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e63946',
  },
  botonComprar: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoComprar: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CarritoPantalla;