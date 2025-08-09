// Importamos lo necesario de React y React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { componentesData } from '../components/ComponentesData'; 
import { StackParamList } from '../types/types';


type RouteParams = {
  ComponenteDetalle: {
    componenteId: keyof typeof componentesData;
  };
};

// Componente principal

const ComponenteDetallePantalla = () => {

  const route = useRoute();
  const { componenteId } = route.params as { componenteId: keyof typeof componentesData };

  const componente = componentesData[componenteId];


  //  Estado para controlar la pestaña activa
const [tab, setTab] = useState<'colocar' | 'info' | 'tienda'>('colocar');


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

      {/*  Pestañas: Cómo colocar | Información | Tienda */}
    
    <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setTab('colocar')}>
        <Text style={[styles.tab, tab === 'colocar' && styles.activeTab]}> Cómo colocar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('info')}>
        <Text style={[styles.tab, tab === 'info' && styles.activeTab]}> Información</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('tienda')}>
        <Text style={[styles.tab, tab === 'tienda' && styles.activeTab]}> Tienda</Text>
        </TouchableOpacity>
    </View>

      {/* Contenido de cada pestaña */}
    <View style={styles.content}>
        {tab === 'colocar' && (
        <>
            {componente.comoColocar.map((paso, index) => (
            <Text key={index} style={styles.step}>
            <Text style={styles.bold}>{index + 1}.
            </Text> {paso}</Text>
))}

            {/*  Herramientas necesarias */}
            <View style={styles.toolsBox}>
            <Text style={styles.bold}>Herramientas necesarias:</Text>
              {Array.isArray(componente.herramientas) ? (
              componente.herramientas.map((herramienta, index) => (
            <Text key={index}>• {herramienta}</Text>))) :
            (<Text>No se especificaron herramientas.</Text>)
            }
</View>
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
  </>
)}

        {tab === 'tienda' && (
          <>
           
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
});