// loader.js
window.addEventListener("load", initApp);

/**
 * function which is 
 * launch during the loading of page
 */
async function initApp() {
  let footer = "includes/footer.html";
  const footerHTML = document.getElementById('footer');
  await insertHTMLFile(footer, footerHTML);
  let header = "includes/header.html"
  const headerHTML = document.getElementById('header-content');
  await insertHTMLFile(header, headerHTML);
  const menuHTML = document.querySelectorAll("a.nav-link");
  for (let element of menuHTML) {
    element.addEventListener('click', currentPage(1, element));
  }
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
    await insertHTMLFile(currentElement, currentHTMLElement);
    element.classList.add('active');
  }
  else {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  }
}