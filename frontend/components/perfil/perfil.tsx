import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/types';
import { URL } from '../../config/UrlApi';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Usuario {
  ID_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
 /*  foto?: string; */
}

const PerfilPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken"); 
      await AsyncStorage.removeItem("userData");  

      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Presentacion" }], 
      });

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  useEffect(() => {
    const fetchUsuario = async () => {
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
      try {
        const response = await fetch(`${URL}usuario/${ID_usuario}`);
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
     {/*  {usuario?.foto ? (
        <Image source={{ uri: usuario.foto }} style={styles.avatar} />
      ) : (
        <Image source={require("../assets/avatar.png")} style={styles.avatar} /> 
      )} */}

      {/* Datos del usuario */}
      <Text style={styles.name}>{usuario?.nombre}</Text>
      <Text style={styles.info}>Correo: {usuario?.correo}</Text>
      <Text style={styles.info}>Teléfono: {usuario?.telefono}</Text>

      {/* Botones */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar mi información</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PublicacionesUsuarioLogueado')}
      >
        <Text style={styles.buttonText}>Ver mis publicaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.dangerButton]}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
    

      {/* Botón cerrar sesión */}
      <TouchableOpacity  onPress={handleLogout}>
        <Text>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  dangerButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PerfilPantalla;
