import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { StackParamList } from '../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type DetallePublicacionRouteProp = RouteProp<StackParamList, 'DetallePublicacion'>;

interface Props {
  route: DetallePublicacionRouteProp;
}
const { width, height } = Dimensions.get('window');

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

const DetallePublicacion: React.FC<Props> = ({ route }) => {
  const { publicacion } = route.params;
  const navigation = useNavigation(); 

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* Header con flecha de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botonAtras}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <Image 
          source={{ uri: publicacion.foto }} 
          style={styles.imagenDetalle}
          resizeMode="contain"
        />
        
        <View style={styles.detalleContainer}>
          <Text style={styles.tituloDetalle}>{publicacion.nombre_articulo}</Text>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Precio</Text>
            <Text style={styles.precioDetalle}>${publicacion.precio}</Text>
          </View>
          
          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Descripción</Text>
            <Text style={styles.texto}>{publicacion.descripcion}</Text>
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
             <View style={styles.contenidoBoton}>
    <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
    <Text style={styles.textoMensajeAlVendedor}>Chatear por WhatsApp</Text>
  </View>
          </TouchableOpacity> 
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: height * 0.05,
    paddingHorizontal: 16,
  },
  botonAtras: {
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
    margin:5,
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
    color: '#fff',
  },
  seccion: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ccc',
  },
  texto: {
    fontSize: 16,
    color: '#ddd',
  },
  precioDetalle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ffb3',
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

export default DetallePublicacion;
