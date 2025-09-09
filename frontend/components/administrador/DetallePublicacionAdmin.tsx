import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { URL } from '../../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, useNavigation } from '@react-navigation/native';


type DetallePublicacionAdminRouteProp = RouteProp<
  StackParamList,
  'DetallePublicacionAdmin'
>;

interface Props {
  route: DetallePublicacionAdminRouteProp;
}

const DetallePublicacionAdmin: React.FC<Props> = ({ route }) => {
  const { publicacion, id } = route.params;
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  
  const EliminarPublicacion = () => {
   

    
      Alert.alert(
        'Se eliminará la publicación',
        '¿Deseas continuar?',
        [
          {
            text: 'Rechazar',
            onPress: () => {
              
              
            },
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const response = await fetch(`${URL}marcar-vendido/${id}`, {
                  method: 'DELETE',
                });
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`Error ${response.status}: ${errorText}`);
                }
                const data = await response.json();
                

                Alert.alert('Éxito', 'La publicación fue eliminada ✅');
                navigation.goBack()
                
              } catch (error) {
                console.error('Error eliminar la publicación:', error);
                Alert.alert(
                  'Error',
                  'No se pudo eliminar la publicación. Verifica la conexión al servidor.'
                );
                
              }
            },
          },
        ],
        { cancelable: false }
      );
    
  };

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
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

          <TouchableOpacity  style={styles.eliminarPublicacion}  onPress={EliminarPublicacion}>
            <Text>Eliminar publicacion</Text>
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
  eliminarPublicacion:{
    borderColor: '#ffffffff',
    padding: 16,
    color: '#ffffffff',
  }
});

export default DetallePublicacionAdmin;
