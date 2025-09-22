import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, Alert, FlatList, ScrollView,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { componentesData } from "../../components/detalle y publicaciones/ComponentesData";
import { StackParamList } from "../../types/types";
import type { StackNavigationProp } from "@react-navigation/stack";
import { URL } from "../../config/UrlApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';


interface Publicacion {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  tipo_componente: string;
  fotos: string[]; 
  nombre_vendedor: string;
  telefono: string;
  foto:string;
}

type RouteParams = {
  ComponenteDetalle: {
    componenteId: keyof typeof componentesData;
    tipoBicicleta: string;
  };
};

type ComponenteDetalleRouteProp = RouteProp<RouteParams, "ComponenteDetalle">;
const { width, height } = Dimensions.get('window');

const ComponenteDetallePantalla = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const route = useRoute<ComponenteDetalleRouteProp>();
  const { componenteId, tipoBicicleta } = route.params;

  const componente = componentesData[componenteId];
  const [tab, setTab] = useState<"colocar" | "info" | "tienda">("colocar");
  const [refreshing, setRefreshing] = useState(false);
  const [articulos, setPublicaciones] = useState<Publicacion[]>([]);
  
  // Estado nuevo para controlar los pasos abiertos
const [expandedStep, setExpandedStep] = useState<number | null>(null);

const toggleStep = (index: number) => {
  setExpandedStep(expandedStep === index ? null : index);
};


  const AgregarCarrito = async (publicacion: Publicacion) => {
    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      if (!usuarioStr) {
        Alert.alert("Error", "Debes iniciar sesión primero");
        navigation.navigate("InicioSesion");
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const ID_usuario = usuario.ID_usuario;

      if (!ID_usuario) throw new Error("No se pudo obtener el ID de usuario");
      if (!publicacion.id) throw new Error("El artículo no tiene ID definido");

      const response = await fetch(`${URL}/agregar-carrito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID_usuario: ID_usuario,
          ID_publicacion: publicacion.id,
        }),
      });

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.error || "Error al agregar al carrito");

      Alert.alert("Éxito", "Artículo agregado al carrito");
    } catch (error) {
      console.error("Error completo en AgregarCarrito:", error);
      Alert.alert("Error al agregar al carrito");
    }
  };

  const obtenerPublicaciones = async () => {
    try {
      setRefreshing(true);
      const url = `${URL}/publicaciones?tipo=${encodeURIComponent(
        tipoBicicleta
      )}&componente=${encodeURIComponent(componenteId)}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("La respuesta no es un array válido");
      }

      setPublicaciones(data);
    } catch (error) {
      console.error("Error al obtener publicaciones....", error);
      Alert.alert(
        "Error",
        "No se pudieron cargar las publicaciones. Verifica la conexión al servidor."
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, [tipoBicicleta, componenteId]);

  const renderItem = ({ item }: { item: Publicacion }) => {
    const portada = item.fotos && item.fotos.length > 0 ? item.fotos[0] : ""; // ✅ usar primera foto
    return (
       
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetallePublicacion", { publicacion: item });
        }}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: portada }}
            style={styles.imagen}
            resizeMode="cover"
            onError={() => console.log("Error cargando imagen")}
          />
          <View style={styles.info}>
            <Text style={styles.nombre}>{item.nombre_articulo}</Text>
            <Text style={styles.descripcion}>
              Descripción: {item.descripcion.substring(0, 50)}...
            </Text>
            <Text style={styles.precio}>Precio: ${item.precio}</Text>
            <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
            
            <Text style={styles.tipo}>Vendedor: {item.nombre_vendedor}</Text>
            <TouchableOpacity onPress={() => AgregarCarrito(item)}>
              <Ionicons name="cart-outline" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      
    );
  };

  if (!componente) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Componente no encontrado</Text>
      </View>
    );
  }

  return (
      <LinearGradient
            colors={['#0c2b2aff', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          >
    <View style={styles.container}>
      <Text style={styles.title}>{componente.nombre}</Text>

      {tab !== "tienda" && (
        <Image
          source={componente.imagen}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setTab("colocar")}>
          <Text style={[styles.tab, tab === "colocar" && styles.activeTab]}>
            Cómo colocar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("info")}>
          <Text style={[styles.tab, tab === "info" && styles.activeTab]}>
            Información
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("tienda")}>
          <Text style={[styles.tab, tab === "tienda" && styles.activeTab]}>
            Tienda
          </Text>
        </TouchableOpacity>
      </View>
        
        {/* prueba */}
        {tab === "colocar" && (
  <ScrollView contentContainerStyle={styles.content}>
    {componente.comoColocar.map((paso, index) => (
      <View key={index} style={styles.stepBox}>
        <TouchableOpacity
          style={styles.stepButton}
          onPress={() => toggleStep(index)}
        >
          <Text style={styles.stepTitle}>Paso {index + 1}</Text>
          <Ionicons
            name={expandedStep === index ? "chevron-up" : "chevron-down"}
            size={20}
            color="#3b82f6"
          />
        </TouchableOpacity>

        {expandedStep === index && (
          <View style={styles.stepContent}>
            <Text style={styles.stepText}>{paso}</Text>
          </View>
        )}
      </View>
    ))}

  <View style={styles.toolsBox}>
  <Text style={styles.toolsTitle}>🔧 Herramientas necesarias</Text>
  {Array.isArray(componente.herramientas) && componente.herramientas.length > 0 ? (
    componente.herramientas.map((herramienta, index) => (
      <View key={index} style={styles.toolItem}>
        <Ionicons name="construct-outline" size={18} color="#3b82f6" />
        <Text style={styles.toolText}>{herramienta}</Text>
      </View>
    ))
  ) : (
    <Text style={styles.noTools}>No se especificaron herramientas.</Text>
  )}
</View>


    <TouchableOpacity
      style={styles.botonIa}
      onPress={() => navigation.navigate("ChatGPT")}
    >
      <Text style={styles.botonIaText}>🤖 Pregúntale a la AI</Text>
    </TouchableOpacity>
  </ScrollView>
)}

     
{tab === "info" && (
  <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>📌 ¿Para qué sirve?</Text>
      <Text style={styles.infoText}>{componente.informacion.utilidad}</Text>
    </View>

    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>🛠️ Mantenimiento</Text>
      <Text style={styles.infoText}>{componente.informacion.mantenimiento}</Text>
    </View>

    <TouchableOpacity
      style={styles.botonIa}
      onPress={() => navigation.navigate("ChatGPT")}
    >
      <Text style={styles.botonIaText}>🤖 Pregúntale a la AI</Text>
    </TouchableOpacity>
  </ScrollView>
)}


      {tab === "tienda" &&
        (articulos.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color:'#fff' }}>
            No hay publicaciones disponibles.
          </Text>
        ) : (
          <FlatList
            data={articulos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={obtenerPublicaciones}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ))}
    </View>
    </LinearGradient>
  );
};

export default ComponenteDetallePantalla;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  }, 
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: "12%",
    color: "#ffffffff", 
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor:'#fff'
  },
  stepBox: {
  marginBottom: 12,
  borderRadius: 10,
  backgroundColor: "#fff",
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
stepButton: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 14,
  borderRadius: 10,
  backgroundColor: "#b9c0c5ff",
},
stepTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#1e293b",
},
stepContent: {
  padding: 12,
  borderTopWidth: 1,
  borderTopColor: "#e2e8f0",
},
stepText: {
  fontSize: 14,
  color: "#475569",
  lineHeight: 20,
},

  // -------------------- Tabs --------------------
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    fontSize: 15,
    color: "#475569",
    overflow: "hidden",
  },
  activeTab: {
    backgroundColor: "#3b82f6", // azul
    color: "#fff",
    fontWeight: "bold",
  },
  // -------------------- Secciones --------------------
  content: { 
    marginTop: 15,
    paddingBottom: 30, 
    paddingHorizontal: 12, 
    margin:10, 
  },
  step: { 
    marginBottom: 10, 
    fontSize: 15, 
    color: "#334155" 
  },
  bold: { 
    fontWeight: "bold",  
    fontSize: 20, 
    color: "#0f172a" 
  },

  
  
  // -------------------- Botón IA --------------------
  botonIa: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#06b6d4", // turquesa
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  botonIaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // -------------------- Cards tienda --------------------
  card: {
    flexDirection: "row",
    marginBottom: 18,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  info: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: "space-between" 
  },
  nombre: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#1e293b" 
  },
  descripcion: { 
    fontSize: 14, 
    color: "#64748b" 
  },
  precio: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#16a34a" 
  },
  tipo: { 
    fontSize: 14, 
    color: "#475569" 
  },
  carritoBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
  },
  toolsBox: {
  marginTop: 20,
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#f8fafc", // gris muy claro
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
toolsTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 10,
  color: "#1e293b",
},
toolItem: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
},
toolText: {
  marginLeft: 8,
  fontSize: 14,
  color: "#475569",
},
noTools: {
  fontSize: 14,
  color: "#64748b",
  fontStyle: "italic",
},

infoBox: {
  marginBottom: 16,
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#f8fafc", // gris claro
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
infoTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 8,
  color: "#1e293b",
},
infoText: {
  fontSize: 14,
  color: "#475569",
  lineHeight: 20,
},

  
  carritoText: { 
    marginLeft: 5, 
    color: "#fff", 
    fontWeight: "600" },
});

