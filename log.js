document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get({ clickedLinks: [] }, function (data) {
        const clickedLinks = data.clickedLinks;
        const linkList = document.getElementById('linkList');

        clickedLinks.forEach(function (linkData) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Request URL:</strong> ${linkData.url}<br>
                <strong>Request Method:</strong> ${linkData.method}<br>
                <strong>Status Code:</strong> ${linkData.status}<br>
                <strong>Remote Address:</strong> ${linkData.address}<br>
                <strong>Referrer Policy:</strong> ${linkData.referrer}<br>
            `;

            linkList.appendChild(listItem);
        });
    });
});
