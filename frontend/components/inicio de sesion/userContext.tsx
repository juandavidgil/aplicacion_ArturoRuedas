import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator} from 'react-native'

type Usuario = {
 id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
 
  foto: string;
  
} | null;

type UserContextType = {
  usuario: Usuario;
  setUsuario: (u: Usuario) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  usuario: null,
  setUsuario: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuarioState] = useState<Usuario>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario de AsyncStorage al iniciar la app
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuario');
        if (usuarioGuardado) setUsuarioState(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.log('Error cargando usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuario();
  }, []);

  const setUsuario = async (u: Usuario) => {
    setUsuarioState(u);
    if (u) {
      await AsyncStorage.setItem('usuario', JSON.stringify(u));
    }
  };

  const logout = async () => {
    setUsuarioState(null);
    await AsyncStorage.removeItem('usuario');
  };

  // Mostrar loader mientras se verifica sesión
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#00ffb3" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
};
