import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, FlatList, Dimensions } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
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

const { width } = Dimensions.get('window');

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
          { text: 'Rechazar', onPress: () => setIsChecked(false), style: 'cancel' },
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const response = await fetch(`${URL}marcar-vendido/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`Error ${response.status}: ${errorText}`);
                }
                Alert.alert('Éxito', 'La publicación fue marcada como vendida ✅');
                navigation.goBack();
              } catch (error) {
                console.error('Error al marcar como vendida:', error);
                Alert.alert(
                  'Error',
                  'No se pudo marcar como vendida. Verifica la conexión al servidor.'
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

  const renderFoto = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.imagenCarrusel} resizeMode="contain" />
  );

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {publicacion.fotos && publicacion.fotos.length > 0 && (
          <FlatList
            data={publicacion.fotos}
            renderItem={renderFoto}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carrusel}
          />
        )}

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
  carrusel: {
    maxHeight: 300,
  },
  imagenCarrusel: {
    width: width,
    height: 300,
  },
  detalleContainer: {
    padding: 20,
  },
  tituloDetalle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f971aff',
  },
  seccion: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffffff',
  },
  texto: {
    fontSize: 16,
    color: '#666',
  },
  precioDetalle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2dec14ff',
  },
});

export default DetallePublicacionLogueado;
