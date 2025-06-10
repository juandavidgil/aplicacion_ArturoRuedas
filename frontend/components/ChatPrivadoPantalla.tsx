import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TextInput, FlatList, 
  StyleSheet, SafeAreaView, KeyboardAvoidingView, 
  Platform, TouchableOpacity, Keyboard, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../types/types';

type PropiedadesPantallaChat = RouteProp<StackParamList, 'ChatPrivado'>;

interface Props {
  route: PropiedadesPantallaChat;
}

interface Mensaje {
  id_mensaje: number;
  contenido: string;
  fecha_envio: string;
  id_usuario: number;
  nombre_usuario: string;
}

const ChatPrivadoPantalla: React.FC<Props> = ({ route }) => {
  const navegacion = useNavigation();
  const { chatId, idOtroUsuario, nombreOtroUsuario } = route.params;
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const referenciaLista = useRef<FlatList>(null);

  useEffect(() => {
    const obtenerUsuarioYMensajes = async () => {
      try {
        const usuarioAlmacenado = await AsyncStorage.getItem('usuario');
        if (!usuarioAlmacenado) {
          Alert.alert('Error', 'Debes iniciar sesión primero');
          navegacion.goBack();
          return;
        }

        const usuario = JSON.parse(usuarioAlmacenado);
        setIdUsuario(usuario.ID_usuario);

        const respuesta = await fetch(`http://10.0.2.2:3001/mensajes-chat/${chatId}`);
        
        if (!respuesta.ok) {
          const textoError = await respuesta.text();
          throw new Error(`Error ${respuesta.status}: ${textoError}`);
        }

        const tipoContenido = respuesta.headers.get('content-type');
        if (!tipoContenido?.includes('application/json')) {
          const texto = await respuesta.text();
          throw new Error('La respuesta no es JSON');
        }

        const datos = await respuesta.json();
        setMensajes(datos);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
        Alert.alert('Error', 'No se pudieron cargar los mensajes');
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarioYMensajes();
  }, [chatId]);

  const manejarEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !idUsuario || !chatId) return;

    const idTemporal = Date.now();
    try {
      // Actualización optimista
      const mensajeTemporal = {
        id_mensaje: idTemporal,
        contenido: nuevoMensaje,
        fecha_envio: new Date().toISOString(),
        id_usuario: idUsuario,
        nombre_usuario: 'Yo'
      };

      setMensajes(prev => [...prev, mensajeTemporal]);
      setNuevoMensaje('');
      Keyboard.dismiss();

      setTimeout(() => {
        referenciaLista.current?.scrollToEnd({ animated: true });
      }, 100);

      // Enviar al backend
      const respuesta = await fetch('http://10.0.2.2:3001/enviar-mensaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID_chats: chatId,
          ID_usuario: idUsuario,
          mensaje: nuevoMensaje
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al enviar mensaje');
      }

      const resultado = await respuesta.json();
      setMensajes(prev => 
        prev.map(msg => msg.id_mensaje === idTemporal ? { 
          ...msg, 
          id_mensaje: resultado.ID_mensaje 
        } : msg)
      );
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMensajes(prev => prev.filter(msg => msg.id_mensaje !== idTemporal));
      Alert.alert('Error', 'No se pudo enviar el mensaje');
    }
  };

  const renderizarMensaje = ({ item }: { item: Mensaje }) => {
    const esMio = item.id_usuario === idUsuario;
    
    return (
      <View style={[
        estilos.contenedorMensaje,
        esMio ? estilos.miMensaje : estilos.mensajeOtro
      ]}>
        {!esMio && (
          <Text style={estilos.nombreRemitente}>{item.nombre_usuario}</Text>
        )}
        <View style={[
          estilos.burbujaMensaje,
          esMio ? estilos.miBurbuja : estilos.burbujaOtro
        ]}>
          <Text style={esMio ? estilos.textoMiMensaje : estilos.textoMensajeOtro}>
            {item.contenido}
          </Text>
        </View>
        <Text style={estilos.horaMensaje}>
          {new Date(item.fecha_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={estilos.contenedorCarga}>
        <ActivityIndicator size="large" color="#4d82bc" />
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navegacion.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4d82bc" />
        </TouchableOpacity>
        <Text style={estilos.tituloCabecera}>{nombreOtroUsuario}</Text>
      </View>

      <KeyboardAvoidingView
        style={estilos.contenedorFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={referenciaLista}
          data={mensajes}
          keyExtractor={(item) => item.id_mensaje.toString()}
          renderItem={renderizarMensaje}
          contentContainerStyle={estilos.contenedorMensajes}
          onContentSizeChange={() => referenciaLista.current?.scrollToEnd({ animated: true })}
          onLayout={() => referenciaLista.current?.scrollToEnd({ animated: true })}
        />

        <View style={estilos.contenedorEntrada}>
          <TextInput
            style={estilos.entradaTexto}
            value={nuevoMensaje}
            onChangeText={setNuevoMensaje}
            placeholder="Escribe un mensaje..."
            multiline
          />
          <TouchableOpacity 
            style={estilos.botonEnviar}
            onPress={manejarEnviarMensaje}
            disabled={!nuevoMensaje.trim()}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color={nuevoMensaje.trim() ? '#4d82bc' : '#ccc'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contenedorFlex: {
    flex: 1,
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderTopWidth:40,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tituloCabecera: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    color: '#333',
  },
  contenedorMensajes: {
    padding: 16,
  },
  contenedorMensaje: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  miMensaje: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  mensajeOtro: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  nombreRemitente: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  burbujaMensaje: {
    padding: 12,
    borderRadius: 16,
  },
  miBurbuja: {
    backgroundColor: '#4d82bc',
    borderTopRightRadius: 4,
  },
  burbujaOtro: {
    backgroundColor: '#e9ecef',
    borderTopLeftRadius: 4,
  },
  textoMiMensaje: {
    color: '#fff',
  },
  textoMensajeOtro: {
    color: '#333',
  },
  horaMensaje: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  contenedorEntrada: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 40,
    borderTopColor: '#e0e0e0',
  },
  entradaTexto: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    marginRight: 8,
  },
  botonEnviar: {
    padding: 8,
  },
});

export default ChatPrivadoPantalla;