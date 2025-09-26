// src/screens/ContactScreen.tsx
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
    icon: require("../../img/facebook.jpg"),
    url: "https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Des_LA",
    bgColor: "#1877F2"
  },
  {
    name: "Instagram",
    icon: require("../../img//icon-insta.jpg"),
    url: "https://instagram.com/tuempresa",
    bgColor: "#E1306C"
  },
  {
    name: "TikTok",
    icon: require("../../img//tik tok.jpg"),
    url: "https://www.tiktok.com/@arturo_sobre_ruedas",
    bgColor: "#000000"
  }
];

export default function Contactenos() {
  const [form, setForm] = useState<FormData>({ nombre: "", email: "", mensaje: "" });

  const handleChange = (key: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "No se pudo abrir el enlace.");
      }
    } catch (err) {
      Alert.alert("Error", "Ocurrió un error al abrir el enlace.");
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      Alert.alert("Completa el formulario", "Por favor, llena todos los campos.");
      return;
    }

    const subject = encodeURIComponent("Mensaje desde la app - Arturo Ruedas");
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\n\nMensaje:\n${form.mensaje}`
    );
    const mailto = `mailto:contacto@miempresa.com?subject=${subject}&body=${body}`;

    await openLink(mailto);
    Alert.alert("Abriendo cliente de correo", "Se abrirá tu app de correo.");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
       /*  source={require("../../assets/background-cyclist.png")} */
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
                    onPress={() => openLink(s.url)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.iconWrap, { backgroundColor: s.bgColor }]}>
                      <Image source={s.icon} style={styles.iconImage} resizeMode="contain" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.socialName}>{s.name}</Text>
                      <Text style={styles.socialHint}>Síguenos en {s.name}</Text>
                    </View>

                    <View style={styles.chev}>
                      <Text style={{ color: "#666" }}>›</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardTitle, { marginBottom: 8 }]}>Información</Text>
              <View style={styles.infoRow}>
                <View style={styles.infoBullet} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>contacto@miempresa.com</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoBullet} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Teléfono</Text>
                  <Text style={styles.infoValue}>+57 300 000 0000</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Envíanos un mensaje</Text>
              <Text style={styles.cardSubtitle}>Completa el formulario y te contactaremos a la brevedad.</Text>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Juan Pérez"
                  placeholderTextColor="#999"
                  value={form.nombre}
                  onChangeText={(t) => handleChange("nombre", t)}
                />

                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="juan@ejemplo.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(t) => handleChange("email", t)}
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
                  <Text style={styles.buttonText}>✉️  Enviar mensaje</Text>
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

  socialRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 6, borderRadius: 10, marginVertical: 6, backgroundColor: "rgba(255,255,255,0.02)" },
  iconWrap: { width: 46, height: 46, borderRadius: 46, alignItems: "center", justifyContent: "center", marginRight: 12 },
  iconImage: { width: 28, height: 28, tintColor: "#fff" },
  socialName: { color: "#fff", fontWeight: "600" },
  socialHint: { color: "#b4c6d6", fontSize: 12 },

  chev: { paddingLeft: 8 },

  infoRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 10 },
  infoBullet: { width: 10, height: 10, borderRadius: 6, backgroundColor: "#8ee0c0", marginRight: 10, marginTop: 6 },
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
    backgroundColor: "#6D28D9"
  },
  buttonText: { color: "#fff", fontWeight: "700" }
});
