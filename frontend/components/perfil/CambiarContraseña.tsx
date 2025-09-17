import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList, Usuario } from "../../types/types";
import { URL } from "../../config/UrlApi";

type CambiarPassRouteProp = RouteProp<StackParamList, "CambiarContrasena">;
type CambiarPassNavProp = NativeStackNavigationProp<StackParamList, "CambiarContrasena">;

interface Props {
  route: CambiarPassRouteProp;
}

const CambiarContrasena: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<CambiarPassNavProp>();
  const { usuario } = route.params; // 👈 usuario recibido desde Perfil

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");

  const handleCambiarContrasena = async () => {
    if (!passwordActual || !passwordNueva || !passwordConfirmar) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (passwordNueva !== passwordConfirmar) {
      Alert.alert("Error", "Las contraseñas nuevas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${URL}CambiarContrasena/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordActual,
          passwordNueva,
        }),
      });

      if (!response.ok) throw new Error("Error al cambiar la contraseña");

      Alert.alert("Éxito", "Tu contraseña ha sido actualizada.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo cambiar la contraseña.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Contraseña actual</Text>
      <TextInput
        style={styles.input}
        value={passwordActual}
        onChangeText={setPasswordActual}
        secureTextEntry
      />

      <Text style={styles.label}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        value={passwordNueva}
        onChangeText={setPasswordNueva}
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar nueva contraseña</Text>
      <TextInput
        style={styles.input}
        value={passwordConfirmar}
        onChangeText={setPasswordConfirmar}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCambiarContrasena}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CambiarContrasena;

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
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
