// loader.js
window.addEventListener("load", initApp);

/**
 * function which is 
 * launch during the loading of page
 */
async function initApp() {

  await insertHTMLFile("pagesContent/header.html", document.getElementById('header-content'));

  
  if (getProjectFromURLPage()){
    currentPage(getProjectFromURLPage());
  }
  else {
    currentPage("index");
  }
  await insertHTMLFile("pagesContent/footer.html", document.getElementById('footer'));

  // Cibler tous les éléments 'collapse' que Bootstrap va gérer


}

/**
 * Used to insert file which contain html code
 * @param {String} htmlFile the path of the file from the file "loader.js"
 * @param {String} htmlElement DOM element which used to load this file
 */
async function insertHTMLFile(htmlFile, htmlElement) {
  try {
    // get the content 
    const response = await fetch(htmlFile);

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const htmlContent = await response.text();

    // insert the content
    if (htmlElement) {
      htmlElement.innerHTML = htmlContent;
      console.log(`Contenu du fichier ${htmlFile} chargé dans ${htmlElement.id}`);
    } else {
      console.error("Élément" + htmlElement.id + " non trouvé.");
    }

  } catch (error) {
    console.error(`Erreur lors de la récupération du ${htmlFile} : `, error);
  }
}

async function currentPage(element) {


  const paths = {
    index: "./pagesContent/index.html",
    proj: "./pagesContent/proj.html",
    stages: "./pagesContent/stages.html",
    alt: "./pagesContent/alt.html",
    propos: "./pagesContent/propos.html",
  };
  const content = document.getElementById(`main-content`);


  if (paths[element]) {

    if (getProjectFromURLProj()) {
      await loadProjAlt();
      document.getElementById(element).classList.add('active');

    }
    else {
      await insertHTMLFile(paths[element], content);
      // load content
      document.getElementById(element).classList.add('active');
    }
  }
  else {
    await insertHTMLFile(paths['index'], content);
    document.querySelectorAll("a.nav-link")[0].classList.add('active');
  }

}

function getProjectFromURLProj() {
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

function getProjectFromURLPage() {
  const params = new URLSearchParams(window.location.search);
  return params.get("pages");
}

async function loadProjAlt() {
  const projects = {
    carto: "./pagesContent/projetAlt/carto.html",
    castle: "./pagesContent/projetAlt/castle.html",
    qcm: "./pagesContent/projetAlt/qcm.html",
  };

  const project = getProjectFromURLProj();

  if (projects[project]) {
    await insertHTMLFile(projects[project], document.getElementById('main-content'));
    document.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', function () {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = this.src; // injecte le src de l'image cliquée
      });
    });
  }
  else {
    await insertHTMLFile("./pagesContent/index.html", document.getElementById('main-content'));
  }
}