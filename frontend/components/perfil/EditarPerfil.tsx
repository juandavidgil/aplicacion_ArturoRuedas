import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/types";
import { URL } from "../../config/UrlApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const ActualizarInformacion = async () => {
    try {
        console.log(usuario.id_usuario)
      const response = await fetch(`${URL}EditarUsuario/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono }),
      });
      

      if (!response.ok) throw new Error("Error al actualizar usuario");

      const data = await response.json();

      // Guardar en AsyncStorage también
      await AsyncStorage.setItem("usuario", JSON.stringify(data));

      Alert.alert("Éxito", "Tu información ha sido actualizada.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar la información.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={ActualizarInformacion}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditarPerfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
