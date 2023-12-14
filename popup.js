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
        var proxyType = document.getElementById('proxyType').value;
        var host = document.getElementById('proxyHost').value;
        var port = document.getElementById('proxyPort').value;

        if (proxyType && host && port) {
            // Envía un mensaje al background script con la nueva configuración
            chrome.runtime.sendMessage({
                action: "setProxy", 
                proxyConfig: { type: proxyType, host, port }
            });

            // Mostrar el mensaje de confirmación como alerta
            alert('Saved Succesfully: The proxy configuration was saved succesfully.');
        }
    });
});


document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var proxyType = document.getElementById('proxyType').value;
    var proxyHost = document.getElementById('proxyHost').value;
    var proxyPort = document.getElementById('proxyPort').value;

    var proxyConfig = {
        type: proxyType,
        host: proxyHost,
        port: proxyPort
    };

    chrome.runtime.sendMessage({ action: "setProxy", proxyConfig: proxyConfig });
});
