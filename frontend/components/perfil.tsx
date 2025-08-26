import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerfilPantalla: React.FC = () =>  {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  //cerrar sesión
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

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>

      <TouchableOpacity>
        <Text>Editar mi información</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PublicacionesUsuarioLogueado')}>
        <Text>Ver mis publicaciones</Text>
      </TouchableOpacity>

      {/* Botón cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    marginTop: 40,
    
  },
  logoutText: {
    color: '#080808ff',
    fontSize: 20,
    
  }
})

export default PerfilPantalla;
