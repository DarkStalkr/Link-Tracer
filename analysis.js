document.addEventListener('DOMContentLoaded', function() {
    // Obtener la URL del enlace desde la URL de la página
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlToAnalyze = decodeURIComponent(urlParams.get('url'));

    // Mostrar la URL
    document.getElementById('linkInfo').innerText = 'Analizando: ' + urlToAnalyze;

    // Aquí puedes agregar la lógica para analizar la URL
    // Por ejemplo, hacer solicitudes HTTP, revisar seguridad, etc.
});
