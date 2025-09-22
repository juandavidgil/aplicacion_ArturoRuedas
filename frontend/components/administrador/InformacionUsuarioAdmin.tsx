import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  Linking, 
  Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type InformacionUsuarioAdminRouteProp = RouteProp<
  StackParamList,
  "InformacionUsuarioAdmin"
>;

interface Props {
  route: InformacionUsuarioAdminRouteProp;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  foto: string;
}

const enviarWhatsApp = (numero: string, mensaje: string) => {
  // Limpiamos el número: solo dígitos
  const numeroFormateado = numero.replace(/\D/g, ''); 
  const url = `whatsapp://send?phone=57${numeroFormateado}&text=${encodeURIComponent(mensaje)}`;

  // Intentamos abrir WhatsApp directamente
  Linking.openURL(url).catch(() => {
    // Si falla, usamos WhatsApp Web como fallback
    const urlWeb = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(urlWeb).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp ni WhatsApp Web');
    });
  });
};


const InformacionUsuarioAdmin: React.FC<Props> = ({ route }) => {
  const { usuario } = route.params;

  return (
    <LinearGradient
      colors={["#0c2b2aff", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar */}
        <Image
          source={
            usuario?.foto
              ? { uri: usuario.foto }
              : require("../../img/avatar.png")
          }
          style={styles.avatar}
        />

        {/* Información */}
        <View style={styles.detalleContainer}>
          <Text style={styles.tituloDetalle}>{usuario.nombre}</Text>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>ID del usuario</Text>
            <Text style={styles.texto}>{usuario.id_usuario}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Correo</Text>
            <Text style={styles.texto}>{usuario.correo}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Teléfono</Text>
            <Text style={styles.precioDetalle}>{usuario.telefono}</Text>
          </View>

          {/* Botón de WhatsApp */}
          <TouchableOpacity
            onPress={() =>
              enviarWhatsApp(
                usuario.telefono,
                `Hola ${usuario.nombre}, esperamos te encuentres muy bien, somos los administradores de Arturo Ruedas y queremos comunicarnos contigo por la siguiente razón`
              )
            }
            style={styles.botonMensaje}
          >
            <View style={styles.contenidoBoton}>
              <Ionicons name="logo-whatsapp" size={22} color="#fff" />
              <Text style={styles.textoBoton}>Chatear por WhatsApp</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#20eb4ca4",
  },
  detalleContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 20,
  },
  tituloDetalle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#20eb4ca4",
    textAlign: "center",
    marginBottom: 20,
  },
  seccion: {
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#bbb",
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
    color: "#eee",
  },
  precioDetalle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  botonMensaje: {
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  contenidoBoton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textoBoton: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default InformacionUsuarioAdmin;
