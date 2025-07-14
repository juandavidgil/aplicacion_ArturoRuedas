import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types/types';

interface Publicacion {
  ID_publicacion: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  foto: string;
  nombre_vendedor: string;

}
const DetallePublicacion : React.FC = () =>{
    useEffect(() => {
  const fetchId = async () => {
    try {
      const id = await AsyncStorage.getItem('idPublicacionSeleccionada');
      if (id) setPublicacionId(parseInt(id));
    } catch (error) {
      console.error('Error obteniendo ID:', error);
    }
  };
  
  fetchId();
}, []);
     const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
     const [publicacionId, setPublicacionId] = useState<number | null>(null);
    const renderItem = ({ item }: { item: Publicacion }) => (
          
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
            <Text style={styles.precio}>Precio: {item.precio}</Text>
            <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
            <Text style={styles.tipo}>Vendedor: {item.nombre_vendedor}</Text>
         
             {/* <TouchableOpacity 
              onPress={() => eliminarArticulo(item.id)}
              style={styles.botonEliminar}
              >
              <Ionicons name="trash-outline" size={20} color="#e63946" />
              <Text style={styles.textoEliminar}>Eliminar</Text>
            </TouchableOpacity>  */}
           
          </View>
        </View>
     
      );
return(
    <View style={styles.container}>
        <Text style={styles.titulo} >
            Detalles de la publicacion
        </Text>
        
       
   </View>
   

   
    
)
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
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
    titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
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
})


export default DetallePublicacion;