document.addEventListener('DOMContentLoaded', () => {
    const buscar = () => {
        const nombre = pokemonInput.value.trim().toLowerCase();
        if (!nombre) return alert('Introduce un Pokémon');

        fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then(res => res.ok ? res.json() : Promise.reject('Pokémon no encontrado'))
            .then(pokemon => {
                tablaBody.innerHTML = `
                    <tr>
                        <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
                        <td>${pokemon.name}</td>
                        <td>${pokemon.height}</td>
                        <td>${pokemon.weight}</td>
                        <td>${pokemon.types.map(t => t.type.name).join(', ')}</td>
                    </tr>
                `;
            })
            .catch(err => {
                alert(err);
                tablaBody.innerHTML = '';
            });
    };

    const buscarBtn = document.getElementById('buscar-btn');
    const pokemonInput = document.getElementById('pokemon-input');
    const tablaBody = document.querySelector('#pokemon-table tbody');

    buscarBtn.addEventListener('click', buscar);
    pokemonInput.addEventListener('keypress', e => e.key === 'Enter' && buscar());
});