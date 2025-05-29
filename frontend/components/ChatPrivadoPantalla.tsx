import { Socket } from "dgram";
import React, {useEffect, useState} from "react";
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from "react-native";
import { io } from 'socket.io-client';
export const socket = io('http://10.0.2.2:3001'); 

const ChatPrivadoPantalla = () =>{
    const [mensaje, setMensaje] = useState('');
    const [chatMensaje, setChatMensaje] = useState<string[]>([])

    useEffect(() => {
    socket.on('chatMensaje', (msg) => {
      setChatMensaje((prev) => [...prev, msg]);
    });

    return() => {
        socket.off('chatMensaje');
    };

}, []);

const enviarMensaje = () => {
    if (mensaje.trim()) {
        socket.emit('chatMensaje', mensaje);
        setMensaje('');
    }
}

    return(
        <View style={style.container}>
            <FlatList
        data={chatMensaje}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={style.message}>{item}</Text>}
      />
      <View style={style.inputContainer}>
        <TextInput
          placeholder="Escribe un mensaje"
          value={mensaje}
          onChangeText={setMensaje}
          style={style.input}
        />
        <TouchableOpacity onPress={enviarMensaje}>
            <Text>Enviar</Text>
         </TouchableOpacity>
      </View>
        </View>
    )
}
const style = StyleSheet.create({
   
 container: { flex: 1, padding: 10 },
  message: { marginVertical: 4, backgroundColor: '#eee', padding: 8, borderRadius: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginRight: 8 },
    
})
export default ChatPrivadoPantalla;