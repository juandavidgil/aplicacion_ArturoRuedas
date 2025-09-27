import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
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
  const numeroFormateado = numero.replace(/\D/g, '');
  const url = `whatsapp://send?phone=57${numeroFormateado}&text=${encodeURIComponent(mensaje)}`;
  Linking.openURL(url).catch(() => {
    const urlWeb = `https://wa.me/57${numeroFormateado}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(urlWeb).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp ni WhatsApp Web');
    });
  });
};

const DetallePublicacion: React.FC<Props> = ({ route }) => {
  const { publicacion, id_vendedor } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [indexFoto, setIndexFoto] = useState(0);

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botonAtras}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Carrusel de fotos */}
        <FlatList
          data={publicacion.fotos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndexFoto(newIndex);
          }}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imagenDetalle} resizeMode="cover" />
          )}
        />

        {/* Indicadores de foto */}
        <View style={styles.dotsContainer}>
          {publicacion.fotos.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, indexFoto === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* Tarjeta con información */}
        <View style={styles.detalleContainer}>
          <Text style={styles.tituloDetalle}>{publicacion.nombre_articulo}</Text>

          <Text style={styles.precioDetalle}>${publicacion.precio}</Text>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Descripción</Text>
            <Text style={styles.texto}>{publicacion.descripcion}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Tipo de bicicleta</Text>
            <Text style={styles.texto}>{publicacion.tipo_bicicleta}</Text>
          </View>

          {/* Vendedor */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PublicacionesRelacionadasVendedor', { id_vendedor })}
            style={styles.vendedorCard}
          >
            <Image
              source={publicacion?.foto ? { uri: publicacion.foto } : require('../../img/avatar.png')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.textoVendedor}>{publicacion.nombre_vendedor}</Text>
              <Text style={styles.subtextoVendedor}>Ver más publicaciones</Text>
            </View>
          </TouchableOpacity>

          {/* Botón WhatsApp */}
          <TouchableOpacity
            onPress={() =>
              enviarWhatsApp(
                publicacion.telefono,
                `Hola ${publicacion.nombre_vendedor}, estoy interesado en tu artículo: ${publicacion.nombre_articulo}, ¿aun sigue disponible?`
              )
            }
            style={styles.botonWhatsapp}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
            <Text style={styles.textoWhatsapp}>Chatear por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: height * 0.05,
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 2,
  },
  botonAtras: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  imagenDetalle: {
    width: width,
    height: 320,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -25,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
  },
  detalleContainer: {
    backgroundColor: '#1a1a1a',
    margin: 15,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  tituloDetalle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  precioDetalle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ffb3',
    marginBottom: 20,
  },
  seccion: {
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#bbb',
    marginBottom: 5,
  },
  texto: {
    fontSize: 15,
    color: '#eee',
    lineHeight: 22,
  },
  vendedorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 12,
    marginVertical: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: '#00ffb3',
    marginRight: 12,
  },
  textoVendedor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subtextoVendedor: {
    fontSize: 13,
    color: '#aaa',
  },
  botonWhatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
  },
  textoWhatsapp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DetallePublicacion;
