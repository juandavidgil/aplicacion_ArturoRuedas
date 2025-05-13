import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';

export default function ProductVideoCard() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Video
          source={require('../videos/mtb.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
         
          shouldPlay
          isLooping
          style={styles.video}
        />
        {/* <Text style={styles.title}>Mountain Bike</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    maxWidth: 350,
    overflow: 'hidden', // 🔑 Esto permite que el video respete los bordes redondeados
  },
  video: {
    width: '100%',
    height: '80%',
    backgroundColor: '#000', // Fondo negro por si tarda en cargar
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 12,
    textAlign: 'center',
  },
});