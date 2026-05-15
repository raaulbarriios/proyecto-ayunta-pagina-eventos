document.addEventListener('DOMContentLoaded', () => {
    const detailContent = document.getElementById('eventDetailContent');
    
    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));

    if (!eventId) {
        detailContent.innerHTML = '<p class="error-message">Evento no encontrado.</p>';
        return;
    }

    const fetchEventDetail = async () => {
        try {
            const response = await fetch('data.json');
            const allEvents = await response.json();
            const event = allEvents.find(e => e.eventId === eventId);

            if (event) {
                renderDetail(event);
            } else {
                detailContent.innerHTML = '<p class="error-message">El evento solicitado no existe.</p>';
            }
        } catch (error) {
            console.error('Error loading event detail:', error);
            detailContent.innerHTML = '<p class="error-message">Error al cargar la información.</p>';
        }
    };

    const renderDetail = (event) => {
        detailContent.innerHTML = `
            <img src="${event.eventImageUrl}" alt="${event.eventName}" class="detail-image">
            <div class="detail-content">
                <a href="index.html" class="back-link">← Volver al listado</a>
                <div class="detail-header">
                    <span class="detail-category">${event.categoryType || 'Evento'}</span>
                    <h1 class="detail-title">${event.eventName}</h1>
                </div>
                
                <div class="detail-info-grid">
                    <div class="info-item">
                        <h4>Fecha</h4>
                        <p>${event.eventDate}</p>
                    </div>
                    <div class="info-item">
                        <h4>Ubicación</h4>
                        <p>${event.eventLocation}</p>
                    </div>
                    <div class="info-item">
                        <h4>Duración</h4>
                        <p>${event.eventDuration}</p>
                    </div>
                </div>

                <div class="detail-description">
                    <p>${event.eventDescription}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div class="detail-actions">
                    <a href="https://www.google.com/maps/search/${encodeURIComponent(event.eventLocation + ' Algeciras')}" 
                       target="_blank" class="btn btn-primary">
                        📍 Ver ubicación en Google Maps
                    </a>
                    <a href="#" class="btn btn-outline">
                        Compartir Evento
                    </a>
                </div>
            </div>
        `;
    };

    fetchEventDetail();
});
