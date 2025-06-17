document.addEventListener('DOMContentLoaded', function() {
    const tablaFavoritos = document.getElementById('favoritos-body');
    const tablaPrincipal = document.querySelector('#pokemon-table tbody');
    cargarFavoritos();
    document.addEventListener('click', function(event) {
        const pokemonImg = event.target.closest('.pokemon-img');
        if (pokemonImg && tablaPrincipal.contains(pokemonImg.closest('tr'))) {
            const pokemonName = pokemonImg.closest('tr').cells[1].textContent;
            if (!esFavorito(pokemonName)) {
                console.log('click');
                addFavoritos(pokemonImg);
            }
        }

        const deleteBtn = event.target.closest('.delete-btn');
        if (deleteBtn && tablaFavoritos.contains(deleteBtn.closest('tr'))) {
            eliminarFavorito(deleteBtn.dataset.pokemonName);
        }
    });

    function addFavoritos(imgElement) {
        const fila = imgElement.closest('tr');
        const pokemon = {
            name: fila.cells[1].textContent,
            image: imgElement.src,
            height: fila.cells[2].textContent,
            weight: fila.cells[3].textContent,
            types: fila.cells[4].textContent
        };
        const favorites = conseguirFavoritos();
        if (!esFavorito(pokemon.name)) {
            favorites.push(pokemon);
            guardarFavoritos(favorites);
            mostrarFavorito();
            return true;
        }
        return false;
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
        tablaFavoritos.innerHTML = html;
    }

    function cargarFavoritos() {
        mostrarFavorito();
    }
});