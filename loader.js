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

  /* GENERER PAR IA MAIS FONCTIONNE PAS
  // Cibler tous les éléments 'collapse' que Bootstrap va gérer
  const collapseElements = document.querySelectorAll('.collapse');
  
  collapseElements.forEach(element => {
      // Écouter l'événement 'shown.bs.collapse' qui se déclenche APRÈS l'ouverture complète
      element.addEventListener('shown.bs.collapse', function() {
          // 'this' est l'élément #collapse5 ou tout autre élément ouvert
          this.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  });
   */
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
      console.log("Contenu du fichier .html charger dans " + htmlElement.id);
    } else {
      console.error("Élément" + htmlElement.id + " non trouvé.");
    }

  } catch (error) {
    console.error(`Erreur lors de la récupération du ${htmlFile} : `, error);
  }
}

async function currentPage(evt, element) {
  let current_url = window.location.pathname.substring(5);
  let current_element = element.ariaCurrent;
  let current_file = current_url.substring(0, current_url.search(".html"));

  if (current_url === current_element) {

    const currentHTMLElement = document.getElementById(`${current_file}-content`);
    let currentElement = `pagesContent/${current_file}.html`

    // load content
    await insertHTMLFile(currentElement, currentHTMLElement);
    await insertHTMLFile("pagesContent/footer.html", document.getElementById('footer'));
    element.classList.add('active');
  }
  else if (current_url == '') {
    let defaultPageHTML = document.getElementById(`index-content`);
    let defaultPage = 'pagesContent/index.html'
    await insertHTMLFile(defaultPage, defaultPageHTML);
    document.querySelectorAll("a.nav-link")[0].classList.add('active');
  }
  else {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  }
}