document.getElementById('proxyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var proxyType = document.getElementById('proxyType').value;
    var proxyHost = document.getElementById('proxyHost').value;
    var proxyPort = document.getElementById('proxyPort').value;

    // Aquí se manejaría la lógica para guardar el proxy
    // Por ejemplo, enviar un mensaje al background script o guardar en chrome.storage

    // Añadir el proxy a la lista visible
    var proxyList = document.getElementById('proxyList');
    var li = document.createElement('li');
    li.textContent = `${proxyType}://${proxyHost}:${proxyPort}`;
    proxyList.appendChild(li);

    // Limpiar el formulario después de añadir
    document.getElementById('proxyHost').value = '';
    document.getElementById('proxyPort').value = '';
});
