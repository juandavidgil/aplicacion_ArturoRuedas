import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {URL} from '../config/UrlApi'

const PerfilPantalla: React.FC = () =>  {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mi perfil</Text>

            <TouchableOpacity>
                <Text>
                    Editar mi información
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>ver mis publicaciones</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
})
export default PerfilPantalla