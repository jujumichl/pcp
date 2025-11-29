- [] Crypter ou sécuriser les ressources (fichier de rapport de stage, documentation, ect...)
- [] Finir le contenue de la page projet (texte, image illustrative...)
- [] Ajout d'image sur la page de stage
- [x] Ajouter le référentiel des compétences comme ressource en liens sur la page de stage
- [x] Mettre les numéros des missions sur les compétences présentée et ajouter un Hover sur les libellés des mission pour comprendre a quoi correspondent les numéros
- [] Crée une page destinnée a l'alternance
- [] Ajouter sur mon CV mon expérience de super U (Mise en rayon du 14 juillet au 16 août (épicerie, liquide, DPH, fruit et légumes))
- [] Ajouter mon alternance sur mon CV en fin d'année
- [] Vérifier que le site est a jours avec les dernières données (A faire tous les 3-4 mois et 1 ou 2 semaines avant l'épreuve)
- [] lister les logiciels utilisés
- [] illustration des projets
- [] le fichier en .csv avec le même formats mais les données anonymes
- [x] img du schéma de la BDD

A voir :
https://getbootstrap.com/docs/5.3/components/progress/

si insertion de code :

https://getbootstrap.com/docs/5.3/utilities/overflow/


communication API ok mais JS




### Qu'est-ce que `git-crypt` ?

`git-crypt` est un outil de chiffrement qui s'intègre à Git. Il permet de **chiffrer automatiquement des fichiers** désignés lorsque vous les poussez vers votre dépôt distant, et de les **déchiffrer automatiquement** lorsque vous les récupérez. Pour les personnes qui n'ont pas la clé de déchiffrement, ces fichiers restent illisibles, tout en permettant aux autres de voir le reste du dépôt (le code, les `README`, etc.).

---------------
### Comment le mettre en œuvre ?

1.  **Installez `git-crypt`** sur votre machine. Les instructions varient selon votre système d'exploitation.

2.  **Initialisez `git-crypt`** dans votre dépôt Git local avec la commande :

    ```bash
    git crypt init
    ```

3.  **Spécifiez les fichiers à chiffrer**. Vous devez créer un fichier `.gitattributes` à la racine de votre dépôt. Dans ce fichier, vous indiquez quels fichiers ou quels types de fichiers doivent être chiffrés.

      * Exemple pour chiffrer votre rapport de stage :
        ```
        rapport_de_stage.pdf filter=git-crypt diff=git-crypt
        ```
      * Exemple pour chiffrer toute la documentation :
        ```
        documentation/** filter=git-crypt diff=git-crypt
        ```

4.  **Ajoutez votre clé de chiffrement**. Pour que vous puissiez déchiffrer les fichiers, vous devez vous ajouter comme utilisateur autorisé. Pour cela, on utilise généralement GPG.

    ```bash
    git crypt add-gpg-user [votre_adresse_email_gpg]
    ```

5.  **Poussez vos fichiers** chiffrés. Une fois que `git-crypt` est configuré et que vos fichiers sont ajoutés à l'index Git (avec `git add`), `git` se charge de les chiffrer avant de les `commit` et de les `push`.

-----

### Ce que `git-crypt` permet d'atteindre

Cette approche répond précisément à votre objectif de sécurisation, car elle permet de :

  * **Stocker vos ressources sensibles** sur votre dépôt Git public.
  * **Les rendre illisibles** pour toute personne n'ayant pas la clé de déchiffrement.
  * **Permettre la collaboration** en ajoutant d'autres utilisateurs GPG autorisés à voir le contenu.

En présentant l'utilisation de **`git-crypt`** dans votre PCP, vous montrez une compréhension avancée des enjeux de sécurité et des bonnes pratiques de gestion de version pour les données sensibles.