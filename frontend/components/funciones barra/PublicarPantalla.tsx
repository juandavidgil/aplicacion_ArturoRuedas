import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Modal, Image, Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../config/UrlApi';
import { KeyboardAvoidingView, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const PublicarPantalla: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const [nombre_Articulo, setNombre_Articulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [fotos, setFotos] = useState<string[]>([]); // ahora varias fotos
  const [tipoBicicleta, setTipoBicicleta] = useState('MTB');
  const [tipoComponente, setTipoComponente] = useState('ruedas');
  const [modalVisible, setModalVisible] = useState(false);
  const [ID_usuario, setID_usuario] = useState<number | null>(null);
  const [mostrarBarraComponentes, setMostrarBarraComponentes] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioStr = await AsyncStorage.getItem('usuario');
        if (usuarioStr) {
          const usuario = JSON.parse(usuarioStr);
          setID_usuario(usuario.ID_usuario);
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    };
    cargarUsuario();
  }, []);

  const resetFormulario = () => {
    setNombre_Articulo('');
    setDescripcion('');
    setPrecio('');
    setFotos([]);
    setTipoBicicleta('MTB');
    setTipoComponente('ruedas');
  };

const formatPrice = (value: string) => {
  // eliminar todo lo que no sea número
  const cleanValue = value.replace(/\D/g, "");

  if (!cleanValue) return "";

  // formatear con separadores de miles estilo colombiano
  const formatted = parseInt(cleanValue, 10).toLocaleString("es-CO");

  return `$ ${formatted}`; // agregamos el símbolo
};



  const PublicarBoton = async () => {
    if (!ID_usuario) {
      alert('Debes iniciar sesión para publicar artículos');
      return;
    }

    if (!nombre_Articulo || !descripcion || !precio || fotos.length === 0) {
      alert('Todos los campos y al menos una foto son obligatorios');
      return;
    }

    try {
      const formData = {
  nombre_Articulo,
  descripcion,
  precio: parseFloat(precio.replace(/[^0-9]/g, "")), // aquí lo limpiamos
  tipo_bicicleta: tipoBicicleta,
  tipo_componente: tipoComponente,
  fotos,
  ID_usuario
};


      const response = await fetch(`${URL}publicar_articulo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setModalVisible(true);
        resetFormulario();
        setTimeout(() => setModalVisible(false), 2000);
      } else {
        alert(data.error || 'Error al publicar el artículo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return alert('Permiso de cámara denegado');

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets.length > 0) {
      setFotos([...fotos, result.assets[0].uri]); // se agrega nueva foto
    }
  };

  const seleccionarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return alert('Permiso de galería denegado');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection: true, 
      selectionLimit: 5 // máximo 5 (ajústalo si quieres)
    });

    if (!result.canceled && result.assets.length > 0) {
      setFotos([...fotos, ...result.assets.map(asset => asset.uri)]);
    }
  };

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Publica un articulo</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              placeholder="Nombre del artículo*"
              value={nombre_Articulo}
              onChangeText={setNombre_Articulo}
              style={styles.input}
            />

            <TextInput
              placeholder="Descripción*"
              value={descripcion}
              onChangeText={setDescripcion}
              style={[styles.input, { height: 100 }]}
              multiline
            /> 
            <TextInput
  placeholder="Precio*"
  value={precio}
  onChangeText={(text) => setPrecio(formatPrice(text))}
  keyboardType="numeric"
  style={styles.input}
/>

            


            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Tipo Bicicleta</Text>
              <Picker selectedValue={tipoBicicleta} onValueChange={setTipoBicicleta} style={styles.picker}>
                <Picker.Item label="MTB" value="MTB" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="Ruta" value="Ruta" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="Fija" value="Fija" color={Platform.OS === "ios" ? "white" : "black"} />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Tipo de Componente</Text>
              <Picker selectedValue={tipoComponente} onValueChange={setTipoComponente} style={styles.picker}>
                <Picker.Item label="ruedas" value="ruedas" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="suspension" value="suspension" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="frenos" value="frenos" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="marco" value="marco" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="sillin" value="sillin" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="manubrio" value="manubrio" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="pedal" value="pedal" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="piñon" value="piñon" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="cadena" value="cadena" color={Platform.OS === "ios" ? "white" : "black"} />
                <Picker.Item label="plato" value="plato" color={Platform.OS === "ios" ? "white" : "black"} />
              </Picker>
            </View>

            {/* Carrusel horizontal de fotos seleccionadas */}
            {fotos.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 15 }}>
                {fotos.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.image} />
                ))}
              </ScrollView>
            )}

            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={tomarFoto} style={styles.photoButton}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.buttonText}>Tomar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={seleccionarFoto} style={styles.photoButton}>
                <Ionicons name="image" size={24} color="white" />
                <Text style={styles.buttonText}>Galería</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={PublicarBoton} style={styles.publishButton} disabled={!ID_usuario}>
              <Text style={styles.publishText}>
                {ID_usuario ? 'PUBLICAR' : 'INICIA SESIÓN PRIMERO'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Footer */}
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Publicar')}>
          <Ionicons name='storefront-outline' size={28} color="#ffffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
          <Ionicons name='cart-outline' size={28} color="#ffffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <Ionicons name='notifications-outline' size={28} color="#ffffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle-outline" size={28} color="#f3ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}>
          <Ionicons name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'} size={28} color="#ffffffff" />
        </TouchableOpacity>
      </View>

      {/* Modal de éxito */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#00c774" />
            <Text style={styles.modalText}>¡Artículo publicado!</Text>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    margin: 5, 
    marginTop:10
  },
  scrollContent: { 
    paddingHorizontal: 16 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: Platform.OS === "android" ? 10 : 5,
    marginBottom: Platform.OS === "android" ? 10 : 20,
  },
  backButton: {
    marginTop: Platform.OS === "android" ? 40 : 0,
    marginLeft: Platform.OS === "android" ? 2 : 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 2,
    marginTop: Platform.OS === "android" ? 40 : 0,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9b9',
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#004f4d',
    color: '#1c2b44ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  pickerContainer: {
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffffffff',
    elevation: 2,
  },
  pickerLabel: { padding: 15, color: '#dfd6d6ff', fontSize: 16 },
  picker: { color: '#fff', width: '100%', fontSize: 16, paddingVertical: 10, paddingHorizontal: 12 },
  image: {
    width: 150,
    height: 150,
    borderRadius: 14,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    backgroundColor: '#4a90e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: 'white', marginLeft: 8, fontWeight: '600', fontSize: 15 },
  publishButton: {
    backgroundColor: '#00c774',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginHorizontal: 9,
    marginBottom: 180,
    
  },
  publishText: { color: 'white', fontWeight: 'bold', fontSize: 17, letterSpacing: 0.5 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: {
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.015,
    backgroundColor: '#004f4d',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    paddingBottom: "7%",
  },
  modalText: { marginTop: 20, fontSize: 18, fontWeight: '600', color: '#2d3748', textAlign: 'center' },
});

export default PublicarPantalla;
