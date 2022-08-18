// APPEL DE L'API
function api() {
    fetch(`http://localhost:3000/api/products`)

    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    })

    .then(function(values) {
        affichageProduitsPanier(values);
    })
    
    .catch(function(err) {
    // Une erreur est survenue
    });
}
api();


// Creer une variable, qui condiendra les cles et valeures present dans le local storage
 let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));


 // SUPPRETION DE PRODUITS DANS LE PANIER 
function  suppressionDeProduit () {
    console.log("Hello");

    // Recuperation des corbeilles 
    let corbeilles = document. querySelectorAll(".deleteItem")

    for(k = 0; k < corbeilles.length; k++) {
        // Au clic supprimer l'article 
        corbeilles[k].addEventListener("click", (event) => { 
            event.preventDefault();
            console.log("Hello");
            // Selection de l'id du produit qui va etre supp. 
            let idProduitSupp = produitsPresentsDansLocalStorage[k].idProduit;

            let couleurProduitSupp = produitsPresentsDansLocalStorage[k].couleurProduit;

            produitsPresentsDansLocalStorage = produitsPresentsDansLocalStorage.filter(el => el.idProduit !== idProduitSupp && el.couleurProduit !== couleurProduitSupp);
            console.log("Hello");
            // Js > JSON, et l'envoyer ds la clé "produit" du local storage. 
            localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        });
    }
}
                     


// AFFICHER LES PRODUITS DANS LE PANIER
 function affichageProduitsPanier(caracteristiquesProduit) 
 {
    
    let container = document.querySelector("#cart__items"); 
    let containerTotalQuantity = document.querySelector("#totalQuantity"); 
    let containerTotalPrice = document.querySelector("#totalPrice");  
    let structureProduitPanier = [];
    let prixTotal = 0;

    for (i = 0; i < produitsPresentsDansLocalStorage.length; i++) {
        console.log(produitsPresentsDansLocalStorage[i].idProduit);
        console.log(produitsPresentsDansLocalStorage[i].couleurProduit);
        console.log(produitsPresentsDansLocalStorage[i].nombre);
        
        // CHERCHER LES DONNES DS "caracteristiquesProduit" ET LES COMPARER AVEC "produitsPresentsDansLocalStorage"
        for (j = 0; j < caracteristiquesProduit.length; j++) {
            
            
            if (caracteristiquesProduit[j]._id === produitsPresentsDansLocalStorage[i].idProduit) {
                structureProduitPanier = structureProduitPanier + `
                <article class="cart__item" data-id="${produitsPresentsDansLocalStorage[i].idProduit}" data-color="${produitsPresentsDansLocalStorage[i].couleurProduit}">
                    <div class="cart__item__img">
                        <img src="${caracteristiquesProduit[j].imageUrl}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${caracteristiquesProduit[j].name}</h2>
                            <p>${produitsPresentsDansLocalStorage[i].couleurProduit}</p>
                            <p>${caracteristiquesProduit[j].price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitsPresentsDansLocalStorage[i].nombre}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
    
                // Prix total 
                prixTotal = prixTotal + caracteristiquesProduit[j].price;
                //console.log(`${caracteristiquesProduit[j].price}`);
                containerTotalPrice.innerHTML = prixTotal;
                //console.log(prixTotal);

                // Nombre total d'article 

            }
                
        }
    }
    if (i == produitsPresentsDansLocalStorage.length) {

        //console.log("Condition de la boucle", produitsPresentsDansLocalStorage.length);

        container.innerHTML = structureProduitPanier;
        
        nombreArticlePanier = produitsPresentsDansLocalStorage.nombre[i] ++;
        //console.log("Nombre de produit ds le penier", produitsPresentsDansLocalStorage);

        containerTotalQuantity.innerHTML = nombreArticlePanier; 
        //containerTotalPrice.innerHTML = 
    
     }

     suppressionDeProduit();
 }