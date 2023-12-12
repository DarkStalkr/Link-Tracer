let serverProxyConfig = null;
let extensionEnabled = true; // Variable para rastrear el estado de activación de la extensión

// Función para actualizar la configuración del proxy
function updateProxyConfig(proxyConfig) {
    // Asegúrate de que todos los valores necesarios están presentes y son válidos
    const portNumber = parseInt(proxyConfig.port, 10);
    if (!proxyConfig.type || typeof proxyConfig.type !== 'string' ||
        !proxyConfig.host || typeof proxyConfig.host !== 'string' ||
        isNaN(portNumber)) {
        console.error("Configuración de proxy incompleta o inválida:", proxyConfig);
        return;
    }

    // Convertir el tipo de proxy a minúsculas
    const proxyTypeLower = proxyConfig.type.toLowerCase();

    try {
        chrome.proxy.settings.set({
            value: {
                mode: 'fixed_servers',
                rules: {
                    singleProxy: {
                        scheme: proxyTypeLower,
                        host: proxyConfig.host,
                        port: portNumber
                    }
                }
            },
            scope: 'regular'
        });
    } catch (error) {
        console.error("Error al configurar el proxy:", error, "\nConfiguración proporcionada:", JSON.stringify(proxyConfig, null, 2));
    }
}




// Obtener la configuración del proxy del almacenamiento local
chrome.storage.local.get('proxyConfig', function(data) {
    serverProxyConfig = data.proxyConfig;
    if (serverProxyConfig) {
        updateProxyConfig(serverProxyConfig);
    }
});

// Listener para mensajes de la interfaz de usuario (popup)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        extensionEnabled = !extensionEnabled;
    } else if (request.action === "setProxy") {
        serverProxyConfig = request.proxyConfig;
        updateProxyConfig(serverProxyConfig);
        chrome.storage.local.set({ 'proxyConfig': serverProxyConfig });
    }
});

// Listener para enrutamiento de solicitudes (si la extensión está activada)
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (extensionEnabled) {
            // Lógica basada en la configuración del proxy
        }
    },
    { urls: ['<all_urls>'] },
    ['blocking']
);

// Listener para el evento onInstalled
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: "Analizar con Link Tracer",
        contexts: ["link"],
        onclick: function(info, tab) {
            if(info.linkUrl) {
                analyzeLink(info.linkUrl);
            }
        }
    });
});

function analyzeLink(url) {
    // Construir la URL de la página de análisis con la URL del enlace como parámetro
    var analysisPageUrl = chrome.runtime.getURL("analysis.html") + "?url=" + encodeURIComponent(url);
    chrome.tabs.create({ url: analysisPageUrl });
}

