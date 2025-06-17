document.addEventListener('DOMContentLoaded', () => {
    const tablaFavoritos = document.getElementById('favoritosBody');
    const tablaPrincipal = document.querySelector('#personajesTable tbody');

    // Funciones de localStorage simplificadas
    const conseguirFavoritos = () => JSON.parse(localStorage.getItem('personajesFavoritos') || '[]');
    const guardarFavoritos = favoritos => localStorage.setItem('personajesFavoritos', JSON.stringify(favoritos));
    const esFavorito = nombre => conseguirFavoritos().some(p => p.name === nombre);

    // Función para mostrar favoritos
    const mostrarFavoritos = () => {
        tablaFavoritos.innerHTML = conseguirFavoritos().map(personaje => `
            <tr>
                <td><img src="${personaje.image}" class="personajeImg" alt="Imagen de ${personaje.name}"></td>
                <td>${personaje.name}</td>
                <td>${personaje.species}</td>
                <td>${personaje.status}</td>
                <td><button class="botonBorrar" data-nombrepersonaje="${personaje.name}">eliminar</button></td>
            </tr>
        `).join('');
    };

    // Event listener unificado
    document.addEventListener('click', e => {
        const personajeImg = e.target.closest('.personajeImg');
        const botonBorrar = e.target.closest('.botonBorrar');

        // Añadir favorito
        if (personajeImg && tablaPrincipal.contains(personajeImg.closest('tr'))) {
            const fila = personajeImg.closest('tr');
            const nombrePersonaje = fila.cells[1].textContent;

            if (!esFavorito(nombrePersonaje)) {
                const favoritos = conseguirFavoritos();
                favoritos.push({
                    name: nombrePersonaje,
                    image: personajeImg.src,
                    species: fila.cells[2].textContent,
                    status: fila.cells[3].textContent
                });
                guardarFavoritos(favoritos);
                mostrarFavoritos();
                console.log(`${nombrePersonaje} añadido a favoritos`);
            }
        }

        // Eliminar favorito
        if (botonBorrar && tablaFavoritos.contains(botonBorrar.closest('tr'))) {
            const actualizarFavoritos = conseguirFavoritos().filter(p => p.name !== botonBorrar.dataset.nombrepersonaje);
            guardarFavoritos(actualizarFavoritos);
            mostrarFavoritos();
        }
    });

    // Cargar favoritos al inicio
    cargarFavoritos();

    function cargarFavoritos() {
        mostrarFavoritos();
    }
});