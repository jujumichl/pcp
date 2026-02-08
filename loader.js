// loader.js
window.addEventListener("load", initApp);

/**
 * function which is 
 * launch during the loading of page
 */
async function initApp() {

  await insertHTMLFile("pagesContent/header.html", document.getElementById('header-content'));

  // get all link of menu et know which one i am
  const menuHTML = document.querySelectorAll("a.nav-link");
  for (let element of menuHTML) {
    element.addEventListener('click', currentPage(Event, element));
  }
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

async function currentPage(evt, element) {
  //Récupération du nom du fichier
  let current_url = window.location.pathname.split("/").pop();
  let current_element = element.ariaCurrent;

  // on enlève le .html situer a la fin du fichier
  let current_file = current_url.replace(".html", "")

  if (current_url === current_element) {

    const currentHTMLElement = document.getElementById(`${current_file}-content`);
    let currentElement = `pagesContent/${current_file}.html`

    if (getProjectFromURL()) {
      await loadProjAlt();
    }
    else {
      await insertHTMLFile(currentElement, currentHTMLElement);
    }
    // load content
    await insertHTMLFile("pagesContent/footer.html", document.getElementById('footer'));
    element.classList.add('active');
  }
  else if (current_url == '') {
    let defaultPageHTML = document.getElementById(`index-content`);
    let defaultPage = 'pagesContent/index.html'
    await insertHTMLFile(defaultPage, defaultPageHTML);
    await insertHTMLFile("pagesContent/footer.html", document.getElementById('footer'));
    document.querySelectorAll("a.nav-link")[0].classList.add('active');
  }
  else {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  }
}

function getProjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

async function loadProjAlt() {
  const projects = {
    carto: "./pagesContent/projetAlt/carto.html",
    castle: "./pagesContent/projetAlt/castle.html",
    qcm: "./pagesContent/projetAlt/qcm.html",
  };

  const project = getProjectFromURL();

  if (projects[project]) {
    await insertHTMLFile(projects[project], document.getElementById('alt-content'));
    document.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', function() {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = this.src; // injecte le src de l'image cliquée
      });
    });
  }
}