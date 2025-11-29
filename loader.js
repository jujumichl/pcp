// loader.js
window.addEventListener("load",initApp);

async function initApp(){
    let footer = "includes/footer.html";
    const footerHTML = document.getElementById('footer');
    await insertHTMLFile(footer, footerHTML);

    // ne fonctione pas a voir pourquoi !!!!
    // Trouver, le fichier est bien importer cependant j'ai mal
    // configurer mon element du DOM

    // /!\ pb d'encodage a voir

/*     let head = "includes/head.html";
    const headHTML = document.getElementById('head-content');
    await insertHTMLFile(head, headHTML); */

    let header = "includes/header.html"
    const headerHTML = document.getElementById('header-content');
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