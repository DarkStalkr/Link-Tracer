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

// Service Worker - Listener para mensajes de la interfaz de usuario (popup)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        extensionEnabled = !extensionEnabled;
    } else if (request.action === "setProxy") {
        serverProxyConfig = request.proxyConfig;
        updateProxyConfig(serverProxyConfig);
        chrome.storage.local.set({ 'proxyConfig': serverProxyConfig });
    }
});

// En el evento onInstalled, solo se crea el menú contextual
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "analyzeLink", // Un ID único para este elemento del menú
        title: "Analizar con Link Tracer",
        contexts: ["link"]
    });
});

// Usar chrome.contextMenus.onClicked para manejar los clics en el menú contextual
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "analyzeLink" && info.linkUrl) {
        analyzeLink(info.linkUrl);
    }
});

function analyzeLink(url) {
    var analysisPageUrl = chrome.runtime.getURL("analysis.html") + "?url=" + encodeURIComponent(url);
    chrome.tabs.create({ url: analysisPageUrl });
}

// Se elimina el listener de webRequest.onBeforeRequest ya que en Manifest V3 no se puede usar en un service worker
// En su lugar, se pueden usar otros enfoques como Declarative Net Request API para algunas funcionalidades.

// Listener para obtener la configuración del proxy del almacenamiento local cuando el service worker se activa
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get('proxyConfig', function(data) {
        serverProxyConfig = data.proxyConfig;
        if (serverProxyConfig) {
            updateProxyConfig(serverProxyConfig);
        }
    });
});
