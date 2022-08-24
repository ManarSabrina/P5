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
        console.log(values);
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
    
    btnEnvoiePanier.addEventListener("click", (e) => { 
        e.preventDefault();
        
        // Creer une variable, qui contiendra les cles et valeures present dans le local storage
        let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        
        let containerCouleurs = document.getElementById("colors");

        let containerNombrePageProduit = document.getElementById("quantity");
  
        let NombrePageProduit = containerNombrePageProduit.value;
        
        
        //Recuperation des qq caracteristiques produits 
        let breveCaracteristiquesProduit = {
        idProduit: caracteristiquesProduit._id,
        couleurProduit: `${containerCouleurs.value}`, 
        nombre: NombrePageProduit
        };
        
        breveCaracteristiquesProduit.nombre
        // ?!

        // Si il n'y a pas de produit
        if (produitsPresentsDansLocalStorage === null) {
            produitsPresentsDansLocalStorage = [];
                produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
                localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        } 
        // Si il y a des produits dans le local storage
        else {

            let produitTrouveDsLeTableau = produitsPresentsDansLocalStorage.find (canap => canap.idProduit === breveCaracteristiquesProduit.idProduit && canap.couleurProduit === breveCaracteristiquesProduit.couleurProduit)

            let positionProduitTrouveDsLeTableau = produitsPresentsDansLocalStorage.indexOf(produitTrouveDsLeTableau);

            // Condistions de comparaison
            if (produitTrouveDsLeTableau) 
            {
                // Augmentation du nombre dans "produitsPresentsDansLocalStorage".
                console.log(produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre);
                console.log(NombrePageProduit);

                produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre = parseInt(produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre) + parseInt(NombrePageProduit);

                produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre = `${produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre}`;

                console.log(produitsPresentsDansLocalStorage[positionProduitTrouveDsLeTableau].nombre);
                    
            } else {
                // Mettre "breveCaracteristiquesProduit", ds le local storage. 
                produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
                // Mettre "produitsPresentsDansLocalStorage", dans local storage. 
            }    
            localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        }
    });
}