document.addEventListener('DOMContentLoaded', function() {

    const favoritesTable = document.getElementById('favoritos-body');

    cargarFavoritos();

    document.addEventListener('click', function(event) {

        if (event.target.classList.contains('pokemon-img')) {
            addFavoritos(event.target);
        }

        if (event.target.classList.contains('delete-btn')) {
            eliminarFavorito(event.target.dataset.pokemonName);
        }
    });

    function addFavoritos(imgElement) {
        const row = imgElement.parentElement.parentElement; // Obtenemos la fila
        const pokemon = {
            name: row.cells[1].textContent,
            image: imgElement.src,
            height: row.cells[2].textContent,
            weight: row.cells[3].textContent,
            types: row.cells[4].textContent
        };

        const favorites = conseguirFavoritos();

        if (!esFavorito(pokemon.name)) {
            favorites.push(pokemon);
            guardarFavoritos(favorites);
            mostrarFavorito();
        }
    }

    function eliminarFavorito(pokemonName) {
        const updatedFavorites = conseguirFavoritos().filter(p => p.name !== pokemonName);
        guardarFavoritos(updatedFavorites);
        mostrarFavorito();
    }

    function conseguirFavoritos() {
        const guardado = localStorage.getItem('pokemonFavorites');
        return guardado ? JSON.parse(guardado) : [];
    }

    function guardarFavoritos(favoritos) {
        localStorage.setItem('pokemonFavorites', JSON.stringify(favoritos));
    }

    function esFavorito(name) {
        return conseguirFavoritos().some(p => p.name === name);
    }

    function mostrarFavorito() {
        const favorites = conseguirFavoritos();
        let html = '';

        favorites.forEach(pokemon => {
            html += `
                <tr>
                    <td><img src="${pokemon.image}" class="pokemon-img" alt="Imagen de ${pokemon.name}"></td>
                    <td>${pokemon.name}</td>
                    <td>${pokemon.height}</td>
                    <td>${pokemon.weight}</td>
                    <td>${pokemon.types}</td>
                    <td>
                        <button class="delete-btn" data-pokemon-name="${pokemon.name}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

        favoritesTable.innerHTML = html;
    }

    function cargarFavoritos() {
        mostrarFavorito();
    }
});