import React, { useState } from 'react';
import { 
  View, Text, TextInput, FlatList, Image, 
  TouchableOpacity, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';

interface Articulo {
  ID_publicacion: number;
  nombre_Articulo: string;
  descripcion: string;
  precio: string;
  foto: string;
  tipo_bicicleta: string;
}

type RouteParams = {
  tipoBicicleta: string;
};

const MTBPantalla: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { tipoBicicleta } = route.params as RouteParams;
  
  const [busqueda, setBusqueda] = useState('');
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(false);

  const buscarArticulos = async () => {
    if (busqueda.trim() === '') return;

    setCargando(true);
    try {
      const response = await fetch(
        `http://10.0.2.2:3001/buscar?nombre=${encodeURIComponent(busqueda)}&tipo=${tipoBicicleta}`
      );
      const data: Articulo[] = await response.json();
      
      const articulosValidos = data.filter(articulo => 
        articulo.ID_publicacion && articulo.tipo_bicicleta === tipoBicicleta
      );
      
      setArticulos(articulosValidos);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
      Alert.alert('Error', 'No se pudieron cargar los artículos');
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

      if (!ID_usuario || !articulo.ID_publicacion) {
        Alert.alert('Error', 'Datos incompletos');
        return;
      }

      const response = await fetch('http://10.0.2.2:3001/agregar-carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ID_usuario, 
          ID_publicacion: articulo.ID_publicacion 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Éxito', 'Artículo agregado al carrito');
      } else {
        Alert.alert('Error', data.mensaje || 'Error al agregar al carrito');
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      Alert.alert('Error', 'No se pudo agregar al carrito');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Buscar artículos de ${tipoBicicleta}...`}
          value={busqueda}
          onChangeText={setBusqueda}
          onSubmitEditing={buscarArticulos}
        />
        <TouchableOpacity onPress={buscarArticulos} style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#4d82bc" style={styles.loader} />
      ) : articulos.length === 0 ? (
        <Text style={styles.noResults}>
          {busqueda.trim() ? 'No se encontraron artículos' : 'Busca artículos para tu bicicleta'}
        </Text>
      ) : (
        <FlatList
          data={articulos}
          keyExtractor={(item) => item.ID_publicacion.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.foto }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.nombre_Articulo}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <Text style={styles.price}>${item.precio}</Text>
                <Text style={styles.type}>Tipo: {item.tipo_bicicleta}</Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => AgregarCarrito(item)}
                >
                  <Ionicons name="cart-outline" size={18} color="#fff" />
                  <Text style={styles.addButtonText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Publicar')}
        >
          <Ionicons name="add-circle-outline" size={28} color="#4d82bc" />
          <Text style={styles.navText}>Publicar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Carrito')}
        >
          <Ionicons name="cart-outline" size={28} color="#4d82bc" />
          <Text style={styles.navText}>Carrito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Los estilos se mantienen igual que en tu código original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4d82bc',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 50,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
  },
  type: {
    fontSize: 12,
    color: '#4d82bc',
    marginTop: 3,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4d82bc',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#4d82bc',
    marginTop: 3,
  },
});

export default MTBPantalla;