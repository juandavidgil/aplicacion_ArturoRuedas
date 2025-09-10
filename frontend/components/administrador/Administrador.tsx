import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';
import InformacionUsuarioAdmin from "./InformacionUsuarioAdmin";

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
}


const Administrador: React.FC = () => {
  const image = require('../../img/fondo1.png');
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  


  const obtenerUsuarios = async () => {     
    try {
      setRefreshing(true);
      const response = await fetch(`${URL}obtener-usuarios`);

    
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
       
      
      // Validación de datos
      if (!Array.isArray(data)) {
        throw new Error("La respuesta no es un array válido");
      }

      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios. Verifica la conexión al servidor.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleEliminarUsuario = async (usuario: Usuario) => {
  const id = Number(usuario.id_usuario || usuario.id_usuario); 

  
  
  if (!id || isNaN(id)) {
    console.error("❌ ID de usuario inválido o no numérico:", usuario);
    Alert.alert('Error', 'ID de usuario no válido');
    return;
  }

  try {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar a ${usuario.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            const response = await fetch(`${URL}eliminar-usuario/${id}`, {
              method: 'DELETE'
            });

            if (response.ok) {
              await obtenerUsuarios();
              Alert.alert("Éxito", "Usuario eliminado correctamente");
            } else {
              const errorText = await response.text();
              throw new Error(errorText);
            }
          }
        }
      ]
    );
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    Alert.alert('Error', 'No se pudo eliminar el usuario');
  }
};

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const renderItem = ({ item }: { item: Usuario }) => {
   



  return (
    
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.label}>ID: <Text style={styles.value}>{item.id_usuario}</Text></Text>
        <Text style={styles.label}>Nombre: <Text style={styles.value}>{item.nombre}</Text></Text>
        <Text style={styles.label}>Correo: <Text style={styles.value}>{item.correo}</Text></Text>
        <Text style={styles.label}>Teléfono: <Text style={styles.value}>{item.telefono}</Text></Text>

        <View style={styles.buttonsContainer}>
       <TouchableOpacity 
        style={styles.adminPublicaciones} 
        onPress={ () => navigation.navigate('PublicacionesAdmin', { ID_usuario : item.id_usuario}) }
        
      >
        <Text style={styles.buttonText}>Publicaciones</Text>
      </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, styles.blockButton]}
          onPress={()=>navigation.navigate('InformacionUsuarioAdmin', {ID_usuario : item.id_usuario})}> 
            <Text style={styles.buttonText}>Ver mas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleEliminarUsuario(item)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

  return (
      <LinearGradient
            colors={['#0c2b2aff', '#000000']} // azul petróleo → negro
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          >
    <View style={styles.container}>
       
      <Text style={styles.titulo}>ADMINISTRAR USUARIOS</Text>
      
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id_usuario?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        refreshing={refreshing}
        onRefresh={obtenerUsuarios}
      />


      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={obtenerUsuarios}
      >
        <Ionicons name="refresh" size={24} color="white" />
        <Text style={styles.refreshButtonText}>Actualizar lista</Text>
      </TouchableOpacity>
     
    </View>

  </LinearGradient>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
   
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
     marginTop: 50,
    marginBottom: 20,
    color: '#ffffffff',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    margin:12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#555',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  blockButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  adminPublicaciones: {
    backgroundColor: '#28a745',
    borderRadius: 6,
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
   

   },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
   



  adminPublicacionesText: {
    color: 'white',
    fontWeight: 'bold',
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

export default Administrador;