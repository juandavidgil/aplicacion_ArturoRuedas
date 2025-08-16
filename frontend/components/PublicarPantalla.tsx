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
              <Picker.Item label="MTB" value="MTB" />
              <Picker.Item label="Ruta" value="Ruta" />
              <Picker.Item label="Fija" value="Fija" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo de Componente </Text>
            <Picker
              selectedValue={tipoComponente}
              onValueChange={setTipoComponente}
              style={styles.picker}
            >
              <Picker.Item label="Llantas" value="Llantas" />
              <Picker.Item label="Marco" value="Marco" />
              <Picker.Item label="Pedales" value="Pedales" />
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
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#ffffffff'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },
  pickerLabel: {
    padding: 15,
    color: '#666',
    fontSize: 16
  },
  picker: {
    width: '100%'
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600'
  },
  publishButton: {
    backgroundColor: '#00c774',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3
  },
  publishText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%'
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default PublicarPantalla;