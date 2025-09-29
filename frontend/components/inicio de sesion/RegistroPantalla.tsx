import React, { useState, useCallback } from 'react';
import { 
  ImageBackground, Image, View, Text, TextInput, TouchableOpacity, 
  StyleSheet, SafeAreaView, Alert, ActivityIndicator, ScrollView 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import { StackParamList } from '../../types/types';
import { URL } from '../../config/UrlApi';
import CustomModal from '../detalle y publicaciones/CustomModal';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const RegistroPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const image = require('../../img/fondo1.png');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);

  // ----------------- FETCH CON TIMEOUT (EXACTO COMO PUBLICAR) -----------------
  const fetchWithTimeout = (url: string, options: any, timeout = 20000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tiempo de espera excedido")), timeout)
      ),
    ]);
  };

  const mostrarModal = (mensaje: string, exito: boolean) => {
    setModalMessage(mensaje);
    setModalSuccess(exito);
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setCorreo("");
    setContraseña("");
    setTelefono("");
    setFoto("");
  };

  useFocusEffect(
    useCallback(() => {
      limpiarFormulario();
    }, [])
  );

  // ----------------- FOTO (EXACTO COMO PUBLICAR) -----------------
  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return alert('Permiso de cámara denegado');

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets.length > 0) {
      let uri = result.assets[0].uri;
      if (uri.startsWith('content://')) {
        const nombreArchivo = uri.split('/').pop();
        const cacheUri = `${FileSystem.cacheDirectory}${nombreArchivo}`;
        await FileSystem.copyAsync({ from: uri, to: cacheUri });
        uri = cacheUri;
      }
      setFoto(uri);
    }
  };

  const seleccionarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return alert('Permiso de galería denegado');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets.length > 0) {
      let uri = result.assets[0].uri;
      if (uri.startsWith('content://')) {
        const nombreArchivo = uri.split('/').pop();
        const cacheUri = `${FileSystem.cacheDirectory}${nombreArchivo}`;
        await FileSystem.copyAsync({ from: uri, to: cacheUri });
        uri = cacheUri;
      }
      setFoto(uri);
    }
  };
  // ----------------- FIN FOTO -----------------

  const validarCorreo = (correo: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // ----------------- REGISTRO (EXACTO COMO PUBLICAR) -----------------
  const handleRegistro = async () => {
    if (!nombre || !correo || !contraseña || !telefono || !foto) {
      mostrarModal("Todos los campos son obligatorios", false);
      return;
    }

    if (!validarCorreo(correo)) {
      mostrarModal("Por favor ingresa un correo electrónico válido", false);
      return;
    }

    setCargando(true);

    try {
      let fotoBase64: string | null = null;

      if (foto) {
        const manipResult = await ImageManipulator.manipulateAsync(
          foto,
          [{ resize: { width: 600 } }], // ⬅️ EXACTO igual que Publicar
          {
            compress: 0.5, // ⬅️ EXACTO igual que Publicar
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        if (!manipResult.base64) {
          throw new Error("No se pudo generar Base64 de la imagen"); // ⬅️ EXACTO igual que Publicar
        }

        fotoBase64 = `data:image/jpeg;base64,${manipResult.base64}`;
      }

      const formData = {
        nombre,
        correo,
        contraseña, 
        telefono,
        foto: fotoBase64
      };

      const response: any = await fetchWithTimeout(
        `${URL}/registrar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
        20000 // ⬅️ EXACTO igual que Publicar
      );

      const data = await response.json();

      if (response.ok) {
        mostrarModal("Registro completado correctamente", true);
        limpiarFormulario();
        navigation.navigate('InicioSesion');
      } else {
        mostrarModal(data.error || "Error en el registro", false);
      }
    } catch (error: any) {
      console.error("Error:", error);
      mostrarModal(error.message || "Error de conexión", false); // ⬅️ EXACTO igual que Publicar
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 180 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.holi}>
            <Image source={require('../../img/logo1.png')} style={styles.logo} />
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

            {foto && (
              <Image 
                source={{ uri: foto }} 
                style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 15, alignSelf: 'center' }} 
              />
            )}

            <View style={styles.photoButtonContainer}>
              <TouchableOpacity onPress={tomarFoto} style={styles.photoButton}>
                <LinearGradient
                  colors={["#20eb4c", "#006D77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Ionicons name="camera" size={30} color="#fff" style={{ marginRight: 8 }} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={seleccionarFoto} style={styles.photoButton}>
                <LinearGradient
                  colors={["#4a90e2", "#006D77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Ionicons name="images" size={30} color="#fff" style={{ marginRight: 8 }} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={contraseña}
              onChangeText={setContraseña}
              placeholderTextColor="#aaa"
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRegistro} 
              disabled={cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('InicioSesion')}
            >
              <Text style={styles.linkText}>
                ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        success={modalSuccess}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center' },
  card: { marginTop: 200, width: '90%', borderRadius: 20, padding: 25, marginLeft: 22 },
  holi: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  logo: { width: 250, height: 250, alignSelf: 'auto', justifyContent: 'flex-end' },
  title: { fontSize: 30, fontWeight: '900', color: '#20eb4ca4', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontWeight: '500', fontSize: 20, color: '#ffff', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#ffffffff', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 2, borderColor: '#006D77' },
  button: { paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 5, borderWidth: 2, borderColor: '#006D77' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginLink: { marginTop: 18, paddingVertical: 6, alignItems: 'center' },
  linkText: { color: '#b4b0b0ff', fontSize: 14 },
  linkBold: { color: '#006D77', fontWeight: 'bold' },
  photoButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  photoButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
  },
});

export default RegistroPantalla;