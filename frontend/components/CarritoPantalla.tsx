import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, 
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Articulo {
  ID_publicacion: number;
  nombre_Articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
}

const CarritoPantalla: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [total, setTotal] = useState(0);

  const obtenerCarrito = async () => {
    try {
      const usuarioStr = await AsyncStorage.getItem('usuario');
      if (!usuarioStr) {
        Alert.alert('Error', 'Debes iniciar sesión primero');
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario;

      const response = await fetch(`http://10.0.2.2:3001/carrito/${ID_usuario}`);
      const data: Articulo[] = await response.json();
      
      setArticulos(data);
      
      // Calcular total
      const suma = data.reduce((acc, item) => acc + parseFloat(item.precio), 0);
      setTotal(suma);
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      Alert.alert('Error', 'No se pudo cargar el carrito');
    } finally {
      setCargando(false);
    }
  };

  const eliminarArticulo = async (ID_publicacion: number) => {
    try {
      const usuarioStr = await AsyncStorage.getItem('usuario');
      if (!usuarioStr) return;

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario;

      const response = await fetch('http://10.0.2.2:3001/eliminar-carrito', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID_usuario, ID_publicacion }),
      });

      if (response.ok) {
        obtenerCarrito(); // Refrescar la lista
        Alert.alert('Éxito', 'Artículo eliminado del carrito');
      } else {
        Alert.alert('Error', 'No se pudo eliminar el artículo');
      }
    } catch (error) {
      console.error('Error al eliminar artículo:', error);
      Alert.alert('Error', 'Error al eliminar el artículo');
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, []);

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
            keyExtractor={(item) => item.ID_publicacion.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.foto }} style={styles.imagen} />
                 <View style={styles.info}>
                  <Text style={styles.nombre}>{item.nombre_Articulo}</Text>
                  <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
                  <Text style={styles.precio}>${item.precio}</Text>
                  
                  <TouchableOpacity 
                    style={styles.botonEliminar}
                    onPress={() => eliminarArticulo(item.ID_publicacion)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#e63946" />
                    <Text style={styles.textoEliminar}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tipo: {
    fontSize: 12,
    color: '#4d82bc',
    marginTop: 2,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
    marginTop: 5,
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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