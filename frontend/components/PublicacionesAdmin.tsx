import React,{ useState, useEffect}  from "react";
import { View,Text,FlatList,TouchableOpacity,TextInput,Alert, StyleSheet, Image, ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Administrador from "./Administrador";

interface Publicacion {
  ID_publicacion: number;
  nombre_Articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;

}

const PublicacionesAdmin : React.FC = () => {
     const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
      const [articulos, setPublicaciones] = useState<Publicacion[]>([]);
      const [refreshing, setRefreshing] = useState(false);

       const obtenerPublicaciones = async () => {     
         try {
           setRefreshing(true);
           const response = await fetch('http://10.0.2.2:3001/obtener-publicaciones');
           
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
           console.error('Error al obtener usuarios:', error);
           Alert.alert('Error', 'No se pudieron cargar los usuarios. Verifica la conexión al servidor.');
         } finally {
           setRefreshing(false);
         }
       };
 useEffect(() => {
    obtenerPublicaciones();
  }, []);
    const renderItem = ({ item }: { item: Publicacion }) => (
      <TouchableOpacity>
    <View style={styles.card}>
      <Image 
        source={{ uri: item.foto }} 
        style={styles.imagen} 
        resizeMode="cover" 
        onError={() => console.log("Error cargando imagen")}
      />

      <View style={styles.info}>
       <Text style={styles.nombre}>id {item.ID_publicacion}</Text>
        <Text style={styles.nombre}>nombre articulo {item.nombre_Articulo}</Text>
        <Text style={styles.descripcion}>descripcion {item.descripcion}</Text>
        <Text style={styles.precio}>precio {item.precio}</Text>
        <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
        <Text style={styles.tipo}>id_vendedor: {item.nombre_vendedor}</Text>
     
        {/* <TouchableOpacity 
          onPress={() => eliminarArticulo(item.id)}
          style={styles.botonEliminar}
          >
          <Ionicons name="trash-outline" size={20} color="#e63946" />
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity> */}
       
      </View>
    </View>
  </TouchableOpacity>
  );

    return(
      <View style={styles.container}>
            <Text style={styles.titulo}>ADMINISTRAR USUARIOS</Text>
            
            <FlatList
              data={articulos}
              /* keyExtractor={(item) => item.ID_publicacion?.toString() || Math.random().toString()} */
              renderItem={renderItem}
              contentContainerStyle={styles.lista}
              refreshing={refreshing}
              onRefresh={obtenerPublicaciones}
            />
      
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={ obtenerPublicaciones}
            >
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.refreshButtonText}>Actualizar lista</Text>
            </TouchableOpacity>
      
           
          </View>
        
    )

}
//estiloss
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
    adminPublicaciones: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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






export default PublicacionesAdmin



