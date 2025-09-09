import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';
export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
}


const InformacionUsuarioAdmin: React.FC = () => {



  return (
   <View>
    
   </View>
  )
  
};



export default InformacionUsuarioAdmin;