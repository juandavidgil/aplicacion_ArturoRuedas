import React, { useEffect, useState } from "react";
import { View, Text, Button, Platform, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuración del handler para que muestre notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
     shouldShowBanner: true,
     shouldShowList: true,
  }),
});

const NotificacionesPantalla: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<any>(null);

  // ✅ Cargar el usuario logueado desde AsyncStorage
  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioData = await AsyncStorage.getItem("usuario");
      if (usuarioData) {
        setUsuario(JSON.parse(usuarioData));
      }
    };
    cargarUsuario();
  }, []);

  // ✅ Registrar notificaciones
  useEffect(() => {
    const registrarNotificaciones = async () => {
      if (!Device.isDevice) {
        Alert.alert("Debes usar un dispositivo físico para probar notificaciones.");
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Error", "No se otorgaron permisos para notificaciones.");
        return;
      }

      try {
        const token = (await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })).data;

        setExpoPushToken(token);

        // ✅ Guardar token en el backend con el campo correcto
        if (usuario?.ID_usuario) {
         await axios.post("http://192.168.100.6:3001/test-notification", {
  ID_usuario: usuario?.ID_usuario ?? 1,
});

        }
      } catch (error) {
        console.error("Error obteniendo token de Expo:", error);
      }
    };

    registrarNotificaciones();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }, [usuario]);

  // ✅ Botón para probar notificación
  const enviarNotificacionPrueba = async () => {
    if (!expoPushToken) {
      Alert.alert("Error", "No se encontró token de notificación.");
      return;
    }

    try {
      await axios.post("http://192.168.100.6:3001/test-notification", {
        ID_usuario: usuario?.ID_usuario ?? 1,
        token: expoPushToken,
      });

      Alert.alert("Éxito", "Notificación de prueba enviada 🚀");
    } catch (error) {
      console.error("Error enviando notificación de prueba:", error);
      Alert.alert("Error", "No se pudo enviar la notificación de prueba.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <Button title="Probar Notificación" onPress={enviarNotificacionPrueba} />
      {expoPushToken && (
        <Text style={styles.token}>
          Token: {expoPushToken.substring(0, 30)}...
        </Text>
      )}
    </View>
  );
};

export default NotificacionesPantalla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  token: {
    marginTop: 20,
    fontSize: 12,
    color: "#bbb",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
