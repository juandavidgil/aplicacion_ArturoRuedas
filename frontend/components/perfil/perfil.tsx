import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/types';
import { URL } from '../../config/UrlApi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
interface Usuario {
  Id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  foto: string;
  constraseña: string;
}
const { width, height } = Dimensions.get('window');


const PerfilPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
   const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false);

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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0c2b2a', '#000']} style={styles.gradient}>
       {/* 🔹 Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Perfil</Text>
      <View style={{ width: 28 }} /> 
      {/* espacio para balancear el ícono */}
    </View>
      <View style={styles.container}>
        
        {/* Tarjeta central */}
        <View style={styles.card}>
       <Image
  source={ usuario?.foto ? { uri: usuario.foto } : require('../../img/avatar.png') }
  style={styles.avatar}
/>


          
          <Text style={styles.name}>{usuario?.nombre}</Text>
          <Text style={styles.info}>Correo: {usuario?.correo}</Text>
          <Text style={styles.info}>Telefono: {usuario?.telefono}</Text>

          {/* Botones */}
          <TouchableOpacity style={styles.button}
        //  onPress={() => navigation.navigate("EditarPerfil", { usuario: usuario })}
          >
            <LinearGradient colors={['#64eb76ff', '#23bd15ff']} style={styles.buttonBg}>
              <Text style={styles.buttonText}> 🖋️ Editar mi información</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PublicacionesUsuarioLogueado')}
          >
            <LinearGradient colors={['#23bd15ff', '#15922aff']} style={styles.buttonBg}>
              <Text style={styles.buttonText}>📄 Ver mis publicaciones</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
          //  onPress={() => navigation.navigate('CambiarContrasena', { usuario })}
          style={styles.button}>
            <LinearGradient colors={['#15922aff', '#155206ff']} style={styles.buttonBg}>
              <Text style={styles.buttonText}>🔒 Cambiar contraseña</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient colors={['#ff416c', '#ff4b2b']} style={styles.buttonBg}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
  {/* foother */}
            <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
            <Ionicons name='storefront-outline' size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
            <Ionicons name='cart-outline' size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <Ionicons name='notifications-outline' size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}>
            <Ionicons name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'} size={28} color="#fff" />
          </TouchableOpacity> 
        </View>


    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 15,
  paddingTop: 50, // margen superior (útil para notch en iOS)
  paddingBottom: 15,
  backgroundColor: "#004f4d",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 5,
},
headerTitle: {
  color: "#fff",
  fontSize: 25,
  fontWeight: "bold",
},

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#00c6ff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  info: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 5,
  },
  button: {
    marginTop: 15,
    width: "100%",
  },
  buttonBg: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 25,
    width: "90%",
  },
    iconBar: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    paddingVertical: height * 0.015, 
    backgroundColor: '#004f4d',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6, 
    paddingBottom:"7%",
  },
});

export default PerfilPantalla;
