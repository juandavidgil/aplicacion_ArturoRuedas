import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, SafeAreaView, Alert, ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InicioSesionPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);

   const handleLogin = async () => {
    if (!correo || !contraseña) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    setCargando(true);
    try {
      const response = await fetch('http://10.0.2.2:3001/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Log para depuración
      
      if (response.ok) {
        // Guardar TODOS los datos del usuario incluyendo el ID
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
        console.log('Usuario guardado:', data.usuario); // Log para depuración
        Alert.alert('Éxito', 'Inicio de sesión correcto');
        navigation.navigate('Carrusel');
      } else {
        Alert.alert('Error', data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error completo al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.registerText}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('RestablecerContraseña')}
      >
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword} onPress={()=>navigation.navigate('FiltroAdmin')}>
        <Text>
          Administrar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4d82bc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#4d82bc',
    fontWeight: '500',
  },
  forgotPassword: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotText: {
    color: '#666',
  },
 
});

export default InicioSesionPantalla;