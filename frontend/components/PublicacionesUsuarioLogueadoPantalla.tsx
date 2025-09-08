import React,{ useState, useEffect}  from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";  
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { title } from "process";


interface Publicacion {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;
  telefono: string;

}


const PublicacionesUsuarioLogueado: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [articulos, setPublicaciones] = useState<Publicacion[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const obtenerPublicacionesUsuarioLogueado = async  ()=>{
         const usuarioStr = await AsyncStorage.getItem('usuario');
          if (!usuarioStr) {
               Alert.alert('Error', 'Debes iniciar sesión primero');
               return;
             }
    const usuario = JSON.parse(usuarioStr);
    const ID_usuario = usuario.ID_usuario;
    
    if (!ID_usuario) {
      throw new Error('No se pudo obtener el ID de usuario');
    }

  
        try{
            setRefreshing(true);
            const response = await fetch(`${URL}obtener-publicaciones-usuario-logueado/${ID_usuario}`);
             if (!response.ok) {
             const errorText = await response.text();
             throw new Error(`Error ${response.status}: ${errorText}`);
             
            }
            const data = await response.json();
            // Validación de datos
            if (!Array.isArray(data)) {
              throw new Error("La respuesta no es un array válido");
            }
      
        setPublicaciones(data);
        } catch (error) {
            console.error('Error al obtener publicaciones del usuario Logueado:', error);
            Alert.alert('Error', 'No se pudieron cargar las publicaciones de este usuario logueado. Verifica la conexión al servidor.');
     } finally{
            setRefreshing(false);
     }
    }
     useEffect(() => {
        obtenerPublicacionesUsuarioLogueado();
      }, []);
     const renderItem = ({ item }: { item: Publicacion }) => (
      <TouchableOpacity onPress={() => {
        navigation.navigate('DetallePublicacionLogueado',{ 
  publicacion: item, 
  id: item.id
});
      }}>
        <View style={styles.card}>
          <Image 
            source={{ uri: item.foto }} 
            style={styles.imagen} 
            resizeMode="cover" 
            onError={() => console.log("Error cargando imagen")}
          />
    
          <View style={styles.info}>
            <Text style={styles.nombre}>{item.nombre_articulo}</Text>
            <Text style={styles.descripcion}>Descripción: {item.descripcion.substring(0, 50)}...</Text>
            <Text style={styles.precio}>Precio: ${item.precio}</Text>
            <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
            
          </View>
        </View>
      </TouchableOpacity>
    );
    return(
         <LinearGradient
                colors={['#0c2b2aff', '#000000']} // azul petróleo → negro
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              >

    
        <Text style={styles.title}>Mis Publicaciones</Text>
        <FlatList
                      data={articulos}
                      keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                      renderItem={renderItem}
                      contentContainerStyle={styles.lista}
                      refreshing={refreshing}
                      onRefresh={obtenerPublicacionesUsuarioLogueado}
                    />
              
                    <TouchableOpacity 
                      style={styles.refreshButton}
                      onPress={ obtenerPublicacionesUsuarioLogueado}
                    >
                      <Ionicons name="refresh" size={24} color="white" />
                      <Text style={styles.refreshButtonText}>Actualizar lista</Text>
                    </TouchableOpacity>
   
              </LinearGradient>
    )
}

const styles = StyleSheet.create({
 
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
     marginTop: 50,
    marginBottom: 20,
    color: '#ffffffff',
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
   lista: {
    paddingBottom: 20,
  },
    refreshButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PublicacionesUsuarioLogueado;