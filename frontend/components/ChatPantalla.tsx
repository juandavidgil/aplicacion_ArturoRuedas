// ChatListScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, 
  StyleSheet, SafeAreaView, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Chat {
  ID_chats: number;
  otro_usuario_id: number;
  otro_usuario_nombre: string;
  ultimo_mensaje: string;
  fecha_ultimo_mensaje: string;
}

const ChatPantalla: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserAndChats = async () => {
      try {
        const userStr = await AsyncStorage.getItem('usuario');
        if (!userStr) {
          navigation.navigate('InicioSesion');
          return;
        }

        const user = JSON.parse(userStr);
        setUserId(user.ID_usuario);

        const response = await fetch(`http://10.0.2.2:3001/chats-usuario/${user.ID_usuario}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndChats();
  }, []);

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatPrivado', { 
        chatId: item.ID_chats,
        idOtroUsuario: item.otro_usuario_id,
        nombreOtroUsuario: item.otro_usuario_nombre 
      })}
    >
      <View style={styles.avatar}>
        <Ionicons name="person-circle-outline" size={40} color="#4d82bc" />
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.otro_usuario_nombre}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.ultimo_mensaje || 'Nuevo chat'}
        </Text>
      </View>
      <Text style={styles.chatTime}>
        {item.fecha_ultimo_mensaje ? new Date(item.fecha_ultimo_mensaje).toLocaleDateString() : ''}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4d82bc" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Chats</Text>
      </View>
      
      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No tienes chats activos</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.ID_chats.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  avatar: {
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default ChatPantalla;