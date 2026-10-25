# PokéDex Explorer — Neo Edition

Aplicación móvil desarrollada con React Native y Expo que permite explorar Pokémon, consultar sus características y visualizar sus estadísticas mediante la API pública de PokéAPI.

El proyecto utiliza una interfaz oscura de estilo tecnológico, con tarjetas personalizadas, distintivos de colores para los tipos de Pokémon y mensajes visuales para los estados de carga y error.

## Características principales

- **Catálogo de Pokémon:** muestra los Pokémon en una cuadrícula de dos columnas.
- **Búsqueda:** permite consultar Pokémon por nombre o número de identificación.
- **Carga progresiva:** carga inicialmente 20 Pokémon y permite consultar más al desplazarse hasta el final de la lista.
- **Ficha de detalle:** muestra la imagen, el número, el nombre y los tipos de cada Pokémon.
- **Información física:** presenta la altura en metros y el peso en kilogramos.
- **Estadísticas base:** muestra las seis estadísticas del Pokémon mediante valores numéricos y barras proporcionales.
- **Tipos en español:** traduce los nombres de los tipos y asigna un color diferente a cada uno.
- **Estados de la interfaz:** incluye indicadores de carga, mensajes de error, opciones para reintentar y mensajes para búsquedas sin resultados.
- **Diseño Neo:** interfaz oscura con detalles en cian, tarjetas personalizadas y una pantalla de error ilustrada.

## Tecnologías utilizadas

- React Native
- Expo
- JavaScript
- PokéAPI
- Fetch API
- Git y GitHub

No se utiliza una biblioteca externa para realizar las peticiones HTTP, ya que JavaScript incluye `fetch`.

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm instalados.
- Un editor de código, como Visual Studio Code.
- Acceso a internet para consultar PokéAPI.
- Expo Go en un dispositivo móvil compatible o un emulador configurado.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/santiago-munoz15/pokedex-explorer.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd pokedex-explorer
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar Expo

```bash
npx expo start
```

Escanea el código QR con Expo Go para abrir la aplicación en el celular. El computador y el dispositivo deben tener conectividad entre sí; si hay problemas de conexión, se puede consultar la opción de conexión por túnel de Expo.

## Estructura del proyecto

```text
pokedex-explorer/
├── assets/
│   └── pokemon-error.png
├── src/
│   ├── components/
│   │   ├── ErrorScreen.js
│   │   └── PokemonCard.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── DetailScreen.js
│   └── services/
│       └── pokemonApi.js
├── App.js
├── app.json
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `App.js` | Punto de entrada de la aplicación y presentación de la pantalla principal. |
| `HomeScreen.js` | Administra el catálogo, la búsqueda, la carga progresiva y la navegación hacia el detalle. |
| `DetailScreen.js` | Consulta y presenta la información detallada, los tipos y las estadísticas del Pokémon seleccionado. |
| `PokemonCard.js` | Componente reutilizable que muestra la imagen, el número y el nombre de un Pokémon. |
| `ErrorScreen.js` | Presenta los mensajes de error, la ilustración y las opciones para reintentar o regresar. |
| `pokemonApi.js` | Centraliza las peticiones a PokéAPI y transforma los datos de la lista para facilitar su visualización. |
| `assets/pokemon-error.png` | Ilustración local utilizada en la pantalla personalizada de error. |
| `app.json` | Configuración de la aplicación Expo. |
| `package.json` | Define los scripts y las dependencias del proyecto. |
| `package-lock.json` | Registra las versiones concretas de las dependencias instaladas. |

La separación entre pantallas, componentes y servicios permite mantener la interfaz organizada y evita mezclar las peticiones a la API con la presentación de los datos.

## API utilizada

El proyecto consume la API pública de PokéAPI:

https://pokeapi.co/api/v2/

No requiere clave de acceso.

### Consultar la lista de Pokémon

```text
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

Los parámetros permiten definir la cantidad de resultados y la posición desde la que comienza la consulta.

### Consultar un Pokémon por nombre o número

```text
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

También se puede consultar mediante su número de identificación:

```text
GET https://pokeapi.co/api/v2/pokemon/25
```

El servicio obtiene los datos necesarios para presentar la imagen, el nombre, el identificador, los tipos, la altura, el peso y las estadísticas base.

## Manejo de los estados de la interfaz

La aplicación contempla diferentes situaciones durante las peticiones a la API:

- **Cargando:** muestra un indicador y un texto mientras se consultan los datos.
- **Éxito:** presenta la lista de Pokémon o su ficha de detalle.
- **Error:** informa al usuario cuando falla una consulta y ofrece una opción para reintentar.
- **Sin resultados:** muestra un mensaje cuando el Pokémon buscado no existe o no se encuentra entre los resultados disponibles.

La ilustración de error está almacenada localmente para que pueda mostrarse aunque no haya conexión a internet. Sin embargo, la interfaz de la aplicación solo puede mostrarse si React Native continúa ejecutándose.

## Cómo probar la aplicación

1. Abrir la aplicación con conexión a internet.
2. Verificar que aparezca el catálogo inicial de Pokémon.
3. Buscar un Pokémon por nombre y por número.
4. Consultar un nombre inexistente y verificar el mensaje correspondiente.
5. Seleccionar una tarjeta del catálogo y comprobar que se abra la ficha de detalle.
6. Verificar los tipos, la altura, el peso y las seis estadísticas.
7. Regresar al catálogo y desplazarse para cargar más Pokémon.
8. Comprobar el indicador de carga y los mensajes de error.
9. Simular un fallo de conexión mientras la aplicación continúa ejecutándose para validar la pantalla de error y el botón de reintento.

## Control de versiones

El proyecto utiliza Git para registrar los cambios realizados durante el desarrollo y GitHub para alojar el repositorio remoto.

Repositorio: https://github.com/santiago-munoz15/pokedex-explorer

## Autor

Santiago Muñoz Zapata

Proyecto académico desarrollado como ejercicio de consumo de API con React Native y Expo.
