const footerHTML = document.getElementById('footer');
footerHTML.onload(insertFooter);

function insertFooter() {
    fetch('./include/footer.html')
        .then(response => response.text())
        .then(data => {
            footerHTML.innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}