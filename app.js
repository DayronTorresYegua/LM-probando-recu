document.addEventListener('DOMContentLoaded', () => {
    const tablaFavoritos = document.getElementById('cuerpoFavoritos');
    const tablaPrincipal = document.querySelector('#tablaPokemon tbody');

    const conseguirFavoritos = () => JSON.parse(localStorage.getItem('personajesFavoritos')) || [];
    const guardarFavoritos = favoritos => localStorage.setItem('personajesFavoritos', JSON.stringify(favoritos));
    const esFavorito = nombre => conseguirFavoritos().some(p => p.name === nombre);

    const mostrarFavoritos = () => {
        const favoritos = conseguirFavoritos();
        tablaFavoritos.innerHTML = favoritos.map(pokemon => `
            <tr>
                <td><img src="${pokemon.image}" class="pokemonImg" alt="${pokemon.name}"></td>
                <td>${pokemon.name}</td>
                <td>${pokemon.types}</td>
                <td>${pokemon.height}</td>
                <td>${pokemon.weight}</td>
                <td><button class="botonBorrar" data-nombre-pokemon="${pokemon.name}">Eliminar</button></td>
            </tr>
        `).join('');
    };

    document.addEventListener('click', e => {
        const pokemonImg = e.target.closest('.pokemonImg');
        const botonBorrar = e.target.closest('.botonBorrar');

        if (pokemonImg && tablaPrincipal.contains(pokemonImg.closest('tr'))) {
            const fila = pokemonImg.closest('tr');
            const nombrePokemon = fila.cells[1].textContent.trim();

            if (!esFavorito(nombrePokemon)) {
                const favoritos = conseguirFavoritos();
                favoritos.push({
                    name: nombrePokemon,
                    image: pokemonImg.src,
                    types: fila.cells[2].textContent.trim(),
                    height: fila.cells[3].textContent.trim(),
                    weight: fila.cells[4].textContent.trim(),
                });
                guardarFavoritos(favoritos);
                mostrarFavoritos();
                console.log(`${nombrePokemon} añadido a favoritos`);
            }
        }

        if (botonBorrar && tablaFavoritos.contains(botonBorrar.closest('tr'))) {
            const nombrePokemon = botonBorrar.getAttribute('data-nombre-pokemon');
            const favoritosActualizados = conseguirFavoritos().filter(p => p.name !== nombrePokemon);
            guardarFavoritos(favoritosActualizados);
            mostrarFavoritos();
            console.log(`${nombrePokemon} eliminado de favoritos`);
        }
    });

    mostrarFavoritos();
});