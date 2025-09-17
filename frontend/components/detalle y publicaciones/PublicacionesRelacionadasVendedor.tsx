import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Alert, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type DetallePublicacionRouteProp = RouteProp<StackParamList, 'DetallePublicacion'>;

interface Props {
  route: DetallePublicacionRouteProp;
}
const { width, height } = Dimensions.get('window');



const PublicacionesRelacionadasVendedor: React.FC<Props> = ({ route }) => {
  const { publicacion } = route.params;
  const navigation = useNavigation(); 

  return (
    <View>
        <Text>HOLA</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default PublicacionesRelacionadasVendedor;
