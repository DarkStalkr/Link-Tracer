document.addEventListener('DOMContentLoaded', function() {
    // Obtener la URL del enlace desde la URL de la página
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlToAnalyze = decodeURIComponent(urlParams.get('url'));

    // Mostrar la URL
    document.getElementById('linkInfo').innerText = 'Analizando: ' + urlToAnalyze;



    function loadPagePreview(url) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.sandbox = "allow-same-origin allow-scripts"; // Permite scripts pero mantiene restricciones de seguridad
        document.body.appendChild(iframe);
    }
    
    loadPagePreview(urlToAnalyze);
    
    
   

    

    // Aquí puedes agregar la lógica para analizar la URL
    // Por ejemplo, hacer solicitudes HTTP, revisar seguridad, etc.
});
