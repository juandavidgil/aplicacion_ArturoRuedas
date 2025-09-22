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

const RegistroPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const image = require('../../img/fondo1.png');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

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

  // ----------------- FOTO -----------------
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

      // Copiar content:// a cache si es necesario
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

      // Copiar content:// a cache si es necesario
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

  const handleRegistro = async () => {
    if (!nombre || !correo || !contraseña || !telefono || !foto) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validarCorreo(correo)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    setCargando(true);

    try {
      let fotoBase64: string | null = null;

      if (foto) {
        // Convertir a JPEG y base64
        const manipResult = await ImageManipulator.manipulateAsync(
          foto,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        if (!manipResult.base64) throw new Error('No se pudo generar Base64');

        fotoBase64 = `data:image/jpeg;base64,${manipResult.base64}`;
      }

      const response = await fetch(`${URL}/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña, telefono, foto: fotoBase64 }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Registro completado correctamente');
        limpiarFormulario();
        navigation.navigate('InicioSesion');
      } else {
        Alert.alert('Error', data.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro');
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
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={seleccionarFoto} style={styles.photoButton}>
                <Text style={styles.buttonText}>Seleccionar Foto</Text>
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
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#006D77',
    backgroundColor: '#4a90e2',
  },
});

export default RegistroPantalla;
