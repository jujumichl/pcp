// loader.js
window.addEventListener("load", initApp);

/**
 * function which is 
 * launch during the loading of page
 */

async function initApp() {

  const lang = getlanguage();

  setLanguageInUrl(lang);

  await insertHTMLFile(`pagesContent/${lang}/header.html`, document.getElementById('header-content'));

  document.querySelectorAll('.frFlag').forEach(el => {
    el.addEventListener('click', async function (e) {
      e.preventDefault();
      await switchLang('fr', getPageFromURL());
    });
  });

  document.querySelectorAll('.enFlag').forEach(el => {
    el.addEventListener('click', async function (e) {
      e.preventDefault();
      await switchLang('en', getPageFromURL());
    });
  });

  if (getPageFromURL()) {
    await currentPage(getPageFromURL(), lang);
  } else {
    await currentPage("index", lang);
  }

  await insertHTMLFile(`pagesContent/${lang}/footer.html`, document.getElementById('footer'));

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });
}

function getlanguage() {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");
  if (langParam === 'fr' || langParam === 'en') return langParam;
  return navigator.language.startsWith('fr') ? 'fr' : 'en';
}

function setLanguageInUrl(lang) {
  const langParam = new URLSearchParams(window.location.search);
  langParam.set("lang", lang)
  window.history.pushState({}, '', `?${langParam.toString()}`);
}

async function switchLang(lang, page = "") {
  event.preventDefault;
  setLanguageInUrl(lang);

  await insertHTMLFile(`pagesContent/${lang}/header.html`, document.getElementById('header-content'));

  document.querySelectorAll('.frFlag').forEach(el => {
    el.addEventListener('click', async function (e) {
      e.preventDefault();
      await switchLang('fr', getPageFromURL());
    });
  });

  document.querySelectorAll('.enFlag').forEach(el => {
    el.addEventListener('click', async function (e) {
      e.preventDefault();
      await switchLang('en', getPageFromURL());
    });
  });

  if (page !== "") {
    await currentPage(page, lang);
  }
  else if (getPageFromURL()) {
    await currentPage(getPageFromURL(), lang);
  } else {
    await currentPage("index", lang);
  }

  await insertHTMLFile(`pagesContent/${lang}/footer.html`, document.getElementById('footer'));
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

async function currentPage(element, lang) {

  const paths = {
    index: `./pagesContent/${lang}/index.html`,
    proj: `./pagesContent/${lang}/proj.html`,
    stages: `./pagesContent/${lang}/stages.html`,
    alt: `./pagesContent/${lang}/alt.html`,
    propos: `./pagesContent/${lang}/propos.html`,
    veille: `./pagesContent/${lang}/veille.html`,
    anssi: `./pagesContent/${lang}/veille/ANSSI.html`,
    // cyberbreizh: `./pagesContent/${lang}/veille/cyberbreizh.html`,
  };
  const content = document.getElementById(`main-content`);


  if (paths[element]) {

    if (getProjectFromURL()) {
      await loadProj(lang);
      document.querySelectorAll(`[aria-current=${element}`).forEach(elem => elem.classList.add('active'));
    }
    else {
      await insertHTMLFile(paths[element], content);
      // load content
      document.querySelectorAll(`[aria-current=${element}`).forEach(elem => elem.classList.add('active'));
      if (element == "anssi") {
        await feed()
      }
      // else if (element == "cyberbreizh"){
      //   document.getElementById('main-content').addEventListener("DOMContentLoaded", (event) => {
      //     document.getElementById('tarteaucitronAllDenied2').click();
      //     document.querySelectorAll('[data-category="infos-cyber"]')[0].click();
      //   });
      // }
    }

  }
  else {
    await insertHTMLFile(paths['index'], content);
    document.querySelectorAll("a.nav-link")[0].classList.add('active');
  }

}

function getProjectFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("pages");
}

async function loadProj(lang) {

  const projects = {
    carto: `./pagesContent/${lang}/projetAlt/carto.html`,
    castle: `./pagesContent/${lang}/projetAlt/castle.html`,
    qcm: `./pagesContent/${lang}/projetAlt/qcm.html`,
    ap31: `./pagesContent/${lang}/projetSIO/ap31.html`,
    ap32: `./pagesContent/${lang}/projetSIO/ap32.html`,
    ap41: `./pagesContent/${lang}/projetSIO/ap41.html`,
  };

  const project = getProjectFromURL();

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
    await insertHTMLFile(`./pagesContent/${lang}/index.html`, document.getElementById('main-content'));
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// Récupération du flux RSS du CERT-FR de l'ANSSI ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Renvoie les dernières actus/avis cyber
 * @param {string} url Url du flux RSS
 * @param {int} limit limite de récupération (5 par défaut)
 * @returns les dernières actus/avis cyber
 */
async function fetchRSS(url, limit = 5) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  const parseError = xml.querySelector("parsererror");
  if (parseError) {
    throw new Error("Erreur de parsing XML");
  }

  return Array.from(xml.querySelectorAll("item"))
    .map(item => ({
      title: item.querySelector("title")?.textContent ?? "Sans titre",
      link: item.querySelector("link")?.textContent ?? "#",
      date: item.querySelector("pubDate")?.textContent ?? null,
      description: item.querySelector("description")?.textContent ?? "",
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // tri du plus récent au plus ancien
    .slice(0, limit);
}

function renderItems(targetId, items) {
  const container = document.getElementById(targetId);
  container.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("border", "rounded", "p-3", "mb-3", "bg-light");

    const a = document.createElement("a");
    a.href = item.link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.classList.add("fw-semibold", "text-decoration-none");
    a.textContent = item.title;

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("text-muted", "small", "my-1");
    dateDiv.textContent = item.date
      ? new Date(item.date).toLocaleDateString('fr-FR')
      : "";

    const p = document.createElement("p");
    p.classList.add("mb-0", "text-secondary", "small");
    p.textContent = item.description;

    div.append(a, dateDiv, p);
    container.appendChild(div);
  });
}

async function loadFeed(url, targetId, limit = 5) {
  const container = document.getElementById(targetId);
  try {
    const items = await fetchRSS(url, limit);
    renderItems(targetId, items);
  } catch (error) {
    console.error(`Erreur chargement RSS (${targetId}):`, error);
    container.textContent = "Impossible de charger le flux.";
  }
}

async function feed() {
  const WORKER_URL = "https://cert-fr-anssi.julienmichelin35.workers.dev";

  const AVIS_RSS = `${WORKER_URL}/?url=https://www.cert.ssi.gouv.fr/avis/feed/`;
  const BULLETINS_RSS = `${WORKER_URL}/?url=https://www.cert.ssi.gouv.fr/actualite/feed/`;
  const MENACE_RSS = `${WORKER_URL}/?url=https://www.cert.ssi.gouv.fr/cti/feed/`

  console.info("Démarrage chargement flux...");
  await loadFeed(AVIS_RSS, "avis-feed");
  await loadFeed(BULLETINS_RSS, "bulletins-feed");
  await loadFeed(MENACE_RSS, "menace-feed");
}