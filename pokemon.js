document.addEventListener('DOMContentLoaded', () => {
    const buscarBtn = document.getElementById('buscar-btn');
    const pokemonInput = document.getElementById('pokemon-input');
    const tablaBody = document.querySelector('#pokemon-table tbody');

    const obtenerPokemon = async (nombre) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!res.ok) throw 'Pokémon no encontrado';
        return res.json();
    };
    const mostrarPokemon = (pokemon) => {
        tablaBody.innerHTML = `
            <tr>
                <td><img src="${pokemon.sprites.front_default}" class="pokemon-img" alt="${pokemon.name}"></td>
                <td>${pokemon.name}</td>
                <td>${pokemon.height}</td>
                <td>${pokemon.weight}</td>
                <td>${pokemon.types.map(t => t.type.name).join(', ')}</td>
            </tr>
        `;
    };
    const buscar = async () => {
        const nombre = pokemonInput.value.trim().toLowerCase();
        if (!nombre) return alert('Introduce un Pokémon');

        try {
            const pokemon = await obtenerPokemon(nombre);
            mostrarPokemon(pokemon);
        } catch (err) {
            alert(err);
            tablaBody.innerHTML = '';
        }
    };
    buscarBtn.addEventListener('click', buscar);
});