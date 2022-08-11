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
    
    btnEnvoiePanier.addEventListener("click", (e) => { 
        e.preventDefault();
        
        // Creer une variable, qui contiendra les cles et valeures present dans le local storage
        let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        console.log(produitsPresentsDansLocalStorage);
        
        let containerCouleurs = document.getElementById("colors");
        
        //Recuperation des qq caracteristiques produits 
        let breveCaracteristiquesProduit = {
        idProduit: caracteristiquesProduit._id,
        couleurProduit: `${containerCouleurs.value}`, 
        nombre: 1
        };
        

        // Si il n'y a pas de produit
        if (produitsPresentsDansLocalStorage === []) {
            console.log('1');
            produitsPresentsDansLocalStorage = [];
                produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
                localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
                console.log('2');
        } 
        // Si il y a des produits dans le local storage
        else {
            // Parcourir le local storage pour voir si le produit qu'on souhaite rajouter ne s'y trouve pas deja. 
            console.log('3');
            for (let j = 0; j < produitsPresentsDansLocalStorage.length; j++) {
                console.log('4');
                // Condistions de comparaison
                console.log("Condition 1", breveCaracteristiquesProduit.idProduit);
                console.log("Condition 2", produitsPresentsDansLocalStorage[j].idProduit);
                console.log("Condition 3", breveCaracteristiquesProduit.couleurProduit);
                console.log("Condition 4", produitsPresentsDansLocalStorage[j].couleurProduit);
                if (breveCaracteristiquesProduit.idProduit === produitsPresentsDansLocalStorage[j].idProduit && breveCaracteristiquesProduit.couleurProduit === produitsPresentsDansLocalStorage[j].couleurProduit ) 
                {
                    console.log('5');

                    produitsPresentsDansLocalStorage[j].nombre++, 
                    localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage)),
                    produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
                } else {
                    console.log('6');
                    produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
                    localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
                    console.log('7');
                }
            }
        }
    });
}