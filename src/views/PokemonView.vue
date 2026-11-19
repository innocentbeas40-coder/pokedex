<script setup>
import { ref, onMounted } from "vue";
import { getPokemon } from "../api/pokeapi.js";

const pokemonAleatorio = ref(null);

const cargando = ref(true);
const error = ref(null);

const colores = {
  normal: "#9c9b89",
  fire: "#ef631d",
  water: "#2982d6",
  electric: "#f7c53d",
  grass: "#48b951",
  ice: "#58dff1",
  fighting: "#a7322a",
  poison: "#c348e2",
  ground: "#d5994b",
  flying: "#b9c3db",
  psychic: "#d43278",
  bug: "#6f822b",
  rock: "#a89556",
  ghost: "#a08bc5",
  dragon: "#7059c7",
  dark: "#665b57",
  steel: "#8999a8",
  fairy: "#d04c9b",
};

function obtenerColorTipo(tipo) {
  return colores[tipo] || "#AAAAAA";
}

// el color del texto segun el fondo

function obtenerColorTexto(tipo) {
  const color = obtenerColorTipo(tipo);

  const rojo = parseInt(color.slice(1, 3), 16);
  const verde = parseInt(color.slice(3, 5), 16);
  const azul = parseInt(color.slice(5, 7), 16);

  const luminosidad = (rojo * 299 + verde * 587 + azul * 114) / 1000;

  return luminosidad > 155 ? "#252525" : "#FFFFFF";
}

function obtenerFondoPokemon() {
  const tipos = pokemonAleatorio.value.types;

  const colorPrincipal = obtenerColorTipo(tipos[0].type.name);

  if (tipos.length === 2) {
    const colorSecundario = obtenerColorTipo(tipos[1].type.name);

    return `linear-gradient(135deg, ${colorPrincipal}, ${colorSecundario})`;
  }

  return colorPrincipal;
}

async function obtenerPokemonAleatorio() {
  cargando.value = true;
  error.value = null;

  try {
    const numero = Math.floor(Math.random() * 1025) + 1;

    pokemonAleatorio.value = await getPokemon(numero);
  } catch (err) {
    error.value = "No se pudo cargar el Pokémon. Inténtalo nuevamente.";
    console.error(err);
  } finally {
    cargando.value = false;
  }
}

onMounted(() => {
  obtenerPokemonAleatorio();
});
</script>

<template>
  <main class="pokedex">
    <header class="pokedex_header">
      <h1>Pokédex</h1>
      <p>Explora el mundo Pokémon</p>
    </header>

    <section class="pokemon_view">
      <div class="section_header">
        <h2>Pokémon aleatorio</h2>
        <p>Descubre un Pokémon nuevo</p>
      </div>

      <p v-if="cargando" class="loading_message">Cargando Pokémon...</p>

      <div v-else-if="error" class="error_message">
        <p>{{ error }}</p>

        <button @click="obtenerPokemonAleatorio">Intentar nuevamente</button>
      </div>

      <article
        v-else-if="pokemonAleatorio"
        class="pokemon_card"
        :style="{ background: obtenerFondoPokemon() }"
      >
        <span class="pokemon_number"> N.º {{ pokemonAleatorio.id }} </span>

        <div class="pokemon_image">
          <img
            :src="
              pokemonAleatorio.sprites.other['official-artwork']
                .front_default || pokemonAleatorio.sprites.front_default
            "
            :alt="pokemonAleatorio.name"
          />
        </div>

        <h3>{{ pokemonAleatorio.name }}</h3>

        <div class="pokemon_types">
          <span
            v-for="tipo in pokemonAleatorio.types"
            :key="tipo.type.name"
            :style="{
              backgroundColor: obtenerColorTipo(tipo.type.name),
              color: obtenerColorTexto(tipo.type.name),
            }"
          >
            {{ tipo.type.name }}
          </span>
        </div>

        <div class="pokemon_info">
          <div class="info_item">
            <span>Altura</span>
            <strong>{{ pokemonAleatorio.height / 10 }} m</strong>
          </div>

          <div class="info_item">
            <span>Peso</span>
            <strong>{{ pokemonAleatorio.weight / 10 }} kg</strong>
          </div>
        </div>

        <button class="random_button" @click="obtenerPokemonAleatorio">
          Otro Pokémon
        </button>
      </article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "../assets/scss/variables" as v;

.pokedex {
  width: 100%;
  min-height: 100vh;
  padding: 1.5rem;
}

.pokedex_header {
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2rem;
    text-transform: capitalize;
  }

  p {
    color: v.$color-text-secondary;
    margin-top: 0.5rem;
  }
}

.pokemon_view {
  width: 100%;
}

.section_header {
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.4rem;
  }

  p {
    color: v.$color-text-secondary;
    margin-top: 0.4rem;
  }
}

.pokemon_card {
  width: 100%;
  max-width: 22rem;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: v.$border-radius;
  box-shadow: v.$box-shadow;
  text-align: center;
  border: 0.7rem solid v.$color-border;

}

.pokemon_number {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.9;
}

.pokemon_image {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  img {
    width: 100%;
    max-width: 14rem;
    height: 14rem;
    object-fit: contain;
  }
}

.pokemon_card h3 {
  font-size: 1.8rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.pokemon_types {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  span {
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: capitalize;
  }
}

.pokemon_info {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;

  .info_item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    span {
      color: #777777;
      font-size: 0.8rem;
    }

    strong {
      color: #252525;
      font-size: 1rem;
    }
  }
}

.random_button {
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.8rem;
  border: none;
  border-radius: v.$border-radius-small;
  background-color: #ffffff;
  color: #252525;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.loading_message,
.error_message {
  text-align: center;
  padding: 2rem;
}

.error_message {
  color: #c0392b;

  button {
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: v.$border-radius-small;
    cursor: pointer;
  }
}

@media (min-width: 1024px) {
  .pokedex {
    padding: 3rem 5rem;
  }

  .pokedex_header {
    margin-bottom: 3.5rem;

    h1 {
      font-size: 2.8rem;
    }
  }

  .section_header {
    h2 {
      font-size: 1.8rem;
    }
  }

  .pokemon_card {
    max-width: 25rem;
    padding: 2rem;
  }

  .pokemon_image img {
    max-width: 16rem;
    height: 16rem;
  }

  .pokemon_card h3 {
    font-size: 2rem;
  }
}
</style>
