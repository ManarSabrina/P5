// APPEL DE L'API
function api() {
    let id = optentionIdUrl();
    fetch(`http://localhost:3000/api/products/${id}`)

    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    })

    .then(function(values) {
        affichageCaracteristiquesProduit(values);
    })
    
    .catch(function(err) {
    // Une erreur est survenue
    });
}

api();

// OBTENTION DE L'ID PAR L'URL
function optentionIdUrl () 
{
    let pointInterogationId = window.location.search;
    console.log(pointInterogationId); // SUP

    let urlSearchParams = new URLSearchParams(pointInterogationId);
    console.log(urlSearchParams); // SUP
    // ???

    let id = urlSearchParams.get("id");
    console.log(id); // SUP

    return id;
}

// AFFICHAGE CARACTERISTIQUES PRODUITS 
function affichageCaracteristiquesProduit (caracteristiquesProduit) 
{
    let imageContainer = document.getElementsByClassName("item__img")[0];
    imageContainer.innerHTML = `<img src="${caracteristiquesProduit.imageUrl}" alt="Photographie d'un canapé">`;

    let titre = document.getElementById("title");
    titre.innerHTML = `${caracteristiquesProduit.name}`;

    let prix = document.getElementById("price");
    prix.innerHTML = `${caracteristiquesProduit.price}`;

    let description = document.getElementById("description");
    description.innerHTML = `${caracteristiquesProduit.description}`;

    for (let i = 0; i < caracteristiquesProduit.colors.length; i++) {

        let containerCouleurs = document.getElementById("colors");
        containerCouleurs.innerHTML += `<option class="choixCouleur" value="${caracteristiquesProduit.colors[i]}">${caracteristiquesProduit.colors[i]}</option>`;
    }

    envoieCaracteristiquesProduitDsLocalStorage (caracteristiquesProduit);
}

// ENVOIE (DE QQ) CARACTERISTIQUES PRODUITS DS LE LOCAL STORAGE
function envoieCaracteristiquesProduitDsLocalStorage (caracteristiquesProduit) 
{
    let btnEnvoiePanier = document.querySelector("#addToCart");
    btnEnvoiePanier.addEventListener("click", (e) => { 
        e.preventDefault();

        // Creer une variable, qui condiendra les cles et valeures present dans le local storage
        let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

        let containerCouleurs = document.getElementById("colors");

        //Recuperation des qq caracteristiques produits 
        let breveCaracteristiquesProduit = {
        idProduit: caracteristiquesProduit._id,
        couleurProduit: `${containerCouleurs.value}`, // ??? Comment sait on que ca a ete selectionné et lequel a ete selectionné ? 
        nombre: 1, 
        };

        console.log(breveCaracteristiquesProduit);


        // Si il y a des produits dans le local storage
        if (produitsPresentsDansLocalStorage) {
        produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
        localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        
        }
        // Si il n'y a de produit 
        else {
        produitsPresentsDansLocalStorage = [];
        produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
        localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        }

     });

    /*Local storage 
    Json > Js = JSON.parse()
    Js > Json = JSON.stringify()*/
}

/* QUESTION 

- Comment les fonctions peuvent marcher avec les variables des autres ? (Tu appeles ta fonction dans la fonction ou tu veux recuperer la variable ?)
- Ou doit on mettre les variables dans les fonctions pour qu'elles marchent : dans l'argument de chaque fonction, ou dans l'argument quand on l'appel (notalment dans la fonction api), ou les deux ?
- Voir les "//???"
- Pourquoi rien ne s'affiche ? 
- Est on obligé d'appeler l'api a chaque debut de fichier js ?

*/
/*
Salut tt le monde,
J'ai qq petites questions... 

- Si j'ai une fonction 1 et j'ai envie d'utiliser une variable declaré (et utilisé) dans une autre fonction 2, il suffit que je met cette variable en argument de la fonction 1, c'est bien ca ? Ou bien je dois absolument declarer la variable a l'exterieur des deux fonction et la mettre en argiment de fonction dans laquelle je l'utilise ? 

- Est ce que c'est mieux d'appeler l'api a chaque fichier .js crée ? pour pouvoir appeler les fonction que je vais cree par la suite (voire ligne XXX de la photo) ? */