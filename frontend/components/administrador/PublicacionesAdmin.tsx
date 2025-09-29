import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { URL } from '../../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';

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

type PublicacionesAdminRouteProp = RouteProp<StackParamList, 'PublicacionesAdmin'>;

interface Props {
  route: PublicacionesAdminRouteProp;
}

const { width } = Dimensions.get('window');

const PublicacionesAdmin: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [articulos, setPublicaciones] = useState<Publicacion[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { ID_usuario } = route.params;

  const obtenerPublicaciones = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`${URL}/obtener-publicaciones/${ID_usuario}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("La respuesta no es un array válido");
      setPublicaciones(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las publicaciones de este usuario.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const renderItem = ({ item }: { item: Publicacion }) => {
    const portada = item.fotos && item.fotos.length > 0 ? item.fotos[0] : "";
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetallePublicacionAdmin', { publicacion: item, id: item.id })}>
        <View style={styles.card}>
          <Image
            source={{ uri: portada }}
            style={styles.imagen}
            resizeMode="cover"
            onError={() => console.log("Error cargando imagen")}
          />
          <View style={styles.info}>
            <Text style={styles.nombre}>{item.nombre_articulo}</Text>
            <Text style={styles.descripcion}>Descripción: {item.descripcion.substring(0, 50)}...</Text>
             <Text style={styles.precio}>
                                      {new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        minimumFractionDigits: 0
                                      }).format(Number(item.precio))}
                                    </Text>
            <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
            <Text style={styles.tipo}>Vendedor: {item.nombre_vendedor}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#0c2b2aff', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titulo}>ADMINISTRAR PUBLICACIONES</Text>

        <FlatList
          data={articulos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          refreshing={refreshing}
          onRefresh={obtenerPublicaciones}
        />

        <TouchableOpacity style={styles.refreshButton} onPress={obtenerPublicaciones}>
          <Ionicons name="refresh" size={24} color="white" />
          <Text style={styles.refreshButtonText}>Actualizar lista</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, marginTop: 40, textAlign: 'center' },
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
  info: { flex: 1, marginLeft: 15, justifyContent: 'space-around' },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  descripcion: { fontSize: 14, color: '#666' },
  precio: { fontSize: 16, fontWeight: '600', color: '#2c7a7b' },
  tipo: { fontSize: 14, color: '#666' },
  lista: { paddingBottom: 20 },
  refreshButton: { flexDirection: 'row', backgroundColor: '#007bff', padding: 12, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  refreshButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
});

export default PublicacionesAdmin;
