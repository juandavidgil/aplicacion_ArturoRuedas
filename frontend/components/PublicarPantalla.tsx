import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Modal, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../config/UrlApi'

const PublicarPantalla: React.FC = () => {
  const [descripcion, setDescripcion] = useState('');
  const [nombre_Articulo, setNombre_Articulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoBicicleta, setTipoBicicleta] = useState('MTB');
   const [tipoComponente, setTipoComponente] = useState('Llantas');
  const [modalVisible, setModalVisible] = useState(false);
  const [ID_usuario, setID_usuario] = useState<number | null>(null);

  // Cargar ID del usuario al montar el componente
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
    setFoto(null);
    setTipoBicicleta('MTB');
    setTipoComponente('Llantas')
  };

  const PublicarBoton = async () => {
    if (!ID_usuario) {
      alert('Debes iniciar sesión para publicar artículos');
      return;
    }

    if (!nombre_Articulo || !descripcion || !precio || !foto) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const formData = {
        nombre_Articulo,
        descripcion,
        precio: parseFloat(precio),
        tipo_bicicleta: tipoBicicleta,
        tipo_componente: tipoComponente,
        foto,
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
      setFoto(result.assets[0].uri);
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
    });

    if (!result.canceled && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
     <LinearGradient
                    colors={['#0c2b2aff', '#000000']} // azul petróleo → negro
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}
                  >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Publicar un artículo</Text>

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
            onChangeText={setPrecio}
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo Bicicleta</Text>
            <Picker
              selectedValue={tipoBicicleta}
              onValueChange={setTipoBicicleta}
              style={styles.picker}
            >
              <Picker.Item label="MTB" value="MTB" color='#ffff'/>
              <Picker.Item label="Ruta" value="Ruta"color='#ffff'/>
              <Picker.Item label="Fija" value="Fija" color='#ffff' />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo de Componente </Text>
            <Picker
              selectedValue={tipoComponente}
              onValueChange={setTipoComponente}
              style={styles.picker}
            >
              <Picker.Item label="Llantas" value="Llantas"  color='#ffff'/>
              <Picker.Item label="Marco" value="Marco" color='#ffff'/>
              <Picker.Item label="Pedales" value="Pedales" color='#ffff'/>
            </Picker>
          </View>
          {foto && (
            <Image source={{ uri: foto }} style={styles.image} />
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

          <TouchableOpacity 
            onPress={PublicarBoton} 
            style={styles.publishButton}
            disabled={!ID_usuario}
          >
            <Text style={styles.publishText}>
              {ID_usuario ? 'PUBLICAR' : 'INICIA SESIÓN PRIMERO'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

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
 gradient: { flex: 1 },
  container: {
    padding: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 0.5,
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
    overflow: 'hidden',
    elevation: 2,
  },
  pickerLabel: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  picker: {
    height:"18%",
    width: '100%',
    color: '#e6efffff',
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 14,
    marginVertical: 15,
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
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
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 15,
  },
  publishButton: {
    backgroundColor: '#00c774',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  publishText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
  modalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
  },
});


export default PublicarPantalla;