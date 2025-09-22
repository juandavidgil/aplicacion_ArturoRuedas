import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { URL } from '../../config/UrlApi';
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RestablecerContraseñaPantalla: React.FC = () => {
   const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  // 📧 Enviar código al correo
  const enviarCodigo = async () => {
    if (!correo) {
      Alert.alert('⚠️', 'Por favor ingresa tu correo');
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
        Alert.alert('✅', data.mensaje);
        setCodigoEnviado(true);
      } else {
        Alert.alert('⚠️', data.mensaje);
      }
    } catch (error) {
      console.error('Error enviando código:', error);
      Alert.alert('❌ Error de red', 'Intenta más tarde.');
    }
  };

  // 🔄 Cambiar la contraseña
  const cambiarContraseña = async () => {
    if (!codigo || !nuevaContraseña) {
      Alert.alert('⚠️', 'Ingresa el código y la nueva contraseña');
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
        Alert.alert('✅', data.mensaje);
       navigation.navigate('InicioSesion');
      } else {
        Alert.alert('⚠️', data.mensaje);
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
