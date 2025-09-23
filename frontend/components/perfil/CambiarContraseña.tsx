import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/types";
import { URL } from "../../config/UrlApi";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../inicio de sesion/userContext";

type CambiarPassRouteProp = RouteProp<StackParamList, "CambiarContrasena">;
type CambiarPassNavProp = NativeStackNavigationProp<
  StackParamList,
  "CambiarContrasena"
>;

interface Props {
  route: CambiarPassRouteProp;
}

const CambiarContrasena: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<CambiarPassNavProp>();
  const { usuario } = route.params;

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");

  const { logout } = useContext(UserContext);

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
      const response = await fetch(
        `${URL}/CambiarContrasena/${usuario.id_usuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passwordActual,
            passwordNueva,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al cambiar la contraseña");

      Alert.alert(
        "Éxito",
        "Tu contraseña ha sido actualizada. Vuelve a iniciar sesión."
      );

      // Cerrar sesión por seguridad
      await logout();

      // Redirigir a la pantalla de presentación
      navigation.reset({
        index: 0,
        routes: [{ name: "Presentacion" }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo cambiar la contraseña.");
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
        <Text style={styles.header}>Cambiar Contraseña</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Contraseña actual</Text>
          <TextInput
            style={styles.input}
            value={passwordActual}
            onChangeText={setPasswordActual}
            secureTextEntry
            placeholder="Ingresa tu contraseña actual"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Nueva contraseña</Text>
          <TextInput
            style={styles.input}
            value={passwordNueva}
            onChangeText={setPasswordNueva}
            secureTextEntry
            placeholder="Ingresa tu nueva contraseña"
            placeholderTextColor="#888"
          />

          <Text style={styles.label}>Confirmar nueva contraseña</Text>
          <TextInput
            style={styles.input}
            value={passwordConfirmar}
            onChangeText={setPasswordConfirmar}
            secureTextEntry
            placeholder="Confirma tu nueva contraseña"
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleCambiarContrasena}
          >
            <Text style={styles.buttonText}>Cambiar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CambiarContrasena;

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
