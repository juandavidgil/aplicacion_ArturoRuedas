
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StackParamList } from '../../types/types';
import {View, ImageBackground, Image, Text,TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { SafeAreaView } from 'react-native-safe-area-context';


const FiltroAdminPantalla : React.FC = () =>{
     const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
     const image = require('../../img/fondo1.png');
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
            

            if(response.ok){
                await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
                
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
            <Text style={styles.title}>Administrador</Text>
<Text style={styles.subtitle}>Ingresa credenciales para admin</Text>
        
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
     </ImageBackground> 
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff'
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
  padding: 10,            
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
    marginBottom: 130, 
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
    fontWeight: 'bold',
    fontSize: 16,
  },
 
 
 
});

export default FiltroAdminPantalla