let proxyList = []; // Lista de configuraciones de proxy
let currentProxyIndex = 0; // Índice del proxy actual
let extensionEnabled = true; // Estado de activación de la extensión

// Función para actualizar la configuración del proxy
function updateProxyConfig(proxyConfig) {
    const portNumber = parseInt(proxyConfig.port, 10);
    if (!proxyConfig.type || typeof proxyConfig.type !== 'string' ||
        !proxyConfig.host || typeof proxyConfig.host !== 'string' ||
        isNaN(portNumber)) {
        console.error("Configuración de proxy incompleta o inválida:", proxyConfig);
        return;
    }

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
        console.error("Error al configurar el proxy:", error);
    }
}

// Función para cambiar al siguiente proxy en la lista
function switchToNextProxy() {
    currentProxyIndex = (currentProxyIndex + 1) % proxyList.length;
    updateProxyConfig(proxyList[currentProxyIndex]);
}

// Función para verificar la conectividad del proxy actual
function checkProxyConnectivity() {
    // Implementar la lógica para comprobar la conectividad del proxy actual
    // Esta es una función de ejemplo, debes implementar la lógica real
    const proxyIsWorking = true; // Simular resultado de la comprobación

    if (!proxyIsWorking) {
        switchToNextProxy();
    }
}

// Listener para mensajes de la interfaz de usuario (popup)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        extensionEnabled = !extensionEnabled;
    } else if (request.action === "setProxy") {
        serverProxyConfig = request.proxyConfig;
        updateProxyConfig(serverProxyConfig);
        chrome.storage.local.set({ 'proxyConfig': serverProxyConfig });
    } else if (request.action === "addProxy") {
        proxyList.push(request.proxyConfig);
        chrome.storage.local.set({ 'proxyList': proxyList });
    }
});

// Listener para el evento onInstalled
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "analyzeLink",
        title: "Analizar con Link Tracer",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "analyzeLink" && info.linkUrl) {
        analyzeLink(info.linkUrl);
    }
});

function analyzeLink(url) {
    var analysisPageUrl = chrome.runtime.getURL("analysis.html") + "?url=" + encodeURIComponent(url);
    chrome.tabs.create({ url: analysisPageUrl });
}

// Cargar la configuración del proxy y la lista de proxies cuando el service worker se activa
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['proxyConfig', 'proxyList'], function(data) {
        if (data.proxyConfig) {
            updateProxyConfig(data.proxyConfig);
        }
        if (data.proxyList && data.proxyList.length > 0) {
            proxyList = data.proxyList;
        }
    });
});

// Verificar la conectividad del proxy periódicamente
setInterval(checkProxyConnectivity, 10000); // Cada 10 segundos, por ejemplo
