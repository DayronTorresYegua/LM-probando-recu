document.addEventListener('DOMContentLoaded', function () {
    const tablaFavoritos = document.getElementById('favoritosBody');
    const tablaPrincipal = document.querySelector('#personajesTable tbody');

    cargarFavoritos()

    document.addEventListener('click', function(event) {
        const personajeImg = event.target.closest('.personajeImg');

        if (personajeImg && tablaPrincipal.contains(personajeImg.closest('tr'))) {
            const nombrePersonaje = personajeImg.closest('tr').cells[1].textContent;

            if (!esFavorito) {
                console.log(`${nombrePersonaje} añadido a favoritos`);
                addFavoritos(PersonajeImg);
            }
        }

        const botonBorrar = event.target.closest('.botonBorrar');
        if (botonBorrar && tablaPrincipal.contains(botonBorrar.closest('tr'))) {
            eliminarFavorito(botonBorrar.dataset.nombrePersonaje);
        }
    });

    function addFavoritos(elementoImg) {
        const fila = elementoImg.closest('tr');
        const personaje = {
            name: fila.cells[1].textContent,
            image: elementoImg.src,
            species: fila.cells[2].textContent,
            status: fila.cells[3].textContent,
        };

        const favoritos = conseguirFavoritos();

        if (!esFavorito(personaje.name)) {
            favoritos.push(personaje);
            guardarFavoritos(favoritos);
            mostrarFavoritos();
            return true;
        }
        return false;
    }

    function eliminarFavorito(nombrePersonaje) {
        const actualizarFavoritos = conseguirFavoritos().filter(p => p.name !== nombrePersonaje);
        guardarFavoritos(actualizarFavoritos);
        mostrarFavoritos();
    }

    function conseguirFavoritos() {
        const guardado = localStorage.getItem('personajesFavoritos');
        return guardado ? JSON.parse(guardado) : [];
    }

    function guardarFavoritos(favoritos) {
        localStorage.setItem('personajesFavoritos', JSON.stringify(favoritos));
    }

    function esFavorito(nombrePersonaje) {
        return conseguirFavoritos().some(p => p.name === nombrePersonaje);
    }

    function mostrarFavoritos() {
        const favoritos = conseguirFavoritos()
        let html = '';

        favorites.forEach(personaje => {
            html += `
                <tr>
                    <td><img src="${personaje.image}" class="personajeImg" alt="Imagen de ${personaje.name}"></td>
                    <td>${personaje.name}</td>
                    <td>${personaje.species}</td>
                    <td>${personaje.status}</td>
                    <td>
                        <button class="botonBorrar" data-nombrePersonaje="${personaje.name}">
                        eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
        tablaPrincipal.innerHTML = html;
    }

    function cargarFavoritos() {
        mostrarFavoritos();
    }
});