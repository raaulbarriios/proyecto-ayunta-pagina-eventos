/**
 * JavaScript Principal para el Portal de Eventos de Algeciras
 * Reglas: Código en inglés, variables CamelCase, contenido en español
 */

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    const searchInput = document.getElementById('searchInput');

    let allEvents = [];

    // Fetch Events from JSON
    const fetchEvents = async () => {
        try {
            const response = await fetch('data.json');
            allEvents = await response.json();
            renderEvents(allEvents);
        } catch (error) {
            console.error('Error loading events:', error);
            eventsGrid.innerHTML = '<p class="error-message">Error al cargar los eventos.</p>';
        }
    };

    // Render Event Cards
    const renderEvents = (eventsToRender) => {
        eventsGrid.innerHTML = '';

        if (eventsToRender.length === 0) {
            eventsGrid.innerHTML = '<p class="no-results">No se han encontrado eventos.</p>';
            return;
        }

        eventsToRender.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            // Link entire card to details
            eventCard.innerHTML = `
                <a href="event-detail.html?id=${event.eventId}" class="card-link">
                    <img src="${event.eventImageUrl}" alt="${event.eventName}" class="event-image">
                    <div class="event-info">
                        <span class="category-tag">${event.categoryType || 'General'}</span>
                        <h3>${event.eventName}</h3>
                        <div class="event-meta">
                            <p>📅 ${event.eventDate}</p>
                            <p>📍 ${event.eventLocation}</p>
                        </div>
                    </div>
                </a>
            `;
            eventsGrid.appendChild(eventCard);
        });
    };

    // Real-time Search
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEvents = allEvents.filter(event =>
            event.eventName.toLowerCase().includes(searchTerm) ||
            event.eventDescription.toLowerCase().includes(searchTerm) ||
            event.eventLocation.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });

    fetchEvents();
});
