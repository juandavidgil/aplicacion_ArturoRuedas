import React,{ useState, useEffect}  from "react";
import { View,Text,FlatList,TouchableOpacity,TextInput,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Usuario {
  id: number;
  usuario: string;
  componente: string;
  tipo: string;
  estado: string;         // Opcional
  precio: string;        // Opcional
  activo: boolean;

}

const Administrador : React.FC = () => {
    return(
      <View> 
        <Text></Text>
      </View>
        
    )

}

export default Administrador 



