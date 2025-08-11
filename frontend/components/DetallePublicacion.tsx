import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity } from 'react-native';
import { StackParamList } from '../types/types';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type DetallePublicacionRouteProp = RouteProp<StackParamList, 'DetallePublicacion'>;

interface Props {
  route: DetallePublicacionRouteProp;
}
const enviarWhatsApp = (numero: string, mensaje: string) => {
  const numeroFormateado = numero.replace(/\D/g, ''); // Elimina cualquier carácter que no sea número
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
const DetallePublicacion: React.FC<Props> = ({ route }) => {
  const { publicacion } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: publicacion.foto }} 
        style={styles.imagenDetalle}
        resizeMode="contain"
      />
      
      <View style={styles.detalleContainer}>
        <Text style={styles.tituloDetalle}>{publicacion.nombre_articulo}</Text>
        
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Descripción</Text>
          <Text style={styles.texto}>{publicacion.descripcion}</Text>
        </View>
        
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Precio</Text>
          <Text style={styles.precioDetalle}>${publicacion.precio}</Text>
        </View>
        
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Tipo de bicicleta</Text>
          <Text style={styles.texto}>{publicacion.tipo_bicicleta}</Text>
        </View>
        
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Vendedor</Text>
          <Text style={styles.texto}>{publicacion.nombre_vendedor}</Text>
          
        </View>
        <TouchableOpacity 
  onPress={() => enviarWhatsApp(publicacion.telefono, `Hola ${publicacion.nombre_vendedor}, estoy interesado en tu artículo: ${publicacion.nombre_articulo}`)}
  style={styles.botonMensajeAlVendedor}
>
  <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
  <Text style={styles.textoMensajeAlVendedor}>Chatear por WhatsApp</Text>
</TouchableOpacity> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imagenDetalle: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  detalleContainer: {
    padding: 20,
  },
  tituloDetalle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    color: '#2c7a7b',
  },
  botonMensajeAlVendedor :{
     flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textoMensajeAlVendedor:{
color:"#51AFF7"
  },
});

export default DetallePublicacion;