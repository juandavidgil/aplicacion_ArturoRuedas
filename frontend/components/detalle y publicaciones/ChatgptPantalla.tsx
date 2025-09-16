import React, { useState, useRef } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { URL } from "../../config/UrlApi";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const enviarMensajeAlBackend = async (message: string) => {
  try {
    const response = await axios.post(`${URL}chat`, { message });
    return response.data.reply;
  } catch (error: any) {
    console.error("Error al conectar con el backend:", error.message);
    return "⚠️ Error en el servidor.";
  }
};

const ChatGPT: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const image = require("../../img/principal.png");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const gptResponse = await enviarMensajeAlBackend(input);
    const botMessage: ChatMessage = { role: "assistant", content: gptResponse };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);

    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.role === "user" && { color: "#fff" },
        ]}
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0c2b2aff", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT CON IA</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{ opacity: 0.5 }} // 🔹 Opacidad de la imagen
        >
          {/* Lista de mensajes */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 16 }}
          />

          {loading && <ActivityIndicator size="large" color="#007bff" />}

          {/* Input + Botón */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.btn} onPress={handleSend}>
              <Text style={styles.btnText}>➤</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#072124ff",
    paddingVertical: 15,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 15,
    color: "#111827",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    fontSize: 15,
    marginRight: 8,
  },
  btn: {
    backgroundColor: '#20eb4ca4',
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChatGPT;
