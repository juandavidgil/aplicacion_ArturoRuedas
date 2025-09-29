import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { StackParamList } from "../../types/types";
import { RouteProp } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { URL } from "../../config/UrlApi";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type DetallePublicacionLogueadoRouteProp = RouteProp<
  StackParamList,
  "DetallePublicacionLogueado"
>;

interface Props {
  route: DetallePublicacionLogueadoRouteProp;
}

const { width } = Dimensions.get("window");

const DetallePublicacionLogueado: React.FC<Props> = ({ route }) => {
  const { publicacion, id } = route.params;
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [isChecked, setIsChecked] = useState(false);

  const presionCheckBox = () => {
    const nuevoValor = !isChecked;
    setIsChecked(nuevoValor);

    if (nuevoValor) {
      Alert.alert(
        "Se eliminará la publicación",
        "¿Deseas continuar?",
        [
          { text: "Rechazar", onPress: () => setIsChecked(false), style: "cancel" },
          {
            text: "Aceptar",
            onPress: async () => {
              try {
                const response = await fetch(`${URL}/marcar-vendido/${id}`, {
                  method: "DELETE",
                });
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`Error ${response.status}: ${errorText}`);
                }
                Alert.alert("Éxito", "La publicación fue marcada como vendida ✅");
                navigation.goBack();
              } catch (error) {
                console.error("Error al marcar como vendida:", error);
                Alert.alert(
                  "Error",
                  "No se pudo marcar como vendida. Verifica la conexión al servidor."
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
    <Image
      source={{ uri: item }}
      style={styles.imagenCarrusel}
      resizeMode="cover"
    />
  );

  return (
    <LinearGradient
      colors={["#0c2b2aff", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.detalleCard}>
          <Text style={styles.tituloDetalle}>
            {publicacion.nombre_articulo}
          </Text>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Descripción</Text>
            <Text style={styles.texto}>{publicacion.descripcion}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Precio</Text>
             <Text style={styles.precioDetalle}>
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(Number(publicacion.precio))}
            </Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Tipo de bicicleta</Text>
            <Text style={styles.texto}>{publicacion.tipo_bicicleta}</Text>
          </View>

          <CheckBox
            title="Marcar como vendido"
            checked={isChecked}
            onPress={presionCheckBox}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedColor="#20eb4ca4"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  carrusel: {
    maxHeight: 280,
    marginBottom: 20,
  },
  imagenCarrusel: {
    width: width * 0.9,
    height: 250,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  detalleCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tituloDetalle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20eb4ca4",
    textAlign: "center",
  },
  seccion: {
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bbb",
  },
  texto: {
    fontSize: 16,
    color: "#eee",
  },
  precioDetalle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1adc00ff",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: 15,
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default DetallePublicacionLogueado;
