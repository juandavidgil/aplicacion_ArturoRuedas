// Importamos lo necesario de React y React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

// Componente principal

const ComponenteDetallePantalla3= () => {

  //  Estado para controlar la pestaña activa
const [tab, setTab] = useState<'colocar' | 'info' | 'tienda'>('colocar');

return (
    <ScrollView contentContainerStyle={styles.container}>
  
    
    <Text style={styles.title}>Suspencion</Text>

     
    <Image
        source={require('../img/manubrio.png')}
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
            <Text style={styles.step}><Text style={styles.bold}>1.</Text> Retira la llanta y luego afloja los tornillos de la potencia para soltar la suspencion vieja o tenedor y retira los espaciadores</Text>
            <Text style={styles.step}><Text style={styles.bold}>2.</Text> Limpia el área de montaje </Text>
            <Text style={styles.step}><Text style={styles.bold}>3.</Text> coloca grasa nueva en los rodamientos </Text>
            <Text style={styles.step}><Text style={styles.bold}>4.</Text> Pon la suspencion y  los espaciadores apreta primero el tornillo superior de la caña y luego los laterales luego pon la llanta</Text>
            <Text style={styles.step}><Text style={styles.bold}>5.</Text> Verifica que la llanta quedo bien ajustada, luego verifica que la direccion quedo en linea para que no tengas complicaciones al manejar tu bicicleta.</Text>

            {/*  Herramientas necesarias */}
            <View style={styles.toolsBox}>
            <Text style={styles.bold}>Herramientas necesarias:</Text>
            <Text>llevar a Mantenimiento</Text>
            <Text> </Text>
            <Text> </Text>
            </View>
        </>
        )}

        {tab === 'info' && (
        <>
            <View style={styles.infoBox}>
              <Text style={styles.bold}>¿Para qué sirve?</Text>
              <Text>La suspencion es escencial para el Mtb al momento de bajar por una montaña, si tienes un tenedor, este podria partirse al momento de caer en un bache</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.bold}>Mantenimiento</Text>
              <Text>Este componente es mejor llevarlo a una bicicleteria ya que necesita un buen lavado interno, ademas de herramientas.</Text>
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

export default ComponenteDetallePantalla3;

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