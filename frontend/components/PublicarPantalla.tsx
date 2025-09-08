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
import {URL} from '../config/UrlApi'

const { width, height } = Dimensions.get('window');
const PublicarPantalla: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const [nombre_Articulo, setNombre_Articulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoBicicleta, setTipoBicicleta] = useState('MTB');
   const [tipoComponente, setTipoComponente] = useState('Llantas');
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
              <Picker.Item label="ruedas" value="ruedas"  color='#ffff'/>
              <Picker.Item label="marco" value="marco" color='#ffff'/>
              <Picker.Item label="pedal" value="pedal" color='#ffff'/>
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
          
            <TouchableOpacity onPress={()=> navigation.navigate('Perfil')}>
                    <Ionicons name="person-circle-outline" size={28} color="#f3ffffff"></Ionicons>
            </TouchableOpacity>
            {/* Botón de componentes */}
            
            <TouchableOpacity onPress={() => setMostrarBarraComponentes(!mostrarBarraComponentes)}>
              <Ionicons name={mostrarBarraComponentes ? 'close-outline' : 'menu-outline'} size={28} color="#ffffffff" />
            </TouchableOpacity> 
          </View>

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
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.1,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginVertical: height * 0.02,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#f9f9f9b9',
    borderRadius: 12,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: '#004f4d',
    color: '#1c2b44ff',
  },
  pickerContainer: {
    borderRadius: 12,
    marginBottom: height * 0.02,
    borderWidth: 2,
    borderColor: '#ffffffff',
    overflow: 'hidden',
  },
  pickerLabel: {
    padding: height * 0.015,
    textAlign: 'center',
    color: '#ffffffff',
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  picker: {
    width: '100%',
    height: height * 0.07,
    color: '#e6efffff',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 14,
    marginVertical: height * 0.02,
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: height * 0.015,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.015,
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    color: 'white',
    marginLeft: width * 0.02,
    fontWeight: '600',
    fontSize: width * 0.038,
  },
  publishButton: {
    backgroundColor: '#00c774',
    paddingVertical: height * 0.022,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  publishText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.045,
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
    paddingBottom: height * 0.03,
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