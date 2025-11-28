// loader.js
window.addEventListener("load", initApp);

function initApp(){
    let footer = "includes/footer.html";
    const footerHTML = document.getElementById('footer');
    // ne fonctione pas a voir pourquoi !!!!
    let header = "includes/header.html";
    const headerHTML = document.getElementById('head-content');
    insertHTMLFile(footer, footerHTML);
    insertHTMLFile(header, headerHTML);
}
async function insertHTMLFile(htmlFile, htmlElement) {
  try {
    const response = await fetch(htmlFile);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const htmlContent = await response.text();
    
    // Insérer le contenu
    if (htmlElement) { // Vérification de l'existence de l'élément
        htmlElement.innerHTML = htmlContent;
        console.log("Contenu du fichier .html charger dans " + htmlElement.id);
    } else {
        console.error("Élément" + htmlElement.id + " non trouvé.");
    }

  } catch (error) {
    console.error("Erreur lors de la récupération du fichier:", error);
  }
}


