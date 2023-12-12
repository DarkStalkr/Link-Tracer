let linkBatch = [];

// Función para registrar información de enlaces
function registerLink(linkUrl) {
    // Realizar petición HEAD para obtener información del enlace
    fetch(linkUrl, { method: 'HEAD' }).then(response => {
        const linkData = {
            url: linkUrl,
            method: response.method,
            status: response.status,
            address: response.url,
            referrer: document.referrer
        };

        linkBatch.push(linkData);

        if (linkBatch.length >= 10) { // Actualizar cada 10 enlaces
            updateStorage();
        }
    }).catch(error => console.error('Error al obtener datos del enlace:', error));
}

// Evento de click para capturar enlaces
document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        registerLink(event.target.href);
    }
});

// Actualizar almacenamiento local
function updateStorage() {
    chrome.storage.local.get({ clickedLinks: [] }, function (data) {
        const updatedLinks = data.clickedLinks.concat(linkBatch);
        chrome.storage.local.set({ clickedLinks: updatedLinks });
        linkBatch = [];
    });
}
