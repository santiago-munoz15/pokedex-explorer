
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function PokemonCard({ pokemon, onPress }) {
  // Mostrar el número con tres dígitos.
  const pokemonNumber = String(pokemon.id).padStart(3, "0");

  // Convertir la primera letra del nombre a mayúscula.
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Text style={styles.number}>#{pokemonNumber}</Text>

        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemonName}</Text>
        <Text style={styles.subtitle}>POKÉMON</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 7,
    padding: 10,
    backgroundColor: "#151F30",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#26364C",
  },
  imageContainer: {
    backgroundColor: "#1D2B40",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 5,
  },
  image: {
    width: "100%",
    height: 135,
  },
  number: {
    position: "absolute",
    top: 9,
    left: 9,
    color: "#67E8F9",
    fontSize: 12,
    fontWeight: "bold",
    zIndex: 1,
  },
  infoContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 5,
  },
  name: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#7F93AC",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 5,
  },
});
