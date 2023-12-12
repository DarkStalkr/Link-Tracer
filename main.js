document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        const linkUrl = event.target.href;
        const requestMethod = 'POST';  // Reemplaza con el método de solicitud real
        const statusCode = 200;       // Reemplaza con el código de estado real
        const remoteAddress = '[2620:1ec:21::14]:443';  // Reemplaza con la dirección remota real
        const referrerPolicy = 'strict-origin-when-cross-origin';  // Reemplaza con la política de referencia real

        const linkData = {
            url: linkUrl,
            method: requestMethod,
            status: statusCode,
            address: remoteAddress,
            referrer: referrerPolicy
        };

        chrome.storage.local.get({ clickedLinks: [] }, function (data) {
            const clickedLinks = data.clickedLinks;
            clickedLinks.push(linkData);

            chrome.storage.local.set({ clickedLinks: clickedLinks }, function () {
                console.log('Enlace registrado: ' + linkUrl);
            });
        });
    }
});


// Configuración del servidor proxy (si se proporciona por el usuario)
let serverProxyConfig = null;

// Comprueba si el usuario ha proporcionado una configuración de servidor proxy
chrome.storage.local.get('proxyConfig', function (data) {
    serverProxyConfig = data.proxyConfig;
});

// Función para enrutar solicitudes a través del servidor proxy
function enrutarAtravésDelProxy(requestDetails) {
    // Comprueba si se proporcionó una configuración de servidor proxy
    if (serverProxyConfig) {
        const { host, port } = serverProxyConfig;
        const proxyServer = `http://${host}:${port}`;
        
        // Enruta la solicitud a través del servidor proxy especificado
        return { proxyInfo: { host, port } };
    } else {
        // Si no se proporcionó una configuración de servidor proxy, utiliza la red Tor
        const torProxy = 'socks://127.0.0.1:9050'; // Cambia esto según la configuración de tu sistema
        return { proxyInfo: torProxy };
    }
}

// Registra la función de enrutamiento para las solicitudes
chrome.webRequest.onBeforeRequest.addListener(
    enrutarAtravésDelProxy,
    { urls: ['<all_urls>'] },
    ['blocking']
);
