import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type DetallePublicacionRouteProp = RouteProp<StackParamList, 'DetallePublicacion'>;

  

interface Props {
  route: DetallePublicacionRouteProp;
}
const { width, height } = Dimensions.get('window');

const enviarWhatsApp = (numero: string, mensaje: string) => {
  // Limpiamos el número: solo dígitos
  const numeroFormateado = numero.replace(/\D/g, ''); 
  const url = `whatsapp://send?phone=57${numeroFormateado}&text=${encodeURIComponent(mensaje)}`;

  // Intentamos abrir WhatsApp directamente
  Linking.openURL(url).catch(() => {
    // Si falla, usamos WhatsApp Web como fallback
    const urlWeb = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(urlWeb).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp ni WhatsApp Web');
    });
  });
};


const DetallePublicacion: React.FC<Props> = ({ route }) => {
  const { publicacion, id_vendedor } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  console.log('se recibio el id del vendedor' , id_vendedor)
 

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
        {/* Carrusel de fotos */}
        <FlatList
          data={publicacion.fotos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image 
              source={{ uri: item }} 
              style={styles.imagenDetalle}
              resizeMode="contain"
            />
          )}
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

          {/* Sección Vendedor con foto al lado del nombre */}
          <View style={styles.seccion}>
            <TouchableOpacity 
           onPress={() => navigation.navigate('PublicacionesRelacionadasVendedor', {id_vendedor })}
           >

            <Text style={styles.subtitulo}>Vendedor</Text>
            <View style={styles.vendedorContainer}>
              <Image
                source={publicacion?.foto ? { uri: publicacion.foto } : require('../../img/avatar.png')}
                style={styles.avatar}
              />
              <Text style={styles.textoVendedor}>{publicacion.nombre_vendedor}</Text>
            </View>
            </TouchableOpacity>
          </View>

          {/* Botón WhatsApp */}
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
    margin: 5,
  },
  imagenDetalle: {
    width: width,
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
  vendedorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    borderWidth: 2, 
    borderColor: "#007bff",
  },
  textoVendedor: {
    fontSize: 16,
    color: '#ddd',
    marginLeft: 10,
    fontWeight: '600',
  },
  botonMensajeAlVendedor: {
    backgroundColor: '#f4f8f6ff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 90,
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
