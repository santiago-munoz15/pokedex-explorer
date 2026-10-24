import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { getPokemonDetail } from "../services/pokemonApi";
import ErrorScreen from "../components/ErrorScreen";

export default function DetailScreen({ pokemon, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDetails();
  }, [pokemon.id]);

  async function loadDetails() {
    try {
      setLoading(true);
      setError("");

      const data = await getPokemonDetail(pokemon.id);
      setDetails(data);
    } catch (e) {
      setError("No se pudo cargar la ficha del Pokémon.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#67E8F9" />
        <Text style={styles.message}>Cargando ficha...</Text>
      </View>
    );
  }

  
    if (error || !details) {
        return (
            <ErrorScreen
                message={error || "No hay datos disponibles para este Pokémon."}
                onRetry={loadDetails}
                onBack={onBack}
            />
        );
    }


  const pokemonNumber = String(details.id).padStart(3, "0");

  const pokemonName =
    details.name.charAt(0).toUpperCase() + details.name.slice(1);

  const artwork =
    details.sprites.other["official-artwork"].front_default ||
    details.sprites.front_default;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← VOLVER A LA POKÉDEX</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.number}>POKÉMON #{pokemonNumber}</Text>

        <Image
          source={{ uri: artwork }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.name}>{pokemonName}</Text>

        <View style={styles.types}>
          {details.types.map((item) => (
              <View
                  key={item.type.name}
                  style={[
                      styles.typeBadge,
                      {
                          backgroundColor: getTypeColor(item.type.name),
                          borderColor: getTypeColor(item.type.name),
                      },
                  ]}
              >
                  <Text style={styles.typeText}>
                      {getTypeName(item.type.name)}
                  </Text>
              </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>DATOS GENERALES</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>ALTURA</Text>
          <Text style={styles.infoValue}>
            {(details.height / 10).toFixed(1)} m
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>PESO</Text>
          <Text style={styles.infoValue}>
            {(details.weight / 10).toFixed(1)} kg
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ESTADÍSTICAS BASE</Text>

      {details.stats.map((item) => (
        <View key={item.stat.name} style={styles.statContainer}>
          <View style={styles.statHeader}>
            <Text style={styles.statName}>
              {item.stat.name.toUpperCase().replace("-", " ")}
            </Text>
            <Text style={styles.statValue}>{item.base_stat}</Text>
          </View>

          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${Math.min((item.base_stat / 255) * 100, 100)}%`,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}


function getTypeColor(type) {
    const colors = {
        normal: "#A8A77A",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        grass: "#78C850",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC",
    };

    return colors[type] || "#22D3EE";
}

function getTypeName(type) {
    const names = {
        normal: "NORMAL",
        fire: "FUEGO",
        water: "AGUA",
        electric: "ELÉCTRICO",
        grass: "PLANTA",
        ice: "HIELO",
        fighting: "LUCHA",
        poison: "VENENO",
        ground: "TIERRA",
        flying: "VOLADOR",
        psychic: "PSÍQUICO",
        bug: "BICHO",
        rock: "ROCA",
        ghost: "FANTASMA",
        dragon: "DRAGÓN",
        dark: "SINIESTRO",
        steel: "ACERO",
        fairy: "HADA",
    };

    return names[type] || type.toUpperCase();
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  content: {
    padding: 18,
    paddingBottom: 35,
  },
  center: {
    flex: 1,
    backgroundColor: "#0B1220",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    color: "#CBD5E1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#151F30",
    borderColor: "#2A3B53",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },
  backText: {
    color: "#67E8F9",
    fontSize: 12,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#164E63",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  hero: {
    alignItems: "center",
    backgroundColor: "#151F30",
    borderColor: "#26364C",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  number: {
    color: "#67E8F9",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 10,
  },
  name: {
    color: "#F1F5F9",
    fontSize: 29,
    fontWeight: "bold",
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 15,
  },
    typeBadge: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 9,
        marginHorizontal: 4,
        marginBottom: 5,
    },
    typeText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 11,
        letterSpacing: 0.7,
    },
  sectionTitle: {
    color: "#67E8F9",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 25,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#151F30",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#26364C",
    padding: 17,
    marginRight: 8,
  },
  infoLabel: {
    color: "#7F93AC",
    fontSize: 11,
    fontWeight: "bold",
  },
  infoValue: {
    color: "#F1F5F9",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 8,
  },
  statContainer: {
    marginBottom: 17,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  statName: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "bold",
  },
  statValue: {
    color: "#67E8F9",
    fontWeight: "bold",
  },
  barBackground: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#26364C",
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#22D3EE",
  },
});
