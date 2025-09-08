import React from 'react';
import { 
  ImageBackground, View, Text, TouchableOpacity, 
  StyleSheet, SafeAreaView, Pressable 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types/types';
import * as Google from 'expo-auth-session/providers/google';

// ❌ Elimina esta línea:
// import e from 'express';

// ✅ Botón de Login con Google
export function BtnLoginGoogle() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '100451952741-b29qvc76ukf762aj5p9nmto97caodqt4.apps.googleusercontent.com', 
    iosClientId: '',
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
       
        
      } else {
        
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <Pressable style={styles.button} onPress={handleGoogleLogin}>
      <Text style={styles.buttonText}>Inicia con Google</Text>
    </Pressable>
  );
}

// Pantalla principal
const PresentacionPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const image = require('../img/principal.png');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={image} 
        resizeMode="cover" 
        style={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>ARTURO RUEDAS</Text>
            <Text style={styles.subtitle}>Personaliza sin limites</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('InicioSesion')}
              >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.registerButton]}
                onPress={() => navigation.navigate('Registro')}
              >
                <Text style={[styles.buttonText, styles.registerButtonText]}>Registrarse</Text>
              </TouchableOpacity>

              {/* ✅ Botón de Google funcionando */}
              <BtnLoginGoogle />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: "#006D77",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4d82bc',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: "#006D77",
  },
  registerButtonText: {
    color: '#fff',
  },
});

export default PresentacionPantalla;
