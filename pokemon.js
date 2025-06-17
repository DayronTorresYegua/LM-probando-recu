document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('botonBuscar');
    const introducirPokemon = document.getElementById('introducirPokemon');
    const tablaPokemon = document.querySelector('#tablaPokemon tbody');

    const obtenerPokemon = async nombre => {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) throw 'Pokemon no existe';
        return respuesta.json();
    };

    const mostrarPokemon = pokemon => {
        tablaPokemon.innerHTML = `
            <tr>
                <td><img src="${pokemon.sprites.front_default}" class="pokemonImg" alt="${pokemon.name}"></td>
                <td>${pokemon.name}</td>
                <td>${pokemon.types.map(t => t.type.name).join(' , ')}</td>
                <td>${pokemon.height}</td>
                <td>${pokemon.weight}</td>
            </tr>
        `;
    };

    const buscarPokemon = async() => {
        const nombre = introducirPokemon.value.trim().toLowerCase();
        if (!nombre) return alert('Introduce un pokemon');
        try {
            const pokemon = await obtenerPokemon(nombre);
            mostrarPokemon(pokemon);
        } catch (error) {
            alert(error);
        }
    };
    botonBuscar.addEventListener('click', buscarPokemon)
});