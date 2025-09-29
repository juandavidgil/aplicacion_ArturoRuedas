import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { URL } from '../../config/UrlApi';
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomModal from '../detalle y publicaciones/CustomModal';

const RestablecerContraseñaPantalla: React.FC = () => {
   const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [modalSuccess, setModalSuccess] = useState(true);

const mostrarModal = (mensaje: string, exito: boolean) => {
  setModalMessage(mensaje);
  setModalSuccess(exito);
  setModalVisible(true);

  setTimeout(() => {
    setModalVisible(false);
  }, 2000);
};

  // 📧 Enviar código al correo
  const enviarCodigo = async () => {
    if (!correo) {
      mostrarModal("⚠️ Por favor ingresa tu correo", false);
      return;
    }

    try {
      
      const response = await fetch(`${URL}/enviar-correo-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });
      const data = await response.json();

      if (response.ok) {
        mostrarModal("✅ " + data.mensaje, true);
        setCodigoEnviado(true);
      } else {
        mostrarModal("⚠️ " + data.mensaje, false);
      }
    } catch (error) {
      console.error('Error enviando código:', error);
      Alert.alert('❌ Error de red', 'Intenta más tarde.');
    }
  };

  // 🔄 Cambiar la contraseña
  const cambiarContraseña = async () => {
    if (!codigo || !nuevaContraseña) {
      mostrarModal("⚠️ Ingresa el código y la nueva contraseña", false);
      return;
    }

    try {
      const response = await fetch(`${URL}/restablecer-contrasena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, nuevaContraseña }),
      });
      const data = await response.json();

      if (response.ok) {
      mostrarModal("✅ " + data.mensaje, true);
       navigation.navigate('InicioSesion');
      } else {
        mostrarModal("⚠️ " + data.mensaje, false);
      }
    } catch (error) {
      console.error('Error restableciendo:', error);
      Alert.alert('❌ Error de red', 'Intenta más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {!codigoEnviado ? (
        <TouchableOpacity style={styles.button} onPress={enviarCodigo}>
          <Text style={styles.buttonText}>Enviar código</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            placeholder="Código"
            value={codigo}
            onChangeText={setCodigo}
            style={styles.input}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Nueva contraseña"
            value={nuevaContraseña}
            onChangeText={setNuevaContraseña}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={cambiarContraseña}>
            <Text style={styles.buttonText}>Restablecer</Text>
          </TouchableOpacity>
        </>
      )}
      <CustomModal 
  visible={modalVisible}
  message={modalMessage}
  success={modalSuccess}
  onClose={() => setModalVisible(false)}
/>

    </View>
  );
};

export default RestablecerContraseñaPantalla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: '#004f4d',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#004f4d',
    marginBottom: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#004f4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
