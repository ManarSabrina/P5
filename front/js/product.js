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

    let urlSearchParams = new URLSearchParams(pointInterogationId);

    let id = urlSearchParams.get("id");

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
    console.log(btnEnvoiePanier);
    btnEnvoiePanier.addEventListener("click", (e) => { 
        console.log(btnEnvoiePanier);
        e.preventDefault();
        
        // Creer une variable, qui condiendra les cles et valeures present dans le local storage
        let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        let containerCouleurs = document.getElementById("colors");
        
        //Recuperation des qq caracteristiques produits 
        let breveCaracteristiquesProduit = {
        idProduit: caracteristiquesProduit._id,
        couleurProduit: `${containerCouleurs.value}`, 
        nombre: 1
        };
        

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

        console.log(produitsPresentsDansLocalStorage);
        for (let j = 0; j < produitsPresentsDansLocalStorage.length; j++) {

            if (breveCaracteristiquesProduit.idProduit === produitsPresentsDansLocalStorage[j].idProduit && breveCaracteristiquesProduit.couleurProduit === produitsPresentsDansLocalStorage[j].couleurProduit ) 
            {
                console.log('Ds la fonction, avant execution - ppdls', produitsPresentsDansLocalStorage[j].idProduit);
                console.log('Ds la fonction, avant execution', breveCaracteristiquesProduit.nombre);

                breveCaracteristiquesProduit.nombre = breveCaracteristiquesProduit.nombre + 1;
    
                console.log('Ds la fonction, apres execution', breveCaracteristiquesProduit.nombre);
            }
        }

     });

    /*Local storage 
    Json > Js = JSON.parse()
    Js > Json = JSON.stringify()*/
}

console.log(envoieCaracteristiquesProduitDsLocalStorage);


