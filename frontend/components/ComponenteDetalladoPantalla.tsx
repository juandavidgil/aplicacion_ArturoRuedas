import React,{ useState, useEffect}  from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { componentesData } from '../components/ComponentesData'; 
import { StackParamList } from '../types/types';
import type { StackNavigationProp } from '@react-navigation/stack';

interface Publicacion {
  id: number;
  nombre_articulo: string;
  descripcion: string;
  precio: string;
  tipo_bicicleta: string;
  tipo_componente: string;
  foto: string;
  nombre_vendedor: string;
  telefono: string;
}

type RouteParams = {
  ComponenteDetalle: {
    componenteId: keyof typeof componentesData;
    tipoBicicleta: string;
  };
};


type ComponenteDetalleRouteProp = RouteProp<RouteParams, "ComponenteDetalle">;

const ComponenteDetallePantalla = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  

  const route = useRoute<ComponenteDetalleRouteProp>();
  const { componenteId, tipoBicicleta } = route.params;

  const componente = componentesData[componenteId];
  const [tab, setTab] = useState<'colocar' | 'info' | 'tienda'>('colocar');
  const [refreshing, setRefreshing] = useState(false);
  const [articulos, setPublicaciones] = useState<Publicacion[]>([]);
const obtenerPublicaciones = async () => {  
  console.log("👉 Parámetros recibidos:", tipoBicicleta, componenteId);  

  try {
    setRefreshing(true);

   const url = `${URL}publicaciones?tipo=${encodeURIComponent(tipoBicicleta)}&componente=${encodeURIComponent(componenteId)}`;

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
    console.error('Error al obtener publicaciones....', error);
    Alert.alert('Error', 'No se pudieron cargar las publicaciones. Verifica la conexión al servidor.');
  } finally {
    setRefreshing(false);
  }
};

useEffect(() => {
  obtenerPublicaciones();
}, [tipoBicicleta, componenteId]); 
          useEffect(() => {
             obtenerPublicaciones();
           }, []);
          const renderItem = ({ item }: { item: Publicacion }) => (
           <TouchableOpacity onPress={() => {
             navigation.navigate('DetallePublicacionAdmin',{ 
           publicacion: item, 
           id: item.id
         });
           }}>
             <View style={styles.card}>
               <Image 
                 source={{ uri: item.foto }} 
                 style={styles.imagen} 
                 resizeMode="cover" 
                 onError={() => console.log("Error cargando imagen")}
               />
         
               <View style={styles.info}>
                 <Text style={styles.nombre}>{item.nombre_articulo}</Text>
                 <Text style={styles.descripcion}>Descripción: {item.descripcion.substring(0, 50)}...</Text>
                 <Text style={styles.precio}>Precio: ${item.precio}</Text>
                 <Text style={styles.tipo}>Tipo: {item.tipo_bicicleta}</Text>
                 <Text style={styles.tipo}>Vendedor: {item.nombre_vendedor}</Text>
               </View>
             </View>
           </TouchableOpacity>
         );

 if (!componente) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Componente no encontrado</Text>
      </View>
    );
  }



    return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>{componente.nombre}</Text>

    <Image
      source={componente.imagen}
      style={styles.image}
      resizeMode="contain"
    />

  
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setTab('colocar')}>
        <Text style={[styles.tab, tab === 'colocar' && styles.activeTab]}> Cómo colocar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTab('info')}>
        <Text style={[styles.tab, tab === 'info' && styles.activeTab]}> Información</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setTab('tienda');
        obtenerPublicaciones(); 
      }}>
        <Text style={[styles.tab, tab === 'tienda' && styles.activeTab]}> Tienda</Text>
      </TouchableOpacity>
    </View>

    {/* Contenido de cada pestaña */}
    <View style={styles.content}>
      {tab === 'colocar' && (
        <>
          {componente.comoColocar.map((paso, index) => (
            <Text key={index} style={styles.step}>
              <Text style={styles.bold}>{index + 1}. </Text> {paso}
            </Text>
          ))}

          <View style={styles.toolsBox}>
            <Text style={styles.bold}>Herramientas necesarias:</Text>
            {Array.isArray(componente.herramientas) ? (
              componente.herramientas.map((herramienta, index) => (
                <Text key={index}>• {herramienta}</Text>
              ))
            ) : (
              <Text>No se especificaron herramientas.</Text>
            )}
          </View>

          <TouchableOpacity style={styles.botonIa} onPress={() => navigation.navigate('ChatGPT')}>
            <Text>🤖 Pregúntale a la AI</Text>
          </TouchableOpacity>
        </>
      )}

      {tab === 'info' && (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.bold}>¿Para qué sirve?</Text>
            <Text>{componente.informacion.utilidad}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.bold}>Mantenimiento</Text>
            <Text>{componente.informacion.mantenimiento}</Text>
          </View>
          <TouchableOpacity style={styles.botonIa} onPress={() => navigation.navigate('ChatGPT')}>
            <Text>🤖 Pregúntale a la AI</Text>
          </TouchableOpacity>
        </>
      )}

     {tab === 'tienda' && (
  <>
    {articulos.length === 0 ? (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        No hay publicaciones disponibles.
      </Text>
    ) : (
      articulos.map((item) => renderItem({ item }))
    )}
  </>
)}
    </View>
  </ScrollView>
);
};

export default ComponenteDetallePantalla;

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
   
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: '10%'
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  tab: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  content: {
    marginTop: 10,
  },
  step: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  toolsBox: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  infoBox: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  shopItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
  },
  shopImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  botonIa:{
    padding:10,
    borderRadius:10,
    borderColor: '#000000ee',
    backgroundColor: '#79b9bbee',
    width: 200,
    margin: 10,
    marginLeft: 160,
    alignItems: 'center',
    
  },
    card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imagen: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c7a7b',
  },
  tipo: {
    fontSize: 14,
    color: '#666',
  },
  botonEliminar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botonMensajeAlVendedor :{
     flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textoMensajeAlVendedor:{
color:"#51AFF7"
  },
  
});