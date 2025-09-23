import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/types";
import { URL } from "../../config/UrlApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../inicio de sesion/userContext";

type EditarPerfilRouteProp = RouteProp<StackParamList, "EditarPerfil">;
type EditarPerfilNavProp = NativeStackNavigationProp<StackParamList, "EditarPerfil">;

interface Props {
  route: EditarPerfilRouteProp;
}

const EditarPerfil: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<EditarPerfilNavProp>();
  const { usuario } = route.params;

  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);
  const [telefono, setTelefono] = useState(usuario.telefono);

  const { setUsuario } = useContext(UserContext); // 👈 usamos setUsuario para actualizar el contexto

  const ActualizarInformacion = async () => {
    try {
      const response = await fetch(`${URL}/EditarUsuario/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono }),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      const data = await response.json();

      // Actualizar AsyncStorage y Contexto
      await AsyncStorage.setItem("usuario", JSON.stringify(data));
      setUsuario(data);

      Alert.alert("Éxito", "Tu información ha sido actualizada.");
      navigation.goBack(); // 👈 vuelve a la pantalla anterior (perfil)
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar la información.");
    }
  };

  return (
    <LinearGradient
      colors={["#0c2b2aff", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Editar Perfil</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            placeholder="ejemplo@email.com"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            placeholder="Número de teléfono"
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={ActualizarInformacion}
          >
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#004f4d",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffffff",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
