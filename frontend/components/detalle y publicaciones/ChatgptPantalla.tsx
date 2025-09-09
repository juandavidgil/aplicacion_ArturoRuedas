import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { enviarMensajeAlBackend } from "../../services/api";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ChatGPT: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

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

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.role === "user" ? "Tú: " : "Respuesta: "}
            </Text>
            {item.content}
          </Text>
        )}
      />

      {loading && <ActivityIndicator size="large" color="#007bff" />}

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Escribe un mensaje..."
      />

      <TouchableOpacity style={styles.btn} onPress={handleSend}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ChatGPT;
