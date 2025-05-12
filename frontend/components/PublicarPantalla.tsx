import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const PublicarPantalla: React.FC = () => {
  const [descripcion, setDescripcion] = useState('');
  const [nombre_Articulo, setNombre_Articulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoBicicleta, setTipoBicicleta] = useState('MTB');
  const [modalVisible, setModalVisible] = useState(false);

  const resetFormulario = () => {
    setNombre_Articulo('');
    setDescripcion('');
    setPrecio('');
    setFoto(null);
    setTipoBicicleta('MTB');
  };

  const PublicarBoton = async () => {
    console.log({ nombre_Articulo, descripcion, precio, tipoBicicleta, foto });

    try {
      const response = await fetch('http://10.0.2.2:3001/publicar_articulo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_Articulo,
          descripcion,
          precio,
          tipo_bicicleta: tipoBicicleta,
          foto,
        }),
      });

      if (response.ok) {
        setModalVisible(true);
        resetFormulario();
        setTimeout(() => setModalVisible(false), 2000);
      } else {
        alert('Error al publicar el artículo.');
      }
    } catch (error) {
      console.error('Error en la publicación:', error);
      alert('Hubo un problema al publicar el artículo.');
    }
  };

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a la cámara.');
      return;
    }

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
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a las fotos.');
      return;
    }

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
    <LinearGradient colors={['#f8f9fa', '#f8f9fa']} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Publicar un artículo</Text>

          <TextInput
            placeholder="Nombre del artículo"
            value={nombre_Articulo}
            onChangeText={setNombre_Articulo}
            style={styles.input}
          />

          <TextInput
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            style={styles.input}
            multiline
          />

          <TextInput
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo de bicicleta</Text>
            <Picker
              selectedValue={tipoBicicleta}
              onValueChange={(itemValue) => setTipoBicicleta(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="MTB" value="MTB" />
              <Picker.Item label="Ruta" value="Ruta" />
              <Picker.Item label="Fija" value="Fija" />
            </Picker>
          </View>

          {foto && (
            <Image
              source={{ uri: foto }}
              style={styles.image}
            />
          )}

          <TouchableOpacity onPress={tomarFoto} style={styles.button}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={seleccionarFoto} style={styles.button}>
            <Text style={styles.buttonText}>Seleccionar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={PublicarBoton} style={styles.publishButton}>
            <Text style={styles.publishText}>Publicar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Modal de confirmación */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#00c774" />
            <Text style={styles.modalText}>¡Publicado con éxito!</Text>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#444',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  pickerLabel: {
    paddingHorizontal: 12,
    paddingTop: 10,
    color: '#444',
    fontWeight: '600',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  publishButton: {
    backgroundColor: '#00c774',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  publishText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default PublicarPantalla;