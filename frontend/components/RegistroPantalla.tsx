import React, { useState } from 'react';
import { 
  ImageBackground, Image, View, Text, TextInput, TouchableOpacity, 
  StyleSheet, SafeAreaView, Alert, ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types/types';
import {URL} from '../config/UrlApi'


const RegistroPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const image = require('../img/fondo1.png');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    if (!nombre || !correo || !contraseña || !telefono) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setCargando(true);
    try {
      const response = await fetch(`${URL}registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, contraseña, telefono }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Éxito', 'Registro completado correctamente');
        navigation.navigate('InicioSesion');
      } else {
        Alert.alert('Error', data.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'No se pudo completar el registro');
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
            source={require('../img/logo1.png')} // o { uri: 'URL' }
            style={styles.logo}/>
              
            </View>
      

       <View style={styles.card}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

      
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#aaa"
      />

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
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleRegistro}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => navigation.navigate('InicioSesion')}
      >
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
      </View>
       </ImageBackground> 
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
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
  card: {
    marginBottom: 30, 
    width: '90%',
    borderRadius: 20,
    padding: 25,
  },
holi: {
  width: '100%',          
  alignSelf: 'center',    
  alignItems: 'center',   
  padding: 10,            
  paddingVertical: 5,    
  borderBottomLeftRadius: 50,  
  borderBottomRightRadius:50,     
  position: 'absolute',   
  top: 0,                 
  zIndex: 10,            
},
logo: {
    
    width: 250,
    height: 250,
    alignSelf: 'auto',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontWeight: 900,
    color: '#20eb4ca4',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: 500,
    fontSize: 20,
    color: '#ffff',
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
  loginLink: {
    marginTop: 18,
    paddingVertical: 6,
     alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});



export default RegistroPantalla;