document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Obtén los valores del formulario
    // Envía un mensaje al background.js para actualizar la configuración
    chrome.runtime.sendMessage({
        action: "setProxy",
        proxyConfig: {
            // Tus datos de configuración del proxy aquí
        }
    });
});
