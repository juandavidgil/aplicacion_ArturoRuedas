import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';


export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  contraseña: string;
  foto: string;
}


const Administrador: React.FC = () => {
  const image = require('../../img/fondo1.png');
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  


  const obtenerUsuarios = async () => {     
    try {
      setRefreshing(true);
      const response = await fetch(`${URL}/obtener-usuarios`);

    
      
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
            const response = await fetch(`${URL}/eliminar-usuario/${id}`, {
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
          onPress={()=>navigation.navigate('InformacionUsuarioAdmin', {usuario : item})}> 
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
    color: '#fff',
    letterSpacing: 1,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00e6a8',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#f5f5f5',
    marginBottom: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  blockButton: {
    backgroundColor: '#5a67d8', // azul violeta
  },
  deleteButton: {
    backgroundColor: '#e53e3e', // rojo sobrio
  },
  adminPublicaciones: {
    backgroundColor: '#3182ce', // azul consistente
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  refreshButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
});


export default Administrador;