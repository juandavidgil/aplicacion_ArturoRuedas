import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomModalProps {
  visible: boolean;
  message: string;
  success: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, message, success }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, success ? styles.success : styles.error]}>
          <Ionicons 
            name={success ? "checkmark-circle" : "close-circle"} 
            size={48} 
            color="#fff" 
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  success: { backgroundColor: "#28a745" },
  error: { backgroundColor: "#e63946" },
  message: { marginTop: 10, fontSize: 16, color: "#fff", textAlign: "center" },
});

export default CustomModal;
