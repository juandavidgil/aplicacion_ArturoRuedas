import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { URL } from '../../config/UrlApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type DetallePublicacionLogueadoRouteProp = RouteProp<
  StackParamList,
  'DetallePublicacionLogueado'
>;

interface Props {
  route: DetallePublicacionLogueadoRouteProp;
}

const DetallePublicacionLogueado: React.FC<Props> = ({ route }) => {
  const { publicacion, id } = route.params;
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

 
  const [isChecked, setIsChecked] = useState(false);

  const presionCheckBox = () => {
    const nuevoValor = !isChecked;
    setIsChecked(nuevoValor);

    if (nuevoValor) {
      Alert.alert(
        'Se eliminará la publicación',
        '¿Deseas continuar?',
        [
          {
            text: 'Rechazar',
            onPress: () => {
              
              setIsChecked(false);
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
                

                Alert.alert('Éxito', 'La publicación fue marcada como vendida ✅');
                navigation.goBack()
              } catch (error) {
                console.error('Error al marcar como vendida la publicación:', error);
                Alert.alert(
                  'Error',
                  'No se pudo marcar como vendida la publicación. Verifica la conexión al servidor.'
                );
                setIsChecked(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
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

          <CheckBox title="Vendido" checked={isChecked} onPress={presionCheckBox} />
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
});

export default DetallePublicacionLogueado;