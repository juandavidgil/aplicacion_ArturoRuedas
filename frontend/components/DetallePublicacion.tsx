import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StackParamList } from '../types/types';
import { RouteProp } from '@react-navigation/native';

type DetallePublicacionRouteProp = RouteProp<StackParamList, 'DetallePublicacion'>;

interface Props {
  route: DetallePublicacionRouteProp;
}

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
});

export default DetallePublicacion;