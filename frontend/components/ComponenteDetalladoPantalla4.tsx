// Importamos lo necesario de React y React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

// Componente principal

const ComponenteDetallePantalla4= () => {

  //  Estado para controlar la pestaña activa
const [tab, setTab] = useState<'colocar' | 'info' | 'tienda'>('colocar');

return (
    <ScrollView contentContainerStyle={styles.container}>
  
    
    <Text style={styles.title}>Pedal</Text>

     
    <Image
        source={require('../img/pedal.jpg')}
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
            <Text style={styles.step}><Text style={styles.bold}>1.</Text> Para quitar el pedal hay que tener una llave numero 15 o una que encaje en la base del pedal</Text>
            <Text style={styles.step}><Text style={styles.bold}>2.</Text> Limpia el área de montaje </Text>
            <Text style={styles.step}><Text style={styles.bold}>3.</Text> para colocar el nuevo pedal hay que tener en cuenta que cada pedal trae una letra la cual es en el lugar donde va, R right que significa derecha y L left que significa izquierda. </Text>
            <Text style={styles.step}><Text style={styles.bold}>4.</Text> Asegurate que la rosca de las bielas no esten rodadas y que el pedal sea el correcto, ten en cuenta que se apretan en sentidos diferentes R hacia atras y L hacia adelante.</Text>
            <Text style={styles.step}><Text style={styles.bold}>5.</Text> Verifica que estan bien apretados y disponte a disfrutar tus nuevos pedales.</Text>

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
              <Text>El pedal es escencial para el equilibrio y el manejo de tu bicicleta</Text>
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

export default ComponenteDetallePantalla4;

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
    marginTop:'10%'
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