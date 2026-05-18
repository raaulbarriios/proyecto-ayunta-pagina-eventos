/**
 * JavaScript Principal para el Portal de Eventos de Algeciras
 * Reglas: Código en inglés, variables CamelCase, contenido en español
 */

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('eventsGrid');
    const searchInput = document.getElementById('searchInput');
    const searchInputDesktop = document.getElementById('searchInputDesktop');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchPanel = document.getElementById('mobileSearchPanel');

    // Toggle Mobile Search Panel
    mobileSearchBtn.addEventListener('click', () => {
        mobileSearchPanel.classList.toggle('active');
        mobileSearchBtn.classList.toggle('active');
        if (mobileSearchPanel.classList.contains('active')) {
            searchInput.focus();
        }
    });

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
            
            eventCard.innerHTML = `
                <a href="${event.eventUrl || '#'}" target="_blank" class="event-image-link">
                    <img src="${event.eventImageUrl}" alt="${event.eventName}" class="event-image">
                </a>
                <div class="event-info">
                    <span class="category-tag">${event.categoryType || 'General'}</span>
                    <h3>
                        <a href="${event.eventUrl || '#'}" target="_blank" class="event-title-link">${event.eventName}</a>
                    </h3>
                    <div class="event-meta">
                        <p>${event.eventDate}</p>
                        <p>${event.eventLocation}</p>
                    </div>
                    <a href="https://www.google.com/maps/search/${encodeURIComponent(event.eventLocation + ' Algeciras')}" 
                       target="_blank" class="map-link">Ver en el mapa</a>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    };

    const filterEvents = (term) => {
        const searchTerm = term.toLowerCase();
        const filteredEvents = allEvents.filter(event =>
            event.eventName.toLowerCase().includes(searchTerm) ||
            event.eventDescription.toLowerCase().includes(searchTerm) ||
            event.eventLocation.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    };

    // Real-time Search
    searchInput.addEventListener('input', (e) => {
        filterEvents(e.target.value);
    });

    searchInputDesktop.addEventListener('input', (e) => {
        filterEvents(e.target.value);
    });

    fetchEvents();
});
