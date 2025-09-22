import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import type { StackNavigationProp } from '@react-navigation/stack';
import { URL } from '../../config/UrlApi';

const { width, height } = Dimensions.get('window');

type DetallePublicacionAdminRouteProp = RouteProp<StackParamList, 'DetallePublicacionAdmin'>;

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
        { text: 'Rechazar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: async () => {
            try {
              const response = await fetch(`${URL}/eliminar-publicaciones-admin/${id}`, {
                method: 'DELETE',
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
              }
              const data = await response.json();
              Alert.alert('Éxito', 'La publicación fue eliminada ✅');
              navigation.goBack();
            } catch (error) {
              console.error('Error eliminar la publicación:', error);
              Alert.alert('Error', 'No se pudo eliminar la publicación. Verifica la conexión al servidor.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderFotos = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.imagenDetalle} resizeMode="contain" />
  );

  return (
    <LinearGradient
      colors={['#0c2b2aff', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Carrusel de fotos */}
        <FlatList
          data={publicacion.fotos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderFotos}
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

          {/* Sección Vendedor estilo consistente */}
          <View style={styles.vendedorContainer}>
            <Image
              source={publicacion?.foto ? { uri: publicacion.foto } : require('../../img/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.vendedorInfo}>
              <Text style={styles.subtitulo}>Vendedor</Text>
              <Text style={styles.texto}>{publicacion.nombre_vendedor}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.botonEliminar} onPress={EliminarPublicacion}>
            <Text style={styles.textoBotonEliminar}>Eliminar publicación</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  imagenDetalle: { width: width, height: 300, backgroundColor: '#e0e0e0' },
  detalleContainer: { padding: 20 },
  tituloDetalle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  seccion: { marginBottom: 20 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#ccc' },
  texto: { fontSize: 16, color: '#ddd' },
  precioDetalle: { fontSize: 22, fontWeight: 'bold', color: '#00ffb3' },
  botonEliminar: {
    backgroundColor: '#911414ff',
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
  },
  textoBotonEliminar: { color: '#fff', fontWeight: '600', fontSize: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "#007bff" },
  vendedorContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  vendedorInfo: { marginLeft: 15 },
});

export default DetallePublicacionAdmin;
