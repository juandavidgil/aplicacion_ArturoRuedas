import React,{ useState, useEffect}  from "react";
import { View,Text,FlatList,TouchableOpacity,TextInput,Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Administrador from "./Administrador";

interface Usuario {
  id: number;
  usuario: string;
  componente: string;
  tipo: string;
  estado: string;         // Opcional
  precio: string;        // Opcional
  activo: boolean;

}

const PublicacionesAdmin : React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    return(
      <View style={styles.container}> 
        <Text style={styles.titulo}>ADMINISTRAR PUBLICACIONES</Text>
        <TouchableOpacity style={styles.adminPublicaciones} onPress={()=> navigation.navigate('Administrador')}>
          <Text>ADMIN. USUARIOS</Text>
        </TouchableOpacity>
      </View>
        
    )

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  adminPublicaciones:{
    width: '45%',
    backgroundColor: '#00c774',
    padding: '2%',
    borderWidth: 2,
    marginTop: '130%',
    borderRadius: 30,
    alignItems: 'center'
    
  },
  titulo:{
    fontSize: 25
  }
})






export default PublicacionesAdmin



