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
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { URL } from "../../config/UrlApi";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const enviarMensajeAlBackend = async (message: string) => {
  try {
    const response = await axios.post(`${URL}/chat`, { message });
    return response.data.reply;
  } catch (error: any) {
    console.error("Error al conectar con el backend:", error.message);
    return "⚠️ Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.";
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

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userContainer : styles.botContainer,
      ]}
    >
      {/* Avatar */}
      <View
        style={[
          styles.avatar,
          item.role === "user" ? styles.userAvatar : styles.botAvatar,
        ]}
      >
        <Text style={styles.avatarText}>
          {item.role === "user" ? "👤" : "🤖"}
        </Text>
      </View>
      
      {/* Burbuja de mensaje */}
      <View
        style={[
          styles.messageBubble,
          item.role === "user" ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.role === "user" ? styles.userMessageText : styles.botMessageText,
          ]}
        >
          {item.content}
        </Text>
        
        {/* Indicador de hora simulada */}
        <Text style={[
          styles.timeText,
          item.role === "user" ? styles.userTimeText : styles.botTimeText
        ]}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0A1F1F", "#0C2B2A", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0A1F1F" />
      
      {/* 🔹 Header Mejorado */}
      <LinearGradient
        colors={["#072124", "#0A2D2F"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>💬</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>CHAT CON IA</Text>
            <Text style={styles.headerSubtitle}>Asistente inteligente</Text>
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          {/* Lista de mensajes */}
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Text style={styles.emptyIconText}>✨</Text>
              </View>
              <Text style={styles.emptyTitle}>Bienvenido al Chat</Text>
              <Text style={styles.emptySubtitle}>
                Escribe un mensaje para comenzar la conversación con nuestra IA
              </Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderMessage}
              contentContainerStyle={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Indicador de carga */}
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color="#20eb4c" />
                <Text style={styles.loadingText}>IA está escribiendo...</Text>
              </View>
            </View>
          )}

          {/* Input + Botón Mejorado */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Escribe tu mensaje..."
                placeholderTextColor="#94a3b8"
                multiline
                maxLength={500}
              />
              <TouchableOpacity 
                style={[
                  styles.btn,
                  !input.trim() && styles.btnDisabled
                ]} 
                onPress={handleSend}
                disabled={!input.trim()}
              >
                <LinearGradient
                  colors={!input.trim() ? ["#64748b", "#475569"] : ["#20eb4c", "#10b981"]}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.btnText}>➤</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.charCount}>
              {input.length}/500
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(32, 235, 76, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerIconText: {
    fontSize: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: "#cbd5e1",
    fontSize: 12,
    marginTop: 2,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    opacity: 0.3,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "flex-end",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  userAvatar: {
    backgroundColor: "rgba(37, 99, 235, 0.8)",
    
  },
  botAvatar: {
    backgroundColor: "rgba(32, 235, 76, 0.8)",
  },
  avatarText: {
    fontSize: 14,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userBubble: {
    backgroundColor: "#2563eb",
    borderBottomRightRadius: 6,
    marginLeft: "auto",
  },
  botBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#1e293b",
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
  },
  userTimeText: {
    color: "#e2e8f0",
    textAlign: "right",
  },
  botTimeText: {
    color: "#64748b",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(32, 235, 76, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 36,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  loadingContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    maxWidth: "75%",
    alignSelf: "flex-start",
  },
  loadingText: {
    marginLeft: 8,
    color: "#475569",
    fontSize: 13,
    fontStyle: "italic",
  },
  inputWrapper: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    padding: 14,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    fontSize: 15,
    marginRight: 12,
    maxHeight: 100,
    textAlignVertical: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  btn: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  btnGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  charCount: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "right",
    marginTop: 4,
    marginRight: 12,
  },
});

export default ChatGPT;