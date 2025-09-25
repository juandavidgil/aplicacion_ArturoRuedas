import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../../config/UrlApi";

// Configuración para mostrar notificaciones cuando la app está en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface Notificacion {
  id: number;
  titulo: string;
  cuerpo: string;
}

const NotificacionesPantalla: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<any>(null);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  // Cargar usuario logueado
  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioData = await AsyncStorage.getItem("usuario");
      if (usuarioData) setUsuario(JSON.parse(usuarioData));
    };
    cargarUsuario();
  }, []);

  // Registrar notificaciones y obtener token
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
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        setExpoPushToken(token);

        // Guardar token en backend
        if (usuario?.ID_usuario) {
          await axios.post(`${URL}/guardar-token`, {
            ID_usuario: usuario.ID_usuario,
            token,
          });
        }
      } catch (err) {
        console.error("Error obteniendo token de Expo:", err);
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

  // Listeners para notificaciones
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      setNotificaciones(prev => [
        { id: Date.now(), titulo: title || "", cuerpo: body || "" },
        ...prev,
      ]);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notificación interactuada:", response);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  // Obtener notificaciones guardadas en DB
  const cargarNotificacionesDB = async () => {
    try {
      if (!usuario?.ID_usuario) return;
      const res = await axios.get(`${URL}/notificaciones/${usuario.ID_usuario}`);
      setNotificaciones(res.data || []);
    } catch (err) {
      console.error("Error cargando notificaciones:", err);
    }
  };

  useEffect(() => {
    cargarNotificacionesDB();
  }, [usuario]);

  // Enviar notificación de prueba
  const enviarNotificacionPrueba = async () => {
    if (!expoPushToken || !usuario?.ID_usuario) {
      Alert.alert("Error", "No se encontró token de notificación.");
      return;
    }
    try {
      await axios.post(`${URL}/test-notification`, {
        ID_usuario: usuario.ID_usuario,
        token: expoPushToken,
      });
      Alert.alert("Éxito", "Notificación de prueba enviada 🚀");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo enviar la notificación de prueba.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <Button title="Probar Notificación" onPress={enviarNotificacionPrueba} />
      <FlatList
        data={notificaciones}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificacion}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.cuerpo}>{item.cuerpo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay notificaciones</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default NotificacionesPantalla;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  notificacion: { backgroundColor: "#111", padding: 10, borderRadius: 8, marginBottom: 10 },
  titulo: { fontWeight: "bold", color: "#fff", fontSize: 16 },
  cuerpo: { color: "#ccc", marginTop: 5 },
  empty: { color: "#888", textAlign: "center", marginTop: 50 },
});
