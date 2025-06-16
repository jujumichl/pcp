<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Stage - Julien Michelin</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Rapport de Stage – Julien Michelin</h1>

    <p><strong>Période :</strong> Du 26 mai au 20 juin (5 semaines)</p>
    <p><strong>Association :</strong> Cercle Celtique de Rennes (CCR)</p>

    <h2>Introduction</h2>
    <p>Tout au long de mon stage au sein de l'association du Cercle Celtique de Rennes (CCR), j'ai eu diverses missions techniques et organisationnelles. Ce rapport vise à présenter les tâches qui m'ont été confiées et les solutions que j'ai mises en œuvre durant ces cinq semaines. Un suivi détaillé de mes missions est répertorié dans un Google Sheets partagé avec l'équipe du CCR.</p>

    <h2>Semaine 1 : Du 26 mai au 30 mai</h2>
    <p>Dès mon arrivée, j'ai mis en place un cahier des charges pour répertorier les missions à effectuer, partagé avec les membres du CCR pour une meilleure visibilité et une potentielle contribution de leur part.</p>

    <p>Mes premières missions ont inclus :</p>
    <ul>
        <li><strong>Vérification du serveur NAS :</strong> J'ai effectué un check-up du serveur de sauvegarde NAS car les utilisateurs ne parvenaient pas à s'y connecter. En suivant l'ancienne documentation de l'élève précédent, j'ai constaté que la connexion via internet était impossible. J'ai découvert que le serveur était éteint ; après l'avoir allumé, le problème persistait. Un message d'erreur m'a indiqué la nécessité d'installer le logiciel Synology Assistant. Après l'installation et des tests, j'ai mis à jour la documentation.</li>
        <li><strong>Gestion des newsletters :</strong> J'ai mis en place une solution pour permettre aux adhérents de se désinscrire et de se réinscrire aux newsletters du CCR. Cela a impliqué l'ajout d'un champ booléen (Oui/Non), une automatisation des tâches et un formulaire de consentement. J'ai également rédigé la documentation technique associée.</li>
        <li><strong>Outils bureautiques et sensibilisation :</strong>
            <ul>
                <li>Création d'un tableau Excel récapitulatif des raccourcis clavier utiles.</li>
                <li>Mise en place d'un questionnaire sur la cybersécurité pour évaluer les connaissances des employés.</li>
            </ul>
        </li>
        <li><strong>Optimisation du réseau WiFi :</strong> J'ai réinitialisé le routeur WiFi afin de modifier son SSID, les identifiants ayant été perdus. J'ai ensuite configuré le routeur pour améliorer la fluidité de la connexion et éviter les reconnexions fréquentes.</li>
        <li><strong>Recherche de solution Cloud :</strong> J'ai exploré des solutions cloud, proposant NextCloud et LibreCloud.</li>
        <li><strong>Serveur NAS et Pcloud :</strong> J'ai investigué la possibilité d'avoir plusieurs utilisateurs sur le serveur NAS et d'utiliser Pcloud comme serveur de sauvegarde. J'ai trouvé que c'était faisable avec une authentification à deux facteurs (2FA) par utilisateur. Cependant, j'ai constaté que le serveur NAS n'effectuait plus de sauvegardes depuis le 3 octobre 2024. Afin d'éviter de casser des choses je verrais avec la personne qui s'occupe de ça le mardi 27 mai.</li>
        <li><strong>Intégration Brevo (API) :</strong> J'ai effectué des recherches pour intégrer des fonctionnalités Brevo via son API, notamment l'ajout, la suppression, la mise à jour et la gestion de listes de contacts, ainsi que l'importation de contacts via des fichiers Excel (.csv). J'ai commencé l'implémentation en PHP sur une page web non publiée, mais je n'ai pas encore trouvé de solution pour l'importation via fichier Excel.</li>
        <li><strong>Documentation utilisateur :</strong> J'ai simplifié la documentation concernant l'implémentation des newsletters et créé un guide utilisateur.</li>
        <li><strong>Problèmes rencontrés :</strong> J'ai rencontré une erreur 400 (Bad Request), une Bad request, et n'ai pas encore trouvé de solution pour l'instant. J'ai également récupéré le fichier Excel des adhérents afin d'initialiser mes variables.</li>
    </ul>

    <h2>Semaine 2 : Du 2 au 6 juin</h2>
    <p>Au cours de cette deuxième semaine, mes missions se sont articulées autour du développement et de l'optimisation :</p>
    <ul>
        <li><strong>Finalisation de l'intégration Brevo (Backend) :</strong> J'ai achevé la mise en place du corps principal des fonctionnalités backend pour l'importation via l'API Brevo. J'ai ajouté des spécificités au CCR, comme la gestion des emails en double, l'ajout des noms et prénoms au lieu d'une simple mise à jour de contact, et la création d'un fichier Excel pour recenser les personnes sans email ou numéro de téléphone valide.</li>
        <li><strong>Vérification des importations et serveur NAS :</strong> J'ai finalisé la vérification des importations des contacts de Brevo. J'ai effectué des recherches et tests sur le Serveur NAS, notamment l'ajout de plusieurs utilisateurs, la création d'un espace commun et d'espaces personnalisés par utilisateur.</li>
        <li><strong>Sécurité informatique :</strong> J'ai travaillé sur la reprise de code pour la vérification et la recherche d'un coffre-fort de mots de passe pour le CCR. J'ai également créé un diaporama pour rappeler les règles de sécurité.</li>
        <li><strong>Charte informatique et développement web :</strong> J'ai finalisé la charte informatique et résolu un problème de configuration du répéteur WiFi. J'ai rencontré Sébastien, en charge du site web du CCR, pour lui expliquer mon code. Nous avons mis en place un dépôt GitHub privé pour mon code. Nous avons discuté des complexités de la charte informatique et de ses évolutions possibles.</li>
        <li><strong>Interface graphique (UI) :</strong> L'interface graphique sera développée en HTML/CSS/JS, car créer un plugin WordPress pour intégrer mon code PHP serait trop complexe d'après Sébastien.</li>
        <li><strong>Sauvegarde NAS et Pcloud :</strong> J'ai commencé et terminé l'implémentation de l'interface graphique. J'ai effectué une petite révision du serveur de sauvegarde (NAS) afin de savoir comment s'y connecter à distance et j'ai initié le processus de remise en place de la sauvegarde Pcloud sur le NAS.</li>
        <li><strong>Migration de cloud :</strong> J'ai testé la connexion à distance au serveur NAS et réimplémenté la sauvegarde Pcloud, me préparant ainsi à la migration vers le NAS.</li>
        <li><strong>Guide Brevo :</strong> J'ai ajouté un guide téléchargeable sur la page web pour faciliter l'importation des contacts Brevo.</li>
        <li><strong>Présentation et retour de Dominique :</strong> J'ai présenté mon site et son fonctionnement à l'équipe du CCR. J'ai également mis à jour la FAQ du guide utilisateur. Dominique est venu et a soulevé un point important concernant la pérennité de mon application web. Il m'a proposé de changer le style du site en abandonnant l'utilisation de bibliothèques externes (Frameworks) pour coder le style en CSS. De nouvelles missions de développement, de documentation et d'information ont été ajoutées.</li>
    </ul>

    <h2>Semaine 3 : Du 9 juin au 13 juin</h2>
    <p>Cette semaine a été marquée par des avancées significatives dans le développement d'applications web et la sensibilisation :</p>
    <ul>
        <li><strong>Transition CSS :</strong> Sur les conseils de Dominique, j'ai effectué le passage du Framework Bulma à une feuille de style.</li>
        <li><strong>Projet Hello Asso :</strong> J'ai débuté un nouveau projet axé sur le site web Hello Asso. J'ai effectué des requêtes auprès de leur API pour comprendre son fonctionnement.</li>
        <li><strong>Développement application web de gestion :</strong> J'ai commencé le projet de création de l'application web de gestion du CCR. Cela a inclus l'implémentation de fonctionnalités telles que la récupération des paiements Hello Asso, l'identification des payeurs et la récupération de leurs adresses email.</li>
        <li><strong>Conception de base de données et design :</strong> J'ai eu un appel avec Dominique pour discuter du schéma de la base de données ainsi que du design de l'application. J'ai effectué la conception du modèle conceptuel de données (MCD) à la main, puis je l'ai retranscrit via dbdiagram.io.</li>
        <li><strong>Maquette d'application :</strong> J'ai créé une première maquette de l'application web à l'aide de whimsical.com.</li>
        <li><strong>Réunion de projet :</strong> Une réunion a eu lieu autour du projet, où nous avons discuté des différents enjeux et des différentes fonctionnalités que l'application devrait avoir. Nous avons également commencé la V1 du site en créant un premier visuel pour qu'il corresponde aux demandes du Cercle Celtique.</li>
        <li><strong>Sensibilisation à la sécurité informatique :</strong> J'ai mené une réunion d'équipe durant laquelle j'ai sensibilisé les salariés et bénévoles présents sur place à la sécurité informatique grâce à un diaporama et des réponses aux différentes questions qu'ils ont posées.</li>
        <li><strong>Présentation du visuel du site :</strong> Une réunion a eu lieu pour présenter ce que Dominique et moi avons produit pour le visuel du site web.</li>
        <li><strong>Structure de la base de données :</strong> J'ai également travaillé sur la construction théorique de la structure de la base de données.</li>
    </ul>

    <h2>Semaine 4 : Du 16 juin au 20 juin</h2>
    <p>Cette dernière semaine de stage s'est concentrée sur l'intégration des données :</p>
    <ul>
        <li><strong>Réunion Base de Données et Répartition des Tâches :</strong> Une réunion a eu lieu ce matin avec Dominique, le sujet était la base de données et la répartition des tâches.</li>
        <li><strong>Intégration de tableurs :</strong> Ma mission principale est désormais de gérer l’intégration de tableur via l’application web. Un point sur les avancées est prévu le lendemain matin.</li>
        <li><strong>Consultation du compte rendu :</strong> J'ai consulté le compte rendu créé par Dominique de la première réunion de ce projet qui a eu lieu le vendredi 12 juin.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Ces cinq semaines de stage au Cercle Celtique de Rennes ont été très enrichissantes. J'ai pu travailler sur un éventail de missions variées, allant de la maintenance informatique à la conception et au développement d'applications web, en passant par la sensibilisation à la sécurité. J'ai acquis une expérience précieuse en gestion de projet, en collaboration d'équipe et en résolution de problèmes techniques. Je suis reconnaissant des conseils de Dominique et de l'opportunité de contribuer concrètement aux besoins de l'association.</p>

</body>
</html>