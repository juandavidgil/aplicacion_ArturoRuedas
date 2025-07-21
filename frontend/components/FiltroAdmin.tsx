
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StackParamList } from '../types/types';
import {View,Text,TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from './UrlApi'


const FiltroAdminPantalla : React.FC = () =>{
     const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [usuario, setUsuario] = useState ('')
    const [contraseña, setContraseña] = useState('')
    const [contraseña2, setContraseña2] = useState('')
    const [cargando, setCargando] = useState(false);

    const ingresarAdmin = async()=> {
        if(!usuario || !contraseña || !contraseña2){
            Alert.alert('Error', 'por favor ingrese correo y contraseña');
            return
        }
        setCargando(true);
        try{
            const response = await fetch(`${URL}iniciar-administrador`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({usuario, contraseña, contraseña2}),
            });
             const data = await response.json();
            console.log('Respuesta del servidor:', data); // Log para depuración

            if(response.ok){
                await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
                console.log('usuario guardado:', data.usuario);
                Alert.alert('Incio de sesion correcto');
                navigation.navigate('Administrador')
            } else{
                Alert.alert('Error', data.error ||'credenciales incorrectas')
            }
        }catch (error){
                console.error('Error completo al iniciar sesión:', error);
                Alert.alert('Error', 'No se pudo iniciar sesión');
        }finally {
      setCargando(false);
    }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Confirma tus credenciales de administrador</Text>
            
            <TextInput style={styles.input} placeholder='usuario admin' onChangeText={setUsuario} value={usuario}/>
            
            
            <TextInput style={styles.input} placeholder='contraseña 1' onChangeText={setContraseña} value={contraseña} secureTextEntry/>
            
            
            <TextInput style={styles.input} placeholder='contraseña 2' onChangeText={setContraseña2} value={contraseña2} secureTextEntry/>
            
            <TouchableOpacity style={styles.button} onPress={ingresarAdmin}>
                 {cargando ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                <Text style={styles.buttonText}>Confirmar</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
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
 
 
 
});

export default FiltroAdminPantalla