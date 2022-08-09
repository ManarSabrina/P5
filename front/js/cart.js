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

// SUPPRESSION DE PRODUITS DS LE PANIER 
 let resteDesProductsApresSupp = [];

 const suppressionDeProduit = async (affichageProduitsPanier) => 
 {
     await affichageProduitsPanier;
 
     let corbeilles = document.querySelectorAll(".deleteItem");
     let article = document.querySelector(".cart__item");
     corbeilles.forEach((corbeille) => {
         corbeille.addEventListener("click", () => {
             if (produitsPresentsDansLocalStorage.length == 1) {
                 return (
                     localStorage.removeItem("produit") 
                 );
             }
             else {
                 resteDesProductsApresSupp = produitsPresentsDansLocalStorage.filter(e => {
                     if(article.dataset.data-id != e.idProduit || article.dataset.data-color != e.couleurProduit) {
                        corbeille.closest(':not(div)');
                         // .id et .color ?
                         return true
                     }
                 });
                 localStorage.setItem("produit", JSON.stringify(resteDesProductsApresSupp));
             }
         });
     });
 };


// AFFICHER LES PRODUITS DANS LE PANIER
 function affichageProduitsPanier(caracteristiquesProduit) 
 {
    
    let container = document.querySelector("#cart__items"); 
    let containerTotalQuantity = document.querySelector("#totalQuantity"); 
    let containerTotalPrice = document.querySelector("#totalPrice");  
    let structureProduitPanier = [];
    let prixTotal = 0;

    for (i = 0; i < produitsPresentsDansLocalStorage.length; i++) {
        
        // CHERCHER LES DONNES DS "caracteristiquesProduit" ET LES COMPARER AVEC "produitsPresentsDansLocalStorage"
        for (j = 0; j < caracteristiquesProduit.length; j++) {
            if (caracteristiquesProduit[j]._id === produitsPresentsDansLocalStorage[i].idProduit)

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
                                <p>Qté : ${produitsPresentsDansLocalStorage[i].nombre}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
    
            /*if (produitsPresentsDansLocalStorage[i].idProduit ===  && produitsPresentsDansLocalStorage[i].couleurProduit === ) {
                produitsPresentsDansLocalStorage[i].nombre = produitsPresentsDansLocalStorage[i].nombre + 1;
            } // Je le compart a quoi ? (C'est claire ds ma tete mais pas ds le code !)*/
    
            // Total 
            prixTotal = prixTotal + produitsPresentsDansLocalStorage[i].prixProduit;
            containerTotalPrice.innerHTML = prixTotal;
                
        }
    }

    if (i == produitsPresentsDansLocalStorage.length) {
        container.innerHTML = structureProduitPanier;
        containerTotalQuantity.innerHTML = i;
        //containerTotalPrice.innerHTML = 
    
     }

     suppressionDeProduit();
 }