
import React, { useState } from "react";
import {SafeAreaView,View,Text,StyleSheet,ImageBackground,Image,TouchableOpacity,TextInput,ScrollView,KeyboardAvoidingView,Platform,Alert,Linking} from "react-native";
import { Ionicons } from '@expo/vector-icons';

type FormData = {
  nombre: string;
  email: string;   
  mensaje: string;
};

const socialLinks = [
  {
    name: "Facebook",
    icon: <Ionicons name="logo-facebook" size={28} color="white" />,
    url: "https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Des_LA",
    bgColor: "#1877F2"
  },
  {
    name: "Instagram",
    icon: <Ionicons name="logo-instagram" size={28} color="white" />,
    url: "https://www.instagram.com/arturo_sobre_ruedas",
    bgColor: "#E1306C"
  },
  {
    name: "TikTok",
    icon: <Ionicons name="logo-tiktok" size={28} color="white" />,
    url: "https://www.tiktok.com/@arturo_sobre_ruedas",
    bgColor: "#000000"
  }
];

// función para abrir WhatsApp con un número fijo
const enviarWhatsApp = (mensaje: string) => {
  const numero = "3236870976"; // tu número sin +57
  const numeroFormateado = numero.replace(/\D/g, "");
  const url = `whatsapp://send?phone=57${numeroFormateado}&text=${encodeURIComponent(mensaje)}`;

  Linking.openURL(url).catch(() => {
    const urlWeb = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(urlWeb).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp ni WhatsApp Web");
    });
  });
};

export default function ContactScreen() {
  const [form, setForm] = useState<FormData>({ nombre: "", email: "", mensaje: "" });

  const handleChange = (key: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  // ahora el submit manda a WhatsApp
  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.mensaje.trim()) {
      Alert.alert("Completa el formulario", "Por favor, llena tu nombre y mensaje.");
      return;
    }

    const mensaje = `Hola! Soy ${form.nombre}.\n\n${form.mensaje}`;
    enviarWhatsApp(mensaje);

    Alert.alert("Enviando mensaje", "Se abrirá WhatsApp para continuar.");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>¡Contáctanos!</Text>
            <Text style={styles.subtitle}>Síguenos en nuestras redes o envíanos un mensaje directo.</Text>

            {/* Redes Sociales */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Síguenos en Redes Sociales</Text>
              <Text style={styles.cardSubtitle}>
                Mantente conectado con nosotros y no te pierdas las últimas novedades.
              </Text>

              <View style={{ marginTop: 12 }}>
                {socialLinks.map((s) => (
                  <TouchableOpacity
                    key={s.name}
                    style={styles.socialRow}
                    onPress={() => Linking.openURL(s.url)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.iconWrap, { backgroundColor: s.bgColor }]}>
                      {s.icon}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.socialName}>{s.name}</Text>
                      <Text style={styles.socialHint}>Síguenos en {s.name}</Text>
                    </View>

                    <View style={styles.chev}>
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Info */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { marginBottom: 8 }]}>Información</Text>
              <View style={styles.infoRow}>
                <View style={styles.infoBullet} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>WhatsApp</Text>
                  <Text style={styles.infoValue}>+57 323 687 0976</Text>
                </View>
              </View>
            </View>

            {/* Formulario */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Envíanos un mensaje</Text>
              <Text style={styles.cardSubtitle}>Completa el formulario y te contactaremos por WhatsApp.</Text>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Juan Pérez"
                  placeholderTextColor="#999"
                  value={form.nombre}
                  onChangeText={(t) => handleChange("nombre", t)}
                />

                <Text style={styles.label}>Mensaje</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Escribe tu mensaje aquí..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={5}
                  value={form.mensaje}
                  onChangeText={(t) => handleChange("mensaje", t)}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.9}>
                  <Text style={styles.buttonText}>💬 Enviar por WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 36 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(2,7,21,0.55)" },
  scrollContent: { padding: 20, paddingTop: 36 },
  title: { fontSize: 34, fontWeight: "700", color: "#E6F7FF", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 15, color: "#cbd5e1", textAlign: "center", marginBottom: 18 },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6
  },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 18 },
  cardSubtitle: { color: "#bcd1de", fontSize: 13, marginTop: 6 },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginVertical: 6,
    backgroundColor: "rgba(255,255,255,0.02)"
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  socialName: { color: "#fff", fontWeight: "600" },
  socialHint: { color: "#b4c6d6", fontSize: 12 },
  chev: { paddingLeft: 8 },
  infoRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 10 },
  infoBullet: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#8ee0c0",
    marginRight: 10,
    marginTop: 6
  },
  infoLabel: { color: "#fff", fontWeight: "600" },
  infoValue: { color: "#cbd5e1", fontSize: 13 },
  label: { color: "#cbd5e1", marginTop: 8, marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    marginBottom: 8
  },
  textarea: { minHeight: 110, textAlignVertical: "top" },
  button: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366" // color WhatsApp
  },
  buttonText: { color: "#fff", fontWeight: "700" }
});