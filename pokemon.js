document.addEventListener('DOMContentLoaded', () => {
    const buscarBtn = document.getElementById('buscar-btn');
    const pokemonInput = document.getElementById('pokemon-input');
    const tablaBody = document.querySelector('#pokemon-table tbody');

    buscarBtn.addEventListener('click', buscarPokemon);

    function buscarPokemon() {
        const nombrePokemon = pokemonInput.value.trim().toLowerCase();

        if (!nombrePokemon) {
            alert('Por favor introduce un nombre de Pokémon');
            return;
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                mostrarPokemon(data);
            })
            .catch(error => {
                alert('Error: ' + error.message);
                limpiarTabla();
            });
    }

    function mostrarPokemon(data) {
        limpiarTabla();

        const fila = document.createElement('tr');

        // Celda de imagen
        const celdaImagen = document.createElement('td');
        const imagen = document.createElement('img');
        imagen.src = data.sprites.front_default;
        imagen.alt = data.name;
        celdaImagen.appendChild(imagen);
        fila.appendChild(celdaImagen);

        // Celda de nombre
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = data.name;
        fila.appendChild(celdaNombre);

        // Celda de altura
        const celdaAltura = document.createElement('td');
        celdaAltura.textContent = data.height;
        fila.appendChild(celdaAltura);

        // Celda de peso
        const celdaPeso = document.createElement('td');
        celdaPeso.textContent = data.weight;
        fila.appendChild(celdaPeso);

        // Celda de tipos
        const celdaTipos = document.createElement('td');
        celdaTipos.textContent = data.types.map(t => t.type.name).join(', ');
        fila.appendChild(celdaTipos);

        tablaBody.appendChild(fila);
    }

    function limpiarTabla() {
        tablaBody.innerHTML = '';
    }
});