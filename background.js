let serverProxyConfig = null;
let extensionEnabled = true; // Variable para rastrear el estado de activación de la extensión

// Función para actualizar la configuración del proxy
function updateProxyConfig(proxyConfig) {
    chrome.proxy.settings.set({
        value: {
            mode: 'fixed_servers',
            rules: {
                singleProxy: {
                    scheme: 'http',
                    host: proxyConfig.host,
                    port: parseInt(proxyConfig.port, 10)
                }
            }
        }
    });
}

// Obtener la configuración del proxy del almacenamiento local
chrome.storage.local.get('proxyConfig', function (data) {
    serverProxyConfig = data.proxyConfig;
    if (serverProxyConfig) {
        updateProxyConfig(serverProxyConfig);
    }
});

// Listener para mensajes de la interfaz de usuario (popup)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        extensionEnabled = !extensionEnabled;
        // Aquí puedes agregar lógica adicional para manejar la activación/desactivación
    } else if (request.action === "setProxy") {
        serverProxyConfig = request.proxyConfig;
        updateProxyConfig(serverProxyConfig);
        // Guardar la nueva configuración en el almacenamiento local
        chrome.storage.local.set({ 'proxyConfig': serverProxyConfig });
    }
});

// Listener para enrutamiento de solicitudes (si la extensión está activada)
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (extensionEnabled) {
            // Aquí puedes agregar lógica adicional basada en la configuración del proxy
            // Por ejemplo, redireccionar las solicitudes a través del proxy configurado
        }
        // Si la extensión no está activada, no se modifica la solicitud
    },
    { urls: ['<all_urls>'] },
    ['blocking']
);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "activateExtension") {
        // Lógica para activar la extensión
    } else if (request.action === "deactivateExtension") {
        // Lógica para desactivar la extensión
    }
});


chrome.runtime.onInstalled.addListener(function() {
    // Crear un menú contextual para enlaces
    chrome.contextMenus.create({
        title: "Analizar con Link Tracer",
        contexts: ["link"],  // Aparece solo para enlaces
        onclick: function(info, tab) {
            if(info.linkUrl) {
                // Lógica para analizar el enlace
                analyzeLink(info.linkUrl);
            }
        }
    });
});

function analyzeLink(url) {
    // Lógica de análisis
}
