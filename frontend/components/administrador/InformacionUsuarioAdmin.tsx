import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';

type InformacionUsuarioAdminRouteProp = RouteProp<
  StackParamList,
  'InformacionUsuarioAdmin'
>;

interface Props {
  route: InformacionUsuarioAdminRouteProp;
}
export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
}

const enviarWhatsApp = (numero: string, mensaje: string) => {
  const numeroFormateado = numero.replace(/\D/g, '');
  const url = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;

  Linking.canOpenURL(url)
    .then((soporta) => {
      if (!soporta) {
        Alert.alert('Error', 'Parece que WhatsApp no está instalado');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('❌ Error al abrir WhatsApp:', err));
};

const InformacionUsuarioAdmin: React.FC<Props> = ({route}) => {
const { usuario } = route.params;
console.log("usuario que llego a esta pantalla:", usuario)
  return (
  <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {/* aqui va la foto de perfil */}
    {/*     <Image
          source={{ uri: publicacion.foto }}
          style={styles.imagenDetalle}
          resizeMode="contain"
        />
 */}
        <View style={styles.detalleContainer}>
          <Text style={styles.tituloDetalle}>{usuario.nombre}</Text>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Correo</Text>
            <Text style={styles.texto}>{usuario.correo}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Telefono</Text>
            <Text style={styles.precioDetalle}>${usuario.telefono}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>ID del usuario</Text>
            <Text style={styles.texto}>{usuario.id_usuario}</Text>
          </View>
 <TouchableOpacity 
            onPress={() => enviarWhatsApp(usuario.telefono, `Hola ${usuario.nombre}, esperamos te encuentres muy bien, somos los administradores de Arturo Ruedas y queremos comunicarnos contigo por la siguiente razón`)}
            style={styles.botonMensajeAlVendedor}
          >
             <View style={styles.contenidoBoton}>
    <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
    <Text style={styles.textoMensajeAlVendedor}>Chatear por WhatsApp</Text>
  </View>
          </TouchableOpacity> 
         
        </View>
      </ScrollView>
    </LinearGradient>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagenDetalle: {
    width: '100%',
    height: 300,
  },
  detalleContainer: {
    padding: 20,
  },
  tituloDetalle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#911414ff',
  },
  seccion: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  texto: {
    fontSize: 16,
    color: '#666',
  },
  precioDetalle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ec2314ff',
  },
  botonMensajeAlVendedor: {
    backgroundColor: '#f4f8f6ff',
    paddingVertical: 16,
   
    borderRadius: 30,
    alignItems: 'center',
     justifyContent: 'center',
    marginTop: 10,
    marginBottom:90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginHorizontal: 10,
  },
  contenidoBoton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
textoMensajeAlVendedor: {
  color: "#25D366",
  marginLeft: 10,
  fontWeight: '600',
  fontSize: 16,
},
});




export default InformacionUsuarioAdmin;