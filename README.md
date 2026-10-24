
# PokéDex Explorer

Aplicación móvil desarrollada con React Native y Expo para consultar Pokémon mediante la PokéAPI.

## Tecnologías

- React Native
- Expo
- JavaScript
- Fetch API
- PokéAPI

## Estructura del proyecto

```text
src/
├── components/
│   └── PokemonCard.js
├── screens/
│   └── HomeScreen.js
└── services/
    └── pokemonApi.js
```

## Responsabilidad de los archivos

- `App.js`: punto de entrada de la interfaz principal.
- `PokemonCard.js`: componente visual reutilizable para mostrar un Pokémon.
- `HomeScreen.js`: pantalla principal, búsqueda y visualización del catálogo.
- `pokemonApi.js`: funciones para consultar la PokéAPI y manejar las respuestas.

## API utilizada

https://pokeapi.co/api/v2/

La aplicación permitirá consultar, buscar y visualizar información de Pokémon.
