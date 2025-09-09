import React, { useState } from 'react';
import {ImageBackground, View,Text,TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../config/UrlApi';

const InicioSesionPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const image = require('../../img/fondo1.png');
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
      const response = await fetch(`${URL}iniciar-sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
        Alert.alert('Éxito', 'Inicio de sesión correcto');
        navigation.navigate('Carrusel');
      } else {
        Alert.alert('Error', data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <ImageBackground 
              source={image} 
              resizeMode="cover" 
              style={styles.image}
            >
      <View style={styles.holi}>
        <Image
      source={require('../../img/logo1.png')} // o { uri: 'URL' }
      style={styles.logo}/>
        
      </View>

        <View style={styles.card}>
      <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
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
          secureTextEntry
          placeholderTextColor="#aaa"
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
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.linkText}>
            ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate aquí</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('RestablecerContraseña')}
        >
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('FiltroAdmin')}
        >
          <Text style={styles.linkBold}>Administrar</Text>
        </TouchableOpacity>
       
      </View>
     </ImageBackground>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

   // si quieres redonda
container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
holi: {
  width: '100%',          
  alignSelf: 'center',    
  alignItems: 'center',   
  padding: 5,            
  paddingVertical: 5,    
  borderBottomLeftRadius: 50,  
  borderBottomRightRadius:50,     
  position: 'absolute',   
  top: 0,                 
  shadowColor: '#000',    
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
         
  zIndex: 10,             
},


  card: {
    width: '90%',
    borderRadius: 20,
    padding: 25,
    marginBottom: 150, 
    shadowColor: '#1c1b25c9',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  logo: {
    
    width: 250,
    height: 250,
    alignSelf: 'auto',
    justifyContent: 'flex-end',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#20eb4ca4',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 20,
    color: '#ffffffff',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#ffffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#006D77',
  },
  button: {
    
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
     borderWidth: 2,
    borderColor: '#006D77',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#b4b0b0ff',
    fontSize: 14,
  },
  linkBold: {
    color: '#006D77',
    fontWeight: 'bold',
  },
});

export default InicioSesionPantalla;
