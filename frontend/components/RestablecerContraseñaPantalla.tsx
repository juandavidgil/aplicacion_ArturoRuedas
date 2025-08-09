import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import {URL} from '../config/UrlApi'

const RestablecerContraseñaPantalla: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const enviarCodigo = async () => {
    try {
      const response = await fetch(`${URL}enviar-correo-reset`, {
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

  const cambiarContraseña = async () => {
    try {
      const response = await fetch(`${URL}restablecer-contrasena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, nuevaContraseña }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('✅', data.mensaje);
        // Redirige a login si usas React Navigation
      } else {
        Alert.alert('⚠️', data.mensaje);
      }
    } catch (error) {
      console.error('Error restableciendo:', error);
      Alert.alert('❌ Error de red', 'Intenta más tarde.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Restablecer Contraseña</Text>
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={{ borderBottomWidth: 1 }} />
      {!codigoEnviado ? (
        <TouchableOpacity onPress={enviarCodigo}>
          <Text>Enviar código</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput placeholder="Código" value={codigo} onChangeText={setCodigo} style={{ borderBottomWidth: 1 }} />
          <TextInput
            placeholder="Nueva contraseña"
            value={nuevaContraseña}
            onChangeText={setNuevaContraseña}
            secureTextEntry
            style={{ borderBottomWidth: 1 }}
          />
          <TouchableOpacity onPress={cambiarContraseña}>
            <Text>Restablecer</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default RestablecerContraseñaPantalla;