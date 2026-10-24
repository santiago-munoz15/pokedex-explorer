
const API_URL = "https://pokeapi.co/api/v2";

// Consultar una página de Pokémon.
export async function getPokemonList(offset = 0, limit = 20) {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  // Validar la respuesta antes de convertirla a JSON.
  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de Pokémon.");
  }

  const data = await response.json();

  // Obtener el ID desde la URL de cada Pokémon.
  return data.results.map((pokemon) => {
    const urlParts = pokemon.url.split("/").filter(Boolean);
    const id = Number(urlParts[urlParts.length - 1]);

    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
}

// Consultar la ficha completa por nombre o número.
export async function getPokemonDetail(nameOrId) {
  const searchValue = String(nameOrId).trim().toLowerCase();

  if (!searchValue) {
    throw new Error("Escribe un nombre o número de Pokémon.");
  }

  const response = await fetch(
    `${API_URL}/pokemon/${encodeURIComponent(searchValue)}`
  );

  // La API puede responder 404 si el Pokémon no existe.
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No se encontró ese Pokémon.");
    }

    throw new Error("No se pudo consultar el Pokémon.");
  }

  return await response.json();
}
