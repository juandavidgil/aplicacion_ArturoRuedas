import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../../config/UrlApi'
import { LinearGradient } from 'expo-linear-gradient';

type InformacionUsuarioAdminRouteProp = RouteProp<
  StackParamList,
  'InformacionUsuarioAdmin'
>;

interface Props {
  route: InformacionUsuarioAdminRouteProp;
}
export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
}


const InformacionUsuarioAdmin: React.FC<Props> = ({route}) => {
const { ID_usuario } = route.params;
console.log("id que llego a esta pantalla:", ID_usuario)
  return (
   <View>
    <Text>Informacion del Usuario</Text>
     
   </View>
  )
};



export default InformacionUsuarioAdmin;