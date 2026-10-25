
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function ErrorScreen({ message, onRetry, onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/pokemon-error.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>¡Ups! Hubo un error</Text>

      <Text style={styles.message}>
        {message || "Revisa tu conexión a internet e inténtalo nuevamente."}
      </Text>

      <Pressable style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>↻  REINTENTAR</Text>
      </Pressable>

      {onBack && (
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>VOLVER A LA POKÉDEX</Text>
        </Pressable>
      )}

      <Text style={styles.footer}>POKÉDEX NEO · ERROR DE CONEXIÓN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  imageContainer: {
    width: "100%",
    maxWidth: 340,
    height: 230,
    backgroundColor: "#151F30",
    borderWidth: 1,
    borderColor: "#26364C",
    borderRadius: 22,
    marginBottom: 28,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#F1F5F9",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    color: "#94A3B8",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 25,
  },
  retryButton: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#164E63",
    borderWidth: 1,
    borderColor: "#22D3EE",
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: "center",
  },
  retryText: {
    color: "#67E8F9",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  backButton: {
    padding: 14,
    marginTop: 8,
  },
  backText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    color: "#53657C",
    fontSize: 9,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 25,
  },
});
