import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../config/UrlApi';

// Interfaces TypeScript
interface NotificationData {
  tipo?: string;
  ID_publicacion?: string;
  nombre_articulo?: string;
  timestamp?: string;
}

interface Notificacion {
  ID_notificacion?: number;
  id_notificacion?: number; // Por si viene en minúscula
  titulo: string;
  cuerpo: string;
  data?: string | NotificationData;
  leida: boolean;
  fecha_envio: string;
}

interface UserData {
  ID_usuario?: number;
  id_usuario?: number;
  usuario?: any;
}

// Componente principal
const NotificacionesPantalla: React.FC = () => {
  const [notifications, setNotifications] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Obtener ID del usuario desde AsyncStorage
  const getUserIdFromStorage = async (): Promise<number | null> => {
    try {
      console.log('🔍 Buscando usuario en AsyncStorage...');
      
      const userDataString = await AsyncStorage.getItem('userData');
      const usuarioString = await AsyncStorage.getItem('usuario');
      const userIdString = await AsyncStorage.getItem('userId');
      const idUsuarioString = await AsyncStorage.getItem('idUsuario');
      
      console.log('📦 Datos de AsyncStorage encontrados:', {
        userData: userDataString ? 'Sí' : 'No',
        usuario: usuarioString ? 'Sí' : 'No',
        userId: userIdString ? 'Sí' : 'No',
        idUsuario: idUsuarioString ? 'Sí' : 'No'
      });

      // Primero intenta con userData
      if (userDataString && userDataString !== 'undefined') {
        try {
          const userData: UserData = JSON.parse(userDataString);
          console.log('📄 userData parseado:', userData);
          
          const id = userData?.ID_usuario || userData?.id_usuario || userData?.usuario?.ID_usuario || userData?.usuario?.id_usuario;
          if (id) {
            console.log('✅ ID de usuario encontrado en userData:', id);
            return Number(id);
          }
        } catch (parseError) {
          console.error('❌ Error parseando userData:', parseError);
        }
      }

      // Luego intenta con usuario
      if (usuarioString && usuarioString !== 'undefined') {
        try {
          const usuario: UserData = JSON.parse(usuarioString);
          console.log('📄 usuario parseado:', usuario);
          
          const id = usuario?.ID_usuario || usuario?.id_usuario || usuario?.usuario?.ID_usuario || usuario?.usuario?.id_usuario;
          if (id) {
            console.log('✅ ID de usuario encontrado en usuario:', id);
            return Number(id);
          }
        } catch (parseError) {
          console.error('❌ Error parseando usuario:', parseError);
        }
      }

      // Luego intenta con userId directo
      if (userIdString && userIdString !== 'undefined') {
        console.log('✅ ID de usuario encontrado en userId:', userIdString);
        const id = Number(userIdString);
        if (!isNaN(id)) {
          return id;
        }
      }

      // Luego intenta con idUsuario
      if (idUsuarioString && idUsuarioString !== 'undefined') {
        console.log('✅ ID de usuario encontrado en idUsuario:', idUsuarioString);
        const id = Number(idUsuarioString);
        if (!isNaN(id)) {
          return id;
        }
      }

      console.log('❌ No se encontró ID de usuario válido en AsyncStorage');
      return null;

    } catch (error) {
      console.error('❌ Error obteniendo usuario de AsyncStorage:', error);
      return null;
    }
  };

  // Obtener notificaciones desde tu API
  const fetchNotifications = async (): Promise<void> => {
    try {
      if (!userId) {
        console.log('⏳ Esperando ID de usuario...');
        return;
      }

      setRefreshing(true);
      console.log('📋 Obteniendo notificaciones para usuario:', userId);
      
      const response = await fetch(`${URL}/notificaciones/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data: Notificacion[] = await response.json();
      
      console.log(`✅ ${data.length} notificaciones recibidas para usuario ${userId}`);
      console.log('🔍 Estructura de la primera notificación:', data[0] ? {
        keys: Object.keys(data[0]),
        values: data[0]
      } : 'No hay notificaciones');
      
      setNotifications(data);
      
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
      Alert.alert('Error', 'No se pudieron cargar las notificaciones');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Marcar notificación como leída
  const markAsRead = async (idNotificacion: number): Promise<void> => {
    try {
      console.log(`📌 Marcando notificación ${idNotificacion} como leída`);
      
      const response = await fetch(`${URL}/notificaciones/${idNotificacion}/leida`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('✅ Notificación marcada como leída:', result.mensaje);
      
      // Actualizar estado local
      setNotifications(prev => 
        prev.map(notif => 
          (notif.ID_notificacion === idNotificacion || notif.id_notificacion === idNotificacion)
            ? { ...notif, leida: true } 
            : notif
        )
      );
      
    } catch (error) {
      console.error('❌ Error marking as read:', error);
      Alert.alert('Error', 'No se pudo marcar como leída');
    }
  };

  // Parsear datos de notificación
  const parseNotificationData = (data: string | NotificationData | undefined): NotificationData | null => {
    if (!data) return null;
    
    try {
      if (typeof data === 'string') {
        return JSON.parse(data) as NotificationData;
      }
      return data as NotificationData;
    } catch (error) {
      console.error('Error parsing notification data:', error);
      return null;
    }
  };

  // Obtener ID de notificación (maneja ambos casos: mayúscula y minúscula)
  const getNotificationId = (item: Notificacion): number => {
    return item.ID_notificacion || item.id_notificacion || 0;
  };

  // Cargar usuario y notificaciones al montar el componente
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const userID = await getUserIdFromStorage();
        
        if (userID) {
          setUserId(userID);
          console.log('👤 Usuario inicializado:', userID);
        } else {
          console.log('⚠️ No se pudo obtener el ID del usuario');
          Alert.alert(
            'Información', 
            'No se pudo cargar la información del usuario. Verifica que hayas iniciado sesión.'
          );
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Error inicializando usuario:', error);
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Cargar notificaciones cuando el userId esté disponible
  useEffect(() => {
    if (userId) {
      console.log('🔄 Cargando notificaciones para userId:', userId);
      fetchNotifications();
    }
  }, [userId]);

  // Formatear fecha
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) {
        return 'Ahora';
      } else if (diffMins < 60) {
        return `Hace ${diffMins} min`;
      } else if (diffHours < 24) {
        return `Hace ${diffHours} h`;
      } else if (diffDays < 7) {
        return `Hace ${diffDays} d`;
      } else {
        return date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short'
        });
      }
    } catch (error) {
      return 'Fecha desconocida';
    }
  };

  // Obtener icono según tipo de notificación
  const getIconForNotification = (data: NotificationData | null): string => {
    if (!data || !data.tipo) return 'notifications-outline';
    
    switch (data.tipo) {
      case 'interes_carrito':
        return 'cart-outline';
      case 'articulo_vendido':
        return 'bag-check-outline';
      case 'test':
        return 'flash-outline';
      default:
        return 'notifications-outline';
    }
  };

  // Obtener color del icono
  const getIconColor = (data: NotificationData | null, isUnread: boolean): string => {
    if (!isUnread) return '#999';
    
    if (!data || !data.tipo) return '#007AFF';
    
    switch (data.tipo) {
      case 'interes_carrito':
        return '#4CAF50'; // Verde
      case 'articulo_vendido':
        return '#FF9800'; // Naranja
      case 'test':
        return '#9C27B0'; // Púrpura
      default:
        return '#007AFF'; // Azul
    }
  };

  // Render Item para cada notificación
  const renderNotificationItem = ({ item }: { item: Notificacion }) => {
    const notificationId = getNotificationId(item);
    const notificationData = parseNotificationData(item.data);
    const isUnread = !item.leida;
    const iconName = getIconForNotification(notificationData);
    const iconColor = getIconColor(notificationData, isUnread);

    // Si no hay ID válido, no renderizar
    if (!notificationId) {
      console.warn('⚠️ Notificación sin ID válido:', item);
      return null;
    }

    return (
      <TouchableOpacity 
        style={[
          styles.notificationCard,
          isUnread && styles.unreadCard
        ]}
        onPress={() => markAsRead(notificationId)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Ionicons 
            name={iconName as any} 
            size={28} 
            color={iconColor} 
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={[
            styles.titleText,
            isUnread && styles.unreadTitle
          ]}>
            {item.titulo}
          </Text>
          
          <Text style={styles.bodyText}>
            {item.cuerpo}
          </Text>
          
          {notificationData?.nombre_articulo && (
            <View style={styles.articleInfo}>
              <Text style={styles.articleText}>
                Artículo: {notificationData.nombre_articulo}
              </Text>
            </View>
          )}
          
          <Text style={styles.timestampText}>
            {formatDate(item.fecha_envio)}
          </Text>
        </View>

        {isUnread && (
          <View style={styles.unreadIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando notificaciones...</Text>
      </View>
    );
  }

  const unreadCount = notifications.filter(n => !n.leida).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {userId && (
          <Text style={styles.userIdText}>Usuario ID: {userId}</Text>
        )}
        {unreadCount > 0 && (
          <Text style={styles.headerSubtitle}>
            {unreadCount} {unreadCount === 1 ? 'sin leer' : 'sin leer'}
          </Text>
        )}
      </View>

      <FlatList
        data={notifications.filter(item => getNotificationId(item) !== 0)} // Filtrar notificaciones sin ID
        renderItem={renderNotificationItem}
        keyExtractor={(item) => getNotificationId(item).toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          notifications.length === 0 && styles.emptyListContent
        ]}
        refreshing={refreshing}
        onRefresh={fetchNotifications}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No tienes notificaciones</Text>
            <Text style={styles.emptySubtext}>
              {userId 
                ? 'Te avisaremos cuando tengas nuevas notificaciones'
                : 'No se pudo cargar la información del usuario'
              }
            </Text>
            <TouchableOpacity 
              onPress={fetchNotifications} 
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

// Estilos (se mantienen igual)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  userIdText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 8,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f3f4',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    backgroundColor: '#f8fbff',
  },
  iconContainer: {
    marginRight: 16,
    paddingTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#6c757d',
    lineHeight: 20,
  },
  unreadTitle: {
    color: '#1a1a1a',
  },
  bodyText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
    lineHeight: 18,
  },
  articleInfo: {
    backgroundColor: '#e7f3ff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  timestampText: {
    fontSize: 12,
    color: '#adb5bd',
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginLeft: 8,
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: '#495057',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default NotificacionesPantalla;