document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleExtension');
    var saveButton = document.getElementById('saveProxyConfig');

    // Cargar y establecer el estado guardado del botón slider
    chrome.storage.local.get('extensionEnabled', function(data) {
        if (toggleButton) {
            toggleButton.checked = data.extensionEnabled !== false; // Por defecto, activado
        }
    });

    // Evento para activar/desactivar la extensión
    if (toggleButton) {
        toggleButton.addEventListener('change', function() {
            let extensionEnabled = this.checked;
            // Guardar el nuevo estado y enviar mensaje al background script
            chrome.storage.local.set({ 'extensionEnabled': extensionEnabled });
            chrome.runtime.sendMessage({ action: extensionEnabled ? "activateExtension" : "deactivateExtension" });
        });
    }

    // Evento para guardar la configuración del proxy
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            var proxyType = document.getElementById('proxyType').value;
            var host = document.getElementById('proxyHost').value;
            var port = document.getElementById('proxyPort').value;

            if (proxyType && host && port) {
                // Envía un mensaje al background script con la nueva configuración
                chrome.runtime.sendMessage({
                    action: "setProxy", 
                    proxyConfig: { type: proxyType, host: host, port: port }
                });

                // Mostrar el mensaje de confirmación como alerta
                alert('Saved Succesfully: The proxy configuration was saved succesfully.');
            }
        });
    }
});


document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Obtener los datos del formulario
    var proxyData = {
        type: document.getElementById('proxyType').value,
        host: document.getElementById('proxyHost').value,
        port: document.getElementById('proxyPort').value
    };
    
    // Enviar los datos al script de fondo
    chrome.runtime.sendMessage({action: "updateProxyList", data: proxyData});
});


