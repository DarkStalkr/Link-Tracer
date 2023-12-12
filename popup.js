document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleExtension');
    var saveButton = document.getElementById('saveProxyConfig');

    // Cargar y establecer el estado guardado del botón slider
    chrome.storage.local.get('extensionEnabled', function(data) {
        toggleButton.checked = data.extensionEnabled !== false; // Por defecto, activado
    });

    // Evento para activar/desactivar la extensión
    toggleButton.addEventListener('change', function() {
        let extensionEnabled = this.checked;
        // Guardar el nuevo estado y enviar mensaje al background script
        chrome.storage.local.set({ 'extensionEnabled': extensionEnabled });
        chrome.runtime.sendMessage({ action: extensionEnabled ? "activateExtension" : "deactivateExtension" });
    });

    // Evento para guardar la configuración del proxy
    saveButton.addEventListener('click', function() {
        var host = document.getElementById('proxyHost').value;
        var port = document.getElementById('proxyPort').value;

        if (host && port) {
            // Envía un mensaje al background script con la nueva configuración
            chrome.runtime.sendMessage({ action: "setProxy", proxyConfig: { host, port } });
        }
    });
});