export async function getPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
        throw new Error('No se pudo obtener el Pokémon');
    }

    const data = await response.json();

    return data;
}