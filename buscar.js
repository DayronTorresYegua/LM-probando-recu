document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('buscarButton');
    const rickInput = document.getElementById('rickInput');
    const tablaBody = document.querySelector('#personajesTable tbody');

    const obtenerPersonaje = async id => {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!respuesta.ok) throw 'Personaje no encontrado';
        return respuesta.json();
    };

    const mostrarPersonaje = personaje => {
        tablaBody.innerHTML = `
            <tr>
                <td><img src="${personaje.image}" class="personajeImg" alt="Imagen"></td>
                <td>${personaje.name}</td>
                <td>${personaje.species}</td>
                <td>${personaje.status}</td>
            </tr>
        `;
    };

    const buscar = async () => {
        const id = rickInput.value.trim();
        if (!id) return alert('Introduce un id');
        try {
            mostrarPersonaje(await obtenerPersonaje(id));
        }
        catch (error) {
            console.error(error);
            alert(error);
        }
    };

    botonBuscar.addEventListener('click', buscar);
});