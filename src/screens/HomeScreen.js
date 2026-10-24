import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import PokemonCard from "../components/PokemonCard";
import {
  getPokemonList,
  getPokemonDetail,
} from "../services/pokemonApi";
import DetailScreen from "./DetailScreen";
import ErrorScreen from "../components/ErrorScreen";

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingMoreRef = React.useRef(false);

// Consultar un Pokémon por nombre o número.
async function searchPokemon() {
  const searchValue = searchText.trim().toLowerCase();

  if (!searchValue) {
    setSearchedPokemon(null);
    setSearchError("");
    return;
  }

  try {
    setSearching(true);
    setSearchError("");

    const data = await getPokemonDetail(searchValue);

    setSearchedPokemon({
      id: data.id,
      name: data.name,
      image:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
    });
  } catch (error) {
    setSearchedPokemon(null);
    setSearchError("No encontramos ese Pokémon. Verifica el nombre o número.");
  } finally {
    setSearching(false);
  }
}

  useEffect(() => {
    loadPokemon();
  }, []);

    if (selectedPokemon) {
        return (
            <DetailScreen
                pokemon={selectedPokemon}
                onBack={() => setSelectedPokemon(null)}
            />
        );
    }

  // Consultar los primeros 20 Pokémon.
  async function loadPokemon() {
    try {
      setLoading(true);
      setError("");

      const data = await getPokemonList(0, 20);
        setPokemonList(data);
        setOffset(data.length);
        setHasMore(true);
    } catch (e) {
      setError("No se pudieron cargar los Pokémon.");
    } finally {
      setLoading(false);
    }
  }

    // Cargar los siguientes 20 Pokémon.
    
    async function loadMorePokemon() {
        if (loadingMoreRef.current || !hasMore || searchText.trim() !== "") {
            return;
        }

        loadingMoreRef.current = true;

        try {
            setLoadingMore(true);

            const data = await getPokemonList(offset, 20);

            if (data.length === 0) {
                setHasMore(false);
                return;
            }

            setPokemonList((previousList) => {
                const existingIds = new Set(
                    previousList.map((pokemon) => pokemon.id)
                );

                const newPokemon = data.filter(
                    (pokemon) => !existingIds.has(pokemon.id)
                );

                return [...previousList, ...newPokemon];
            });

            setOffset((previousOffset) => previousOffset + data.length);

            if (data.length < 20) {
                setHasMore(false);
            }
        } catch (error) {
            setError("No se pudieron cargar más Pokémon.");
        } finally {
            setLoadingMore(false);
            loadingMoreRef.current = false;
        }
    }


  // Buscar por nombre o número entre los Pokémon cargados.
  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredPokemon = pokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(normalizedSearch) ||
      String(pokemon.id).includes(normalizedSearch)
    );
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#67E8F9" />
        <Text style={styles.loadingText}>
          Cargando Pokédex...
        </Text>
      </View>
    );
  }

  
    if (error) {
        return (
            <ErrorScreen
                message={error}
                onRetry={loadPokemon}
            />
        );
    }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>P</Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>POKÉDEX EXPLORER</Text>
        </View>

        <View style={styles.status}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ONLINE</Text>
        </View>
      </View>

      <View style={styles.intro}>
        <Text style={styles.title}>Encuentra tu Pokémon</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
        onSubmitEditing={searchPokemon}
          style={styles.searchInput}
          placeholder="Nombre o número..."
          placeholderTextColor="#7F93AC"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        <Pressable
          style={styles.searchButton}
          onPress={searchPokemon}
        >
          <Text style={styles.searchButtonText}>BUSCAR</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {filteredPokemon.length} / {pokemonList.length}
          </Text>
        </View>
      </View>

          {searching && (
              <ActivityIndicator
                  size="small"
                  color="#67E8F9"
                  style={{ marginBottom: 12 }}
              />
          )}

          {searchError !== "" && (
              <Text style={styles.emptyText}>{searchError}</Text>
          )}

          
          {searchedPokemon && (
              <View style={styles.searchResult}>
                  <Text style={styles.resultTitle}>RESULTADO ENCONTRADO</Text>

                  <PokemonCard
                      pokemon={searchedPokemon}
                      onPress={() => setSelectedPokemon(searchedPokemon)}
                  />

                  <Pressable
                      onPress={() => {
                          setSearchedPokemon(null);
                          setSearchError("");
                          setSearchText("");
                      }}
                      style={styles.backButton}
                  >
                      <Text style={styles.backButtonText}>
                          ← VOLVER A LA POKÉDEX
                      </Text>
                  </Pressable>
              </View>
          )}

      
          {!searchedPokemon && (
              <FlatList
                  data={filteredPokemon}
                  keyExtractor={(item) => String(item.id)}
                  numColumns={2}
                  contentContainerStyle={styles.list}
                  columnWrapperStyle={styles.row}
                  showsVerticalScrollIndicator={false}
                  onEndReached={loadMorePokemon}
                  onEndReachedThreshold={0.5} 
                  renderItem={({ item }) => (
                      <PokemonCard
                          pokemon={item}
                          onPress={() => setSelectedPokemon(item)}
                      />
                  )}
                  ListEmptyComponent={
                      <Text style={styles.emptyText}>
                          No encontramos coincidencias en los Pokémon cargados.
                      </Text>
                  }
                  ListFooterComponent={
                      loadingMore ? (
                          <View style={{ padding: 20, alignItems: "center" }}>
                              <ActivityIndicator size="small" color="#67E8F9" />
                              <Text style={{ color: "#94A3B8", marginTop: 8 }}>
                                  Cargando más Pokémon...
                              </Text>
                          </View>
                      ) : (
                          <Text style={styles.footer}>
                              POKÉDEX EXPLORER · VERSIÓN 1.0
                          </Text>
                      )
                  }
              />
          )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#233148",
  },
  logoContainer: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#163449",
    borderWidth: 1,
    borderColor: "#22D3EE",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#67E8F9",
    fontSize: 25,
    fontWeight: "bold",
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    color: "#F1F5F9",
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: "#7F93AC",
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 4,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#142B2B",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
    marginRight: 5,
  },
  statusText: {
    color: "#86EFAC",
    fontSize: 9,
    fontWeight: "bold",
  },
  intro: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  eyebrow: {
    color: "#22D3EE",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  title: {
    color: "#F1F5F9",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  description: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 49,
    backgroundColor: "#151F30",
    borderWidth: 1,
    borderColor: "#2A3B53",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#F1F5F9",
    fontSize: 14,
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#164E63",
    borderWidth: 1,
    borderColor: "#22D3EE",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#67E8F9",
    fontWeight: "bold",
    fontSize: 11,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: "#71839B",
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 4,
  },
  counter: {
    backgroundColor: "#17283A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#294157",
  },
  counterText: {
    color: "#67E8F9",
    fontSize: 11,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 9,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    color: "#CBD5E1",
    marginTop: 12,
  },
  errorText: {
    color: "#FCA5A5",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#164E63",
    padding: 12,
    borderRadius: 10,
  },
  retryText: {
    color: "#67E8F9",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    padding: 24,
    lineHeight: 20,
  },
  footer: {
    color: "#53657C",
    fontSize: 9,
    textAlign: "center",
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 10,
  },
  
  searchResult: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  resultTitle: {
    color: "#67E8F9",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 12,
    marginHorizontal: 6,
  },
  backButton: {
    backgroundColor: "#151F30",
    borderWidth: 1,
    borderColor: "#2A3B53",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  backButtonText: {
    color: "#67E8F9",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },

});
