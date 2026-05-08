/**
 * JavaScript Principal para el Portal de Eventos de Algeciras
 * Reglas: Código en inglés, variables CamelCase, contenido en español
 */

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    let allEvents = [];

    // Obtener los eventos desde el archivo JSON (simulando base de datos)
    const fetchEvents = async () => {
        try {
            const response = await fetch('data.json');
            allEvents = await response.json();
            renderEvents(allEvents);
        } catch (error) {
            console.error('Error loading events:', error);
            eventsGrid.innerHTML = '<p class="error-message">Error al cargar los eventos. Por favor, inténtelo más tarde.</p>';
        }
    };

    // Renderizar los eventos en la cuadrícula
    const renderEvents = (eventsToRender) => {
        eventsGrid.innerHTML = '';

        if (eventsToRender.length === 0) {
            eventsGrid.innerHTML = '<p class="no-results">No se han encontrado eventos que coincidan con su búsqueda.</p>';
            return;
        }

        eventsToRender.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            // Siguiendo el boceto: Título, Click al mapa, Duración
            eventCard.innerHTML = `
                <img src="${event.eventImageUrl}" alt="${event.eventName}" class="event-image">
                <div class="event-info">
                    <h3>${event.eventName}</h3>
                    <div class="event-meta">
                        <p><strong>Fecha:</strong> ${event.eventDate}</p>
                        <p><strong>Ubicación:</strong> ${event.eventLocation}</p>
                        <p><strong>Duración:</strong> ${event.eventDuration}</p>
                    </div>
                    <p class="event-description">${event.eventDescription}</p>
                    <a href="https://www.google.com/maps/search/${encodeURIComponent(event.eventLocation + ' Algeciras')}" 
                       target="_blank" class="map-link">Ver en el mapa</a>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    };

    // Filtrar eventos basados en la entrada de búsqueda
    const filterEvents = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEvents = allEvents.filter(event =>
            event.eventName.toLowerCase().includes(searchTerm) ||
            event.eventDescription.toLowerCase().includes(searchTerm) ||
            event.eventLocation.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    };

    // Escuchadores de eventos (Listeners)
    searchButton.addEventListener('click', filterEvents);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterEvents();
    });

    // Carga inicial de datos
    fetchEvents();
});
