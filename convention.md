# Convention lors de la création d'une nouvelle page
L'élément ajouter doit avoir un attribut `aria-current` qui est 
égal au `nom du fichier` qui est assicié a cette page. Ainsi qu'une `class`
qui doit être égal à `nav-link`

Exemple :
```html
    <a class="nav-link" aria-current="Example.html" href="./Example.html">Example</a>
```